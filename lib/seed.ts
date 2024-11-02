import { sql } from '@vercel/postgres'

export async function seed() {
  const createTable = await sql`
    -- CreateEnum
    CREATE TYPE "Type" AS ENUM ('COLORS', 'SIZES', 'NONE');

    -- CreateTable
    CREATE TABLE IF NOT EXISTS "accounts" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
        "user_id" TEXT NOT NULL,
        "user_name" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        "salt" TEXT,
        "refresh_token" TEXT,
        "published" BOOLEAN DEFAULT false,
        "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
    );

    -- CreateTable
    CREATE TABLE IF NOT EXISTS "users" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "phone" TEXT NOT NULL,
        "dob" TEXT NOT NULL,
        "address" JSONB,
        "published" BOOLEAN DEFAULT false,
        "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT "users_pkey" PRIMARY KEY ("id")
    );

    -- CreateTable
    CREATE TABLE IF NOT EXISTS "roles" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
        "name" TEXT NOT NULL,
        "slug" TEXT NOT NULL,
        "published" BOOLEAN DEFAULT false,
        "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
    );

    -- CreateTable
    CREATE TABLE IF NOT EXISTS "product_status" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
        "name" TEXT NOT NULL,
        "published" BOOLEAN DEFAULT false,
        "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT "product_status_pkey" PRIMARY KEY ("id")
    );

    -- CreateTable
    CREATE TABLE IF NOT EXISTS "categories" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
        "name" TEXT NOT NULL,
        "slug" TEXT NOT NULL,
        "parent_id" TEXT,
        "published" BOOLEAN DEFAULT false,
        "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
    );

    -- CreateTable
    CREATE TABLE IF NOT EXISTS "sliders" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
        "title" TEXT NOT NULL,
        "uri" TEXT,
        "image" JSONB,
        "category_id" TEXT,
        "published" BOOLEAN DEFAULT false,
        "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT "sliders_pkey" PRIMARY KEY ("id")
    );

    -- CreateTable
    CREATE TABLE IF NOT EXISTS "details" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
        "info" JSONB,
        "specification" JSONB,
        "options_type" "Type" DEFAULT 'NONE',
        "category_id" TEXT,
        "published" BOOLEAN DEFAULT false,
        "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT "details_pkey" PRIMARY KEY ("id")
    );

    -- CreateTable
    CREATE TABLE IF NOT EXISTS "banners" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
        "title" TEXT NOT NULL,
        "uri" TEXT,
        "image" JSONB,
        "type" TEXT,
        "category_id" TEXT,
        "published" BOOLEAN DEFAULT false,
        "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT "banners_pkey" PRIMARY KEY ("id")
    );

    -- CreateTable
    CREATE TABLE IF NOT EXISTS "products" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
        "name" TEXT NOT NULL,
        "slug" TEXT NOT NULL,
        "unit_weight" TEXT NOT NULL,
        "unit_price" TEXT NOT NULL,
        "currency" TEXT NOT NULL,
        "description_tiny" TEXT,
        "description_full" TEXT,
        "category_id" TEXT,
        "status_id" TEXT,
        "price_sale_off" TEXT,
        "sale_off_from" TIMESTAMP(3),
        "sale_off_to" TIMESTAMP(3),
        "quantity" INTEGER,
        "featured" BOOLEAN DEFAULT false,
        "is_new" BOOLEAN DEFAULT true,
        "published" BOOLEAN DEFAULT false,
        "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT "products_pkey" PRIMARY KEY ("id")
    );

    -- CreateTable
    CREATE TABLE IF NOT EXISTS "order_details" (
        "order_id" TEXT NOT NULL,
        "product_id" TEXT NOT NULL,
        "quantity" INTEGER NOT NULL,
        "published" BOOLEAN DEFAULT false,
        "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT "order_details_pkey" PRIMARY KEY ("order_id","product_id")
    );

    -- CreateTable
    CREATE TABLE IF NOT EXISTS "orders" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
        "account_id" TEXT NOT NULL,
        "shipping_id" TEXT,
        "payment_id" TEXT,
        "published" BOOLEAN DEFAULT false,
        "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
    );

    -- CreateTable
    CREATE TABLE IF NOT EXISTS "ratings" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
        "name" TEXT NOT NULL,
        "point" DECIMAL(65,30) NOT NULL,
        "published" BOOLEAN DEFAULT false,
        "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT "ratings_pkey" PRIMARY KEY ("id")
    );

    -- CreateTable
    CREATE TABLE IF NOT EXISTS "payments" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
        "name" TEXT NOT NULL,
        "published" BOOLEAN DEFAULT false,
        "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
    );

    -- CreateTable
    CREATE TABLE IF NOT EXISTS "payment_details" (
        "payment_id" TEXT NOT NULL,
        "account_id" TEXT NOT NULL,
        "card_holder" TEXT,
        "card_number" TEXT,
        "card_expire" TEXT,
        "address" TEXT,
        "email" TEXT,
        "phone" TEXT,
        "published" BOOLEAN DEFAULT false,
        "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT "payment_details_pkey" PRIMARY KEY ("payment_id","account_id")
    );

    -- CreateTable
    CREATE TABLE IF NOT EXISTS "shippings" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
        "name" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "price" TEXT NOT NULL,
        "currency" TEXT NOT NULL,
        "published" BOOLEAN DEFAULT false,
        "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT "shippings_pkey" PRIMARY KEY ("id")
    );

    -- CreateTable
    CREATE TABLE IF NOT EXISTS "shipping_addresses" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
        "account_id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "phone" TEXT NOT NULL,
        "address" JSONB NOT NULL,
        "zip_code" TEXT NOT NULL,
        "province" TEXT NOT NULL,
        "city" TEXT NOT NULL,
        "area" TEXT NOT NULL,
        "country" TEXT NOT NULL,
        "published" BOOLEAN DEFAULT false,
        "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT "shipping_addresses_pkey" PRIMARY KEY ("id")
    );

    -- CreateTable
    CREATE TABLE IF NOT EXISTS "reviews" (
        "account_id" TEXT NOT NULL,
        "product_id" TEXT NOT NULL,
        "vote_id" TEXT NOT NULL,
        "comment" TEXT NOT NULL,
        "published" BOOLEAN DEFAULT false,
        "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT "reviews_pkey" PRIMARY KEY ("account_id","product_id","vote_id")
    );

    -- CreateTable
    CREATE TABLE IF NOT EXISTS "_AccountToRole" (
        "A" TEXT NOT NULL,
        "B" TEXT NOT NULL
    );

    -- CreateTable
    CREATE TABLE IF NOT EXISTS "_AccountToProduct" (
        "A" TEXT NOT NULL,
        "B" TEXT NOT NULL
    );

    -- CreateIndex
    CREATE UNIQUE INDEX "accounts_user_id_key" ON "accounts"("user_id");

    -- CreateIndex
    CREATE UNIQUE INDEX "accounts_user_name_key" ON "accounts"("user_name");

    -- CreateIndex
    CREATE UNIQUE INDEX "shipping_addresses_account_id_key" ON "shipping_addresses"("account_id");

    -- CreateIndex
    CREATE UNIQUE INDEX "_AccountToRole_AB_unique" ON "_AccountToRole"("A", "B");

    -- CreateIndex
    CREATE INDEX "_AccountToRole_B_index" ON "_AccountToRole"("B");

    -- CreateIndex
    CREATE UNIQUE INDEX "_AccountToProduct_AB_unique" ON "_AccountToProduct"("A", "B");

    -- CreateIndex
    CREATE INDEX "_AccountToProduct_B_index" ON "_AccountToProduct"("B");
    `;

  console.log(`Created tables`)

  const roles = await Promise.all([
    sql`
          INSERT INTO public.roles(id, "name", slug, published, created_at, updated_at)
          VALUES('114283dd-3aa7-41f8-85e4-688b7b80affc', 'Administrator', 'admin', true, '2024-08-27', '2024-08-27');
      `,
    sql`
          INSERT INTO public.roles(id, "name", slug, published, created_at, updated_at)
          VALUES('d25984db-e19f-4b46-8d50-ba4a213894e8', 'Customer', 'customer', true, '2024-08-27', '2024-08-27');
      `,
  ])
  console.log(`Seeded ${roles.length} roles`)

  const users = await Promise.all([
    sql`
          INSERT INTO public.users(id, "name", email, phone, dob, address, published, created_at, updated_at)
          VALUES('3d652168-c8b5-4b43-b9cb-a39ad8464c05','Nguyễn Minh Phong','join.keljn@gmail.com','096474932','01/06/1996',NULL,true,'2024-08-27','2024-08-27');
      `,
  ])
  console.log(`Seeded ${users.length} users`)

  const accounts = await Promise.all([
    sql`
          INSERT INTO public.accounts(id, user_name, "password", salt, refresh_token, user_id, published, created_at, updated_at)
          VALUES('03ad4dee-55b9-4320-8df5-6e8a6912b37e', 'phong.nm', '$2b$10$QlrpxgygBSHv2EtW/lJVUuwTbsFo6q4n/QztYTdkmAFQ1Pk82GoWq', '$2b$10$QlrpxgygBSHv2EtW/lJVUu', NULL, '3d652168-c8b5-4b43-b9cb-a39ad8464c05', true, '2024-08-27', '2024-08-27');
      `,
  ])
  console.log(`Seeded ${accounts.length} accounts`)

  const accountRoles = await Promise.all([
    sql`
          INSERT INTO public."_AccountToRole"("A", "B")
          VALUES('03ad4dee-55b9-4320-8df5-6e8a6912b37e', '114283dd-3aa7-41f8-85e4-688b7b80affc');
      `,
  ])
  console.log(`Seeded ${accountRoles.length} account roles`)

  return {
    createTable,
    roles,
    users,
    accounts,
    accountRoles
  }
}
