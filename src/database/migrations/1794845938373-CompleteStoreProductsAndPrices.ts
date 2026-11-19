import { MigrationInterface, QueryRunner } from 'typeorm';

export class CompleteStoreProductsAndPrices1794845938373 implements MigrationInterface {
    name = 'CompleteStoreProductsAndPrices1794845938373';

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "store_products" ADD "stock_quantity" integer');
        await queryRunner.query('ALTER TABLE "store_products" ADD "status" varchar(16) NOT NULL DEFAULT \'ACTIVE\'');
        await queryRunner.query('ALTER TABLE "store_products" ADD "deleted_at" TIMESTAMPTZ');
        await queryRunner.query('ALTER TABLE "store_products" ALTER COLUMN "external_url" DROP NOT NULL');
        await queryRunner.query('ALTER TABLE "store_products" DROP CONSTRAINT IF EXISTS "CHK_store_products_availability"');
        await queryRunner.query('ALTER TABLE "store_products" DROP CONSTRAINT IF EXISTS "CHK_store_products_stock"');
        await queryRunner.query(`ALTER TABLE "store_products" ADD CONSTRAINT "CHK_store_products_availability"
            CHECK ("availability_status" IN ('AVAILABLE', 'OUT_OF_STOCK', 'PRE_ORDER', 'DISCONTINUED'))`);
        await queryRunner.query(`ALTER TABLE "store_products" ADD CONSTRAINT "CHK_store_products_stock"
            CHECK ("stock_status" IN ('IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK', 'UNKNOWN'))`);
        await queryRunner.query(`ALTER TABLE "store_products" ADD CONSTRAINT "CHK_store_products_stock_quantity"
            CHECK ("stock_quantity" IS NULL OR "stock_quantity" >= 0)`);
        await queryRunner.query(`ALTER TABLE "store_products" ADD CONSTRAINT "CHK_store_products_stock_consistency"
            CHECK (
                ("stock_status" != 'OUT_OF_STOCK' OR "stock_quantity" IS NULL OR "stock_quantity" = 0)
                AND ("stock_status" != 'IN_STOCK' OR "stock_quantity" IS NULL OR "stock_quantity" > 0)
            )`);
        await queryRunner.query(`ALTER TABLE "store_products" ADD CONSTRAINT "CHK_store_products_status"
            CHECK ("status" IN ('DRAFT', 'ACTIVE', 'INACTIVE', 'REJECTED'))`);

        await queryRunner.query('ALTER TABLE "prices" ALTER COLUMN "amount" TYPE numeric(20,6) USING "amount"::numeric(20,6)');
        await queryRunner.query('ALTER TABLE "prices" ALTER COLUMN "original_amount" TYPE numeric(20,6) USING "original_amount"::numeric(20,6)');
        await queryRunner.query('ALTER TABLE "prices" DROP CONSTRAINT IF EXISTS "CHK_prices_amount_nonnegative"');
        await queryRunner.query('ALTER TABLE "prices" DROP CONSTRAINT IF EXISTS "CHK_prices_original_amount_nonnegative"');
        await queryRunner.query('ALTER TABLE "prices" ADD CONSTRAINT "CHK_prices_amount_positive" CHECK ("amount" > 0)');
        await queryRunner.query('ALTER TABLE "prices" ADD CONSTRAINT "CHK_prices_original_amount_valid" CHECK ("original_amount" IS NULL OR "original_amount" >= "amount")');

        await queryRunner.query('ALTER TABLE "price_history" ALTER COLUMN "amount" TYPE numeric(20,6) USING "amount"::numeric(20,6)');
        await queryRunner.query('ALTER TABLE "price_history" ALTER COLUMN "original_amount" TYPE numeric(20,6) USING "original_amount"::numeric(20,6)');
        await queryRunner.query('ALTER TABLE "price_history" DROP CONSTRAINT IF EXISTS "CHK_price_history_amount_nonnegative"');
        await queryRunner.query('ALTER TABLE "price_history" DROP CONSTRAINT IF EXISTS "CHK_price_history_original_amount_nonnegative"');
        await queryRunner.query('ALTER TABLE "price_history" ADD CONSTRAINT "CHK_price_history_amount_positive" CHECK ("amount" > 0)');
        await queryRunner.query('ALTER TABLE "price_history" ADD CONSTRAINT "CHK_price_history_original_amount_valid" CHECK ("original_amount" IS NULL OR "original_amount" >= "amount")');
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "price_history" DROP CONSTRAINT IF EXISTS "CHK_price_history_original_amount_valid"');
        await queryRunner.query('ALTER TABLE "price_history" DROP CONSTRAINT IF EXISTS "CHK_price_history_amount_positive"');
        await queryRunner.query('ALTER TABLE "price_history" ALTER COLUMN "original_amount" TYPE bigint USING "original_amount"::bigint');
        await queryRunner.query('ALTER TABLE "price_history" ALTER COLUMN "amount" TYPE bigint USING "amount"::bigint');
        await queryRunner.query('ALTER TABLE "prices" DROP CONSTRAINT IF EXISTS "CHK_prices_original_amount_valid"');
        await queryRunner.query('ALTER TABLE "prices" DROP CONSTRAINT IF EXISTS "CHK_prices_amount_positive"');
        await queryRunner.query('ALTER TABLE "prices" ALTER COLUMN "original_amount" TYPE bigint USING "original_amount"::bigint');
        await queryRunner.query('ALTER TABLE "prices" ALTER COLUMN "amount" TYPE bigint USING "amount"::bigint');
        await queryRunner.query('ALTER TABLE "store_products" DROP CONSTRAINT IF EXISTS "CHK_store_products_status"');
        await queryRunner.query('ALTER TABLE "store_products" DROP CONSTRAINT IF EXISTS "CHK_store_products_stock_consistency"');
        await queryRunner.query('ALTER TABLE "store_products" DROP CONSTRAINT IF EXISTS "CHK_store_products_stock_quantity"');
        await queryRunner.query('ALTER TABLE "store_products" DROP CONSTRAINT IF EXISTS "CHK_store_products_stock"');
        await queryRunner.query('ALTER TABLE "store_products" DROP CONSTRAINT IF EXISTS "CHK_store_products_availability"');
        await queryRunner.query('ALTER TABLE "store_products" DROP COLUMN "deleted_at"');
        await queryRunner.query('ALTER TABLE "store_products" DROP COLUMN "status"');
        await queryRunner.query('ALTER TABLE "store_products" DROP COLUMN "stock_quantity"');
        await queryRunner.query('ALTER TABLE "store_products" ALTER COLUMN "external_url" SET NOT NULL');
    }
}
