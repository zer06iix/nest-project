import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductsAndStores1794845938372 implements MigrationInterface {
    name = 'CreateProductsAndStores1794845938372';

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "brands" (
                "id" varchar(8) NOT NULL,
                "name" varchar(255) NOT NULL,
                "slug" varchar(255) NOT NULL,
                "logo" varchar(500),
                "description" text,
                "is_active" boolean NOT NULL DEFAULT true,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                CONSTRAINT "PK_brands_id" PRIMARY KEY ("id"),
                CONSTRAINT "uq_brands_slug" UNIQUE ("slug")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "products" (
                "id" varchar(8) NOT NULL,
                "name" varchar(255) NOT NULL,
                "slug" varchar(255) NOT NULL,
                "description" text,
                "category_id" varchar(36) NOT NULL,
                "brand_id" varchar(8),
                "status" varchar(16) NOT NULL DEFAULT 'DRAFT',
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ,
                CONSTRAINT "PK_products_id" PRIMARY KEY ("id"),
                CONSTRAINT "uq_products_slug" UNIQUE ("slug"),
                CONSTRAINT "CHK_products_status" CHECK ("status" IN ('DRAFT', 'ACTIVE', 'ARCHIVED')),
                CONSTRAINT "FK_products_category" FOREIGN KEY ("category_id")
                    REFERENCES "categories"("id") ON DELETE RESTRICT,
                CONSTRAINT "FK_products_brand" FOREIGN KEY ("brand_id")
                    REFERENCES "brands"("id") ON DELETE SET NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "product_variants" (
                "id" varchar(8) NOT NULL,
                "product_id" varchar(8) NOT NULL,
                "title" varchar(255) NOT NULL,
                "sku" varchar(100),
                "is_default" boolean NOT NULL DEFAULT false,
                "is_active" boolean NOT NULL DEFAULT true,
                "sort_order" integer NOT NULL DEFAULT 0,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                CONSTRAINT "PK_product_variants_id" PRIMARY KEY ("id"),
                CONSTRAINT "CHK_product_variants_sort_order" CHECK ("sort_order" >= 0),
                CONSTRAINT "FK_product_variants_product" FOREIGN KEY ("product_id")
                    REFERENCES "products"("id") ON DELETE CASCADE
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "uq_product_variants_sku"
                ON "product_variants" ("sku") WHERE "sku" IS NOT NULL
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "uq_product_variants_default"
                ON "product_variants" ("product_id") WHERE "is_default" = true
        `);
        await queryRunner.query(`
            CREATE TABLE "product_images" (
                "id" varchar(8) NOT NULL,
                "product_id" varchar(8) NOT NULL,
                "url" varchar(2048) NOT NULL,
                "alt_text" varchar(255),
                "is_primary" boolean NOT NULL DEFAULT false,
                "sort_order" integer NOT NULL DEFAULT 0,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                CONSTRAINT "PK_product_images_id" PRIMARY KEY ("id"),
                CONSTRAINT "CHK_product_images_sort_order" CHECK ("sort_order" >= 0),
                CONSTRAINT "FK_product_images_product" FOREIGN KEY ("product_id")
                    REFERENCES "products"("id") ON DELETE CASCADE
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "uq_product_images_primary"
                ON "product_images" ("product_id") WHERE "is_primary" = true
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_product_images_order"
                ON "product_images" ("product_id", "sort_order")
        `);
        await queryRunner.query(`
            CREATE TABLE "product_attribute_values" (
                "id" varchar(8) NOT NULL,
                "product_id" varchar(8) NOT NULL,
                "attribute_id" varchar(36) NOT NULL,
                "option_id" varchar(36),
                "value_text" text,
                "value_number" numeric(20,6),
                "value_boolean" boolean,
                "value_date" date,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                CONSTRAINT "PK_product_attribute_values_id" PRIMARY KEY ("id"),
                CONSTRAINT "uq_product_attribute_value" UNIQUE ("product_id", "attribute_id"),
                CONSTRAINT "CHK_product_attribute_value_one_value" CHECK (
                    (("option_id" IS NOT NULL)::int + ("value_text" IS NOT NULL)::int +
                     ("value_number" IS NOT NULL)::int + ("value_boolean" IS NOT NULL)::int +
                     ("value_date" IS NOT NULL)::int) = 1
                ),
                CONSTRAINT "FK_product_attribute_values_product" FOREIGN KEY ("product_id")
                    REFERENCES "products"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_product_attribute_values_attribute" FOREIGN KEY ("attribute_id")
                    REFERENCES "attributes"("id") ON DELETE RESTRICT,
                CONSTRAINT "FK_product_attribute_values_option" FOREIGN KEY ("option_id")
                    REFERENCES "attribute_options"("id") ON DELETE RESTRICT
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "attribute_options"
                ADD CONSTRAINT "uq_attribute_options_id_attribute" UNIQUE ("id", "attribute_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "product_attribute_values"
                ADD CONSTRAINT "FK_product_attribute_values_option_attribute"
                FOREIGN KEY ("option_id", "attribute_id")
                REFERENCES "attribute_options"("id", "attribute_id") ON DELETE RESTRICT
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_product_attribute_values_filter"
                ON "product_attribute_values" ("attribute_id", "value_number", "value_boolean")
        `);
        await queryRunner.query(`
            CREATE TABLE "variant_attribute_values" (
                "id" varchar(8) NOT NULL,
                "variant_id" varchar(8) NOT NULL,
                "attribute_id" varchar(36) NOT NULL,
                "option_id" varchar(36),
                "value_text" text,
                "value_number" numeric(20,6),
                "value_boolean" boolean,
                "value_date" date,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                CONSTRAINT "PK_variant_attribute_values_id" PRIMARY KEY ("id"),
                CONSTRAINT "uq_variant_attribute_value" UNIQUE ("variant_id", "attribute_id"),
                CONSTRAINT "CHK_variant_attribute_value_one_value" CHECK (
                    (("option_id" IS NOT NULL)::int + ("value_text" IS NOT NULL)::int +
                     ("value_number" IS NOT NULL)::int + ("value_boolean" IS NOT NULL)::int +
                     ("value_date" IS NOT NULL)::int) = 1
                ),
                CONSTRAINT "FK_variant_attribute_values_variant" FOREIGN KEY ("variant_id")
                    REFERENCES "product_variants"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_variant_attribute_values_attribute" FOREIGN KEY ("attribute_id")
                    REFERENCES "attributes"("id") ON DELETE RESTRICT,
                CONSTRAINT "FK_variant_attribute_values_option" FOREIGN KEY ("option_id")
                    REFERENCES "attribute_options"("id") ON DELETE RESTRICT
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "variant_attribute_values"
                ADD CONSTRAINT "FK_variant_attribute_values_option_attribute"
                FOREIGN KEY ("option_id", "attribute_id")
                REFERENCES "attribute_options"("id", "attribute_id") ON DELETE RESTRICT
        `);
        await queryRunner.query(`
            CREATE FUNCTION "validate_dynamic_attribute_value"() RETURNS trigger AS $$
            DECLARE
                category_id_value varchar(36);
                data_type_value varchar(20);
                variant_attribute_value boolean;
                owner_product_id varchar(36);
            BEGIN
                IF TG_ARGV[0] = 'product' THEN
                    owner_product_id := NEW.product_id;
                ELSE
                    SELECT product_id INTO owner_product_id
                    FROM product_variants WHERE id = NEW.variant_id;
                END IF;

                SELECT category_id INTO category_id_value
                FROM products WHERE id = owner_product_id;

                SELECT attribute.data_type, category_attribute.is_variant_attribute
                    INTO data_type_value, variant_attribute_value
                FROM category_attribute
                INNER JOIN attributes AS attribute
                    ON attribute.id = category_attribute.attribute_id
                WHERE category_attribute.category_id = category_id_value
                    AND category_attribute.attribute_id = NEW.attribute_id
                    AND attribute.is_active = true;

                IF NOT FOUND THEN
                    RAISE EXCEPTION 'Attribute is not active and assigned to the product category';
                END IF;

                IF (TG_ARGV[0] = 'variant') <> variant_attribute_value THEN
                    RAISE EXCEPTION 'Attribute assignment does not match product or variant configuration';
                END IF;

                IF (data_type_value = 'TEXT' AND NEW.value_text IS NULL)
                    OR (data_type_value = 'NUMBER' AND NEW.value_number IS NULL)
                    OR (data_type_value = 'BOOLEAN' AND NEW.value_boolean IS NULL)
                    OR (data_type_value = 'DATE' AND NEW.value_date IS NULL)
                    OR (data_type_value = 'OPTION' AND NEW.option_id IS NULL) THEN
                    RAISE EXCEPTION 'Attribute value does not match the configured data type';
                END IF;

                IF (data_type_value <> 'TEXT' AND NEW.value_text IS NOT NULL)
                    OR (data_type_value <> 'NUMBER' AND NEW.value_number IS NOT NULL)
                    OR (data_type_value <> 'BOOLEAN' AND NEW.value_boolean IS NOT NULL)
                    OR (data_type_value <> 'DATE' AND NEW.value_date IS NOT NULL)
                    OR (data_type_value <> 'OPTION' AND NEW.option_id IS NOT NULL) THEN
                    RAISE EXCEPTION 'Attribute value contains a column incompatible with its data type';
                END IF;

                IF data_type_value = 'OPTION' AND NOT EXISTS (
                    SELECT 1 FROM attribute_options
                    WHERE id = NEW.option_id
                        AND attribute_id = NEW.attribute_id
                        AND is_active = true
                ) THEN
                    RAISE EXCEPTION 'Selected attribute option is inactive or does not exist';
                END IF;

                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql
        `);
        await queryRunner.query(`
            CREATE TRIGGER "TRG_product_attribute_value_validate"
            BEFORE INSERT OR UPDATE ON "product_attribute_values"
            FOR EACH ROW EXECUTE FUNCTION "validate_dynamic_attribute_value"('product')
        `);
        await queryRunner.query(`
            CREATE TRIGGER "TRG_variant_attribute_value_validate"
            BEFORE INSERT OR UPDATE ON "variant_attribute_values"
            FOR EACH ROW EXECUTE FUNCTION "validate_dynamic_attribute_value"('variant')
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_variant_attribute_values_filter"
                ON "variant_attribute_values" ("attribute_id", "value_number", "value_boolean")
        `);
        await queryRunner.query(`
            CREATE TABLE "product_identifiers" (
                "id" varchar(8) NOT NULL,
                "product_id" varchar(8) NOT NULL,
                "type" varchar(8) NOT NULL,
                "value" varchar(100) NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                CONSTRAINT "PK_product_identifiers_id" PRIMARY KEY ("id"),
                CONSTRAINT "uq_product_identifier_type_value" UNIQUE ("type", "value"),
                CONSTRAINT "CHK_product_identifiers_type"
                    CHECK ("type" IN ('SKU', 'GTIN', 'EAN', 'UPC', 'MPN')),
                CONSTRAINT "FK_product_identifiers_product" FOREIGN KEY ("product_id")
                    REFERENCES "products"("id") ON DELETE CASCADE
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "stores" (
                "id" varchar(8) NOT NULL,
                "name" varchar(255) NOT NULL,
                "slug" varchar(255) NOT NULL,
                "description" text,
                "logo" varchar(500),
                "website" varchar(500),
                "email" varchar(255),
                "phone" varchar(50),
                "status" varchar(16) NOT NULL DEFAULT 'PENDING',
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                CONSTRAINT "PK_stores_id" PRIMARY KEY ("id"),
                CONSTRAINT "uq_stores_slug" UNIQUE ("slug"),
                CONSTRAINT "CHK_stores_status" CHECK ("status" IN ('PENDING', 'ACTIVE', 'SUSPENDED'))
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "store_products" (
                "id" varchar(8) NOT NULL,
                "store_id" varchar(8) NOT NULL,
                "product_variant_id" varchar(8) NOT NULL,
                "external_product_id" varchar(255),
                "external_url" varchar(2048) NOT NULL,
                "title" varchar(255),
                "description" text,
                "availability_status" varchar(16) NOT NULL DEFAULT 'AVAILABLE',
                "stock_status" varchar(16) NOT NULL DEFAULT 'UNKNOWN',
                "last_checked_at" TIMESTAMPTZ,
                "is_active" boolean NOT NULL DEFAULT true,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                CONSTRAINT "PK_store_products_id" PRIMARY KEY ("id"),
                CONSTRAINT "uq_store_products_store_variant" UNIQUE ("store_id", "product_variant_id"),
                CONSTRAINT "CHK_store_products_availability"
                    CHECK ("availability_status" IN ('AVAILABLE', 'UNAVAILABLE', 'DISCONTINUED')),
                CONSTRAINT "CHK_store_products_stock"
                    CHECK ("stock_status" IN ('IN_STOCK', 'OUT_OF_STOCK', 'PREORDER', 'UNKNOWN')),
                CONSTRAINT "FK_store_products_store" FOREIGN KEY ("store_id")
                    REFERENCES "stores"("id") ON DELETE RESTRICT,
                CONSTRAINT "FK_store_products_variant" FOREIGN KEY ("product_variant_id")
                    REFERENCES "product_variants"("id") ON DELETE RESTRICT
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "uq_store_products_external_id"
                ON "store_products" ("store_id", "external_product_id")
                WHERE "external_product_id" IS NOT NULL
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_store_products_active_stock"
                ON "store_products" ("is_active", "availability_status", "stock_status")
        `);
        await queryRunner.query(`
            CREATE TABLE "prices" (
                "id" varchar(8) NOT NULL,
                "store_product_id" varchar(8) NOT NULL,
                "amount" bigint NOT NULL,
                "original_amount" bigint,
                "currency" varchar(3) NOT NULL DEFAULT 'IRR',
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                CONSTRAINT "PK_prices_id" PRIMARY KEY ("id"),
                CONSTRAINT "UQ_prices_store_product" UNIQUE ("store_product_id"),
                CONSTRAINT "CHK_prices_amount_nonnegative" CHECK ("amount" >= 0),
                CONSTRAINT "CHK_prices_original_amount_nonnegative"
                    CHECK ("original_amount" IS NULL OR "original_amount" >= 0),
                CONSTRAINT "FK_prices_store_product" FOREIGN KEY ("store_product_id")
                    REFERENCES "store_products"("id") ON DELETE CASCADE
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "price_history" (
                "id" varchar(8) NOT NULL,
                "store_product_id" varchar(8) NOT NULL,
                "amount" bigint NOT NULL,
                "original_amount" bigint,
                "currency" varchar(3) NOT NULL DEFAULT 'IRR',
                "recorded_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                CONSTRAINT "PK_price_history_id" PRIMARY KEY ("id"),
                CONSTRAINT "CHK_price_history_amount_nonnegative" CHECK ("amount" >= 0),
                CONSTRAINT "CHK_price_history_original_amount_nonnegative"
                    CHECK ("original_amount" IS NULL OR "original_amount" >= 0),
                CONSTRAINT "FK_price_history_store_product" FOREIGN KEY ("store_product_id")
                    REFERENCES "store_products"("id") ON DELETE CASCADE
            )
        `);
        await queryRunner.query(
            'CREATE INDEX "IDX_products_category_status" ON "products" ("category_id", "status")',
        );
        await queryRunner.query(
            'CREATE INDEX "IDX_products_brand_status" ON "products" ("brand_id", "status")',
        );
        await queryRunner.query(
            'CREATE INDEX "IDX_product_variants_product_active" ON "product_variants" ("product_id", "is_active")',
        );
        await queryRunner.query(
            'CREATE INDEX "IDX_product_identifiers_product" ON "product_identifiers" ("product_id")',
        );
        await queryRunner.query(
            'CREATE INDEX "IDX_stores_status_name" ON "stores" ("status", "name")',
        );
        await queryRunner.query(
            'CREATE INDEX "IDX_price_history_listing_recorded" ON "price_history" ("store_product_id", "recorded_at")',
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TRIGGER "TRG_variant_attribute_value_validate" ON "variant_attribute_values"');
        await queryRunner.query('DROP TRIGGER "TRG_product_attribute_value_validate" ON "product_attribute_values"');
        await queryRunner.query('DROP FUNCTION "validate_dynamic_attribute_value"()');
        await queryRunner.query('DROP TABLE "price_history"');
        await queryRunner.query('DROP TABLE "prices"');
        await queryRunner.query('DROP TABLE "store_products"');
        await queryRunner.query('DROP TABLE "stores"');
        await queryRunner.query('DROP TABLE "product_identifiers"');
        await queryRunner.query('DROP TABLE "variant_attribute_values"');
        await queryRunner.query('DROP TABLE "product_attribute_values"');
        await queryRunner.query(
            'ALTER TABLE "attribute_options" DROP CONSTRAINT "uq_attribute_options_id_attribute"',
        );
        await queryRunner.query('DROP TABLE "product_images"');
        await queryRunner.query('DROP TABLE "product_variants"');
        await queryRunner.query('DROP TABLE "products"');
        await queryRunner.query('DROP TABLE "brands"');
    }
}
