import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCategoriesAndAttributes1763300000000 implements MigrationInterface {
    name = 'CreateCategoriesAndAttributes1763300000000';

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "categories" (
                "id" uuid NOT NULL,
                "name" character varying(120) NOT NULL,
                "slug" character varying(140) NOT NULL,
                "description" text,
                "image_url" text,
                "is_active" boolean NOT NULL DEFAULT true,
                "seo_title" character varying(160),
                "seo_description" character varying(320),
                "parent_id" uuid,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_categories_id" PRIMARY KEY ("id"),
                CONSTRAINT "uq_categories_slug" UNIQUE ("slug"),
                CONSTRAINT "FK_categories_parent" FOREIGN KEY ("parent_id")
                    REFERENCES "categories"("id") ON DELETE RESTRICT
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "attributes" (
                "id" uuid NOT NULL,
                "name" character varying(120) NOT NULL,
                "slug" character varying(140) NOT NULL,
                "data_type" character varying(20) NOT NULL,
                "unit" character varying(40),
                "description" text,
                "is_active" boolean NOT NULL DEFAULT true,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_attributes_id" PRIMARY KEY ("id"),
                CONSTRAINT "uq_attributes_slug" UNIQUE ("slug"),
                CONSTRAINT "chk_attributes_data_type" CHECK (
                    "data_type" IN ('TEXT', 'NUMBER', 'BOOLEAN', 'OPTION', 'DATE')
                )
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "category_attribute" (
                "id" uuid NOT NULL,
                "category_id" uuid NOT NULL,
                "attribute_id" uuid NOT NULL,
                "is_required" boolean NOT NULL DEFAULT false,
                "is_filterable" boolean NOT NULL DEFAULT false,
                "is_visible_on_card" boolean NOT NULL DEFAULT true,
                "is_visible_on_product" boolean NOT NULL DEFAULT true,
                "is_variant_attribute" boolean NOT NULL DEFAULT false,
                "display_type" character varying(20) NOT NULL DEFAULT 'SELECT',
                "sort_order" integer NOT NULL DEFAULT 0,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_category_attribute_id" PRIMARY KEY ("id"),
                CONSTRAINT "uq_category_attribute_category_attribute"
                    UNIQUE ("category_id", "attribute_id"),
                CONSTRAINT "chk_category_attribute_display_type" CHECK (
                    "display_type" IN (
                        'SELECT', 'RADIO', 'CHECKBOX', 'COLOR_SWATCH',
                        'TEXT_INPUT', 'NUMBER_INPUT', 'DATE_PICKER', 'TOGGLE'
                    )
                ),
                CONSTRAINT "chk_category_attribute_sort_order" CHECK ("sort_order" >= 0),
                CONSTRAINT "FK_category_attribute_category" FOREIGN KEY ("category_id")
                    REFERENCES "categories"("id") ON DELETE RESTRICT,
                CONSTRAINT "FK_category_attribute_attribute" FOREIGN KEY ("attribute_id")
                    REFERENCES "attributes"("id") ON DELETE RESTRICT
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "attribute_options" (
                "id" uuid NOT NULL,
                "attribute_id" uuid NOT NULL,
                "label" character varying(120) NOT NULL,
                "value" character varying(140) NOT NULL,
                "metadata" jsonb,
                "is_active" boolean NOT NULL DEFAULT true,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_attribute_options_id" PRIMARY KEY ("id"),
                CONSTRAINT "uq_attribute_options_attribute_value"
                    UNIQUE ("attribute_id", "value"),
                CONSTRAINT "FK_attribute_options_attribute" FOREIGN KEY ("attribute_id")
                    REFERENCES "attributes"("id") ON DELETE RESTRICT
            )
        `);
        await queryRunner.query(
            'CREATE INDEX "IDX_categories_parent_id" ON "categories" ("parent_id")',
        );
        await queryRunner.query(
            'CREATE INDEX "IDX_category_attribute_attribute_id" ON "category_attribute" ("attribute_id")',
        );
        await queryRunner.query(
            'CREATE INDEX "IDX_attribute_options_attribute_id" ON "attribute_options" ("attribute_id")',
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP INDEX "IDX_attribute_options_attribute_id"');
        await queryRunner.query('DROP INDEX "IDX_category_attribute_attribute_id"');
        await queryRunner.query('DROP INDEX "IDX_categories_parent_id"');
        await queryRunner.query('DROP TABLE "attribute_options"');
        await queryRunner.query('DROP TABLE "category_attribute"');
        await queryRunner.query('DROP TABLE "attributes"');
        await queryRunner.query('DROP TABLE "categories"');
    }
}
