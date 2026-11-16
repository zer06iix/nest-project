import { MigrationInterface, QueryRunner } from 'typeorm';

const ID_COLUMNS: Record<string, string[]> = {
    users: ['id'],
    addresses: ['id', 'user_id'],
    tickets: ['id', 'user_id', 'assigned_to_id'],
    ticket_message: ['id', 'ticket_id', 'sender_id'],
    categories: ['id', 'parent_id'],
    attributes: ['id'],
    category_attribute: ['id', 'category_id', 'attribute_id'],
    attribute_options: ['id', 'attribute_id'],
};

const FOREIGN_KEYS = [
    {
        table: 'addresses',
        name: 'FK_addresses_user',
        column: 'user_id',
        referencedTable: 'users',
        onDelete: 'NO ACTION',
    },
    {
        table: 'tickets',
        name: 'FK_tickets_user',
        column: 'user_id',
        referencedTable: 'users',
        onDelete: 'NO ACTION',
    },
    {
        table: 'tickets',
        name: 'FK_tickets_assigned_user',
        column: 'assigned_to_id',
        referencedTable: 'users',
        onDelete: 'NO ACTION',
    },
    {
        table: 'ticket_message',
        name: 'FK_ticket_message_ticket',
        column: 'ticket_id',
        referencedTable: 'tickets',
        onDelete: 'CASCADE',
    },
    {
        table: 'ticket_message',
        name: 'FK_ticket_message_sender',
        column: 'sender_id',
        referencedTable: 'users',
        onDelete: 'CASCADE',
    },
    {
        table: 'categories',
        name: 'FK_categories_parent',
        column: 'parent_id',
        referencedTable: 'categories',
        onDelete: 'RESTRICT',
    },
    {
        table: 'category_attribute',
        name: 'FK_category_attribute_category',
        column: 'category_id',
        referencedTable: 'categories',
        onDelete: 'NO ACTION',
    },
    {
        table: 'category_attribute',
        name: 'FK_category_attribute_attribute',
        column: 'attribute_id',
        referencedTable: 'attributes',
        onDelete: 'NO ACTION',
    },
    {
        table: 'attribute_options',
        name: 'FK_attribute_options_attribute',
        column: 'attribute_id',
        referencedTable: 'attributes',
        onDelete: 'RESTRICT',
    },
];

export class ConvertEntityIdsToNanoidStrings1794835121000 implements MigrationInterface {
    name = 'ConvertEntityIdsToNanoidStrings1794835121000';

    async up(queryRunner: QueryRunner): Promise<void> {
        await this.changeIdColumnTypes(queryRunner, 'varchar');
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await this.assertIdsAreUuids(queryRunner);
        await this.changeIdColumnTypes(queryRunner, 'uuid');
    }

    private async changeIdColumnTypes(queryRunner: QueryRunner, targetType: 'varchar' | 'uuid') {
        await this.dropEntityForeignKeys(queryRunner);

        for (const [tableName, columns] of Object.entries(ID_COLUMNS)) {
            if (!(await queryRunner.hasTable(tableName))) continue;

            for (const columnName of columns) {
                if (!(await queryRunner.hasColumn(tableName, columnName))) continue;

                if (columnName === 'id') {
                    await queryRunner.query(
                        `ALTER TABLE "${tableName}" ALTER COLUMN "id" DROP DEFAULT`,
                    );
                }

                if (targetType === 'varchar') {
                    await queryRunner.query(
                        `ALTER TABLE "${tableName}" ALTER COLUMN "${columnName}" TYPE varchar(36) USING "${columnName}"::text`,
                    );
                } else {
                    await queryRunner.query(
                        `ALTER TABLE "${tableName}" ALTER COLUMN "${columnName}" TYPE uuid USING "${columnName}"::uuid`,
                    );
                }
            }
        }

        await this.createEntityForeignKeys(queryRunner);
    }

    private async dropEntityForeignKeys(queryRunner: QueryRunner) {
        for (const tableName of Object.keys(ID_COLUMNS)) {
            const table = await queryRunner.getTable(tableName);
            if (!table?.foreignKeys.length) continue;
            await queryRunner.dropForeignKeys(tableName, table.foreignKeys);
        }
    }

    private async createEntityForeignKeys(queryRunner: QueryRunner) {
        for (const foreignKey of FOREIGN_KEYS) {
            const table = await queryRunner.getTable(foreignKey.table);
            const referencedTable = await queryRunner.getTable(foreignKey.referencedTable);
            if (
                !table ||
                !referencedTable ||
                !table.findColumnByName(foreignKey.column) ||
                !referencedTable.findColumnByName('id')
            ) {
                continue;
            }

            await queryRunner.query(
                `ALTER TABLE "${foreignKey.table}" ADD CONSTRAINT "${foreignKey.name}" FOREIGN KEY ("${foreignKey.column}") REFERENCES "${foreignKey.referencedTable}"("id") ON DELETE ${foreignKey.onDelete}`,
            );
        }
    }

    private async assertIdsAreUuids(queryRunner: QueryRunner) {
        const uuidPattern = '^[0-9a-fA-F]{8}-(?:[0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$';
        for (const tableName of Object.keys(ID_COLUMNS)) {
            if (!(await queryRunner.hasTable(tableName))) continue;
            const result = await queryRunner.query(
                `SELECT EXISTS (SELECT 1 FROM "${tableName}" WHERE "id"::text !~ $1) AS "has_non_uuid_ids"`,
                [uuidPattern],
            );
            if (result[0]?.has_non_uuid_ids) {
                throw new Error(
                    `Cannot revert Nano ID migration: ${tableName} contains non-UUID IDs`,
                );
            }
        }
    }
}
