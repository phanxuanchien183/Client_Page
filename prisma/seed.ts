// prisma/seed.ts
// import { PrismaClient } from '@prisma/client';
import { PrismaClient } from './generated/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function rawSql() {
  await prisma.$transaction(async ($tx: any) => {
    let result;
    result = await $tx.$executeRaw`
      INSERT INTO public.roles (id, "name", slug, published, created_at, updated_at) 
      VALUES('114283dd-3aa7-41f8-85e4-688b7b80affc', 'Administrator', 'admin', true, '2024-07-02', '2024-07-02');
    `;
    console.log({ result });

    result = await $tx.$executeRaw`
      INSERT INTO public.roles (id, "name", slug, published, created_at, updated_at) 
      VALUES('18aa7dc0-933f-4c04-bb8e-a88e43f384fc', 'Customer', 'customer', true, '2024-07-02', '2024-07-02');
    `;
    console.log({ result });

    result = await $tx.$executeRaw`
      INSERT INTO public.users (id, "name", email, phone, dob, address, published, created_at, updated_at)
      VALUES('3d652168-c8b5-4b43-b9cb-a39ad8464c05','Nguyễn Minh Phong','join.keljn@gmail.com','096474932','01/06/1996',null,true,'2024-07-02','2024-07-02');
    `;
    console.log({ result });

    result = await $tx.$executeRaw`
      INSERT INTO public.accounts(id, user_name, "password", salt, refresh_token, user_id, published, created_at, updated_at)
      VALUES('03ad4dee-55b9-4320-8df5-6e8a6912b37e', 'admin', '$2b$10$QlrpxgygBSHv2EtW/lJVUuwTbsFo6q4n/QztYTdkmAFQ1Pk82GoWq', '$2b$10$QlrpxgygBSHv2EtW/lJVUu', NULL, '3d652168-c8b5-4b43-b9cb-a39ad8464c05', true, '2024-07-02', '2024-07-02');
    `;
    console.log({ result });

    result = await $tx.$executeRaw`
      INSERT INTO public."_AccountToRole"("A", "B")
      VALUES('03ad4dee-55b9-4320-8df5-6e8a6912b37e', '114283dd-3aa7-41f8-85e4-688b7b80affc');
    `;
    console.log({ result });
  });
}

async function main() {
}

// execute the main function
main()
  .then(rawSql)
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });