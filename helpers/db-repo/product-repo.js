import prisma from "../../lib/prisma";

const getAll = async ({ page, page_size }, filter = {}, sort = {}) => {
  const products = await prisma.product.findMany({
    where: { ...filter },
    skip: (page - 1) * page_size,
    take: page_size,
    orderBy: { created_at: 'desc' },
  });
  const productsLength = await prisma.product.count({
    where: { ...filter },
  });

  const mainMaxPrice = Math.max(
    ...(await prisma.product.findMany({
      where: { category_id: filter.category_id, NOT: { quantity: 0 } },
      distinct: ["unit_price"],
      select: {
        unit_price: true,
      },
    }))
  );
  const mainMinPrice = Math.min(
    ...(await prisma.product.findMany({
      where: { category_id: filter.category_id, NOT: { quantity: 0 } },
      distinct: ["unit_price"],
      select: {
        unit_price: true,
      },
    }))
  );

  return {
    mainMaxPrice,
    mainMinPrice,
    products,
    productsLength,
    pagination: {
      currentPage: page,
      nextPage: page + 1,
      previousPage: page - 1,
      hasNextPage: page_size * page < productsLength,
      hasPreviousPage: page > 1,
      lastPage: Math.ceil(productsLength / page_size),
    },
  };
};

const getById = async (id) => {
  const result = await prisma.product.findUnique({ where: { id } });
  if (!result) throw "Sản phẩm không tồn tại";
  return result;
};

const create = async (params) => {
  const { category_id, ...productParams } = params;
  await prisma.product.create({
    data: {
      category: {
        connect: {
          id: category_id,
        },
      },
      ...productParams,
    },
  });
};

const _delete = async (id) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) throw "Sản phẩm không tồn tại";
  await prisma.product.delete({ where: { id } });
};

const update = async (id, params) => {
  const { category_id, ...productParams } = params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) throw "Sản phẩm không tồn tại";
  await prisma.product.update({
    where: { id },
    data: {
      category: {
        connect: {
          id: category_id,
        },
      },
      ...productParams,
    },
  });
};

const getItemDetail = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) return { notFound: true };

  const smilarProducts = await prisma.product.findMany({
    where: {
      category: {
        id: product.category_id,
      },
      quantity: {
        not: 0,
      },
    },
    take: 11,
  });

  return {
    product,
    smilarProducts: {
      title: "Sản phẩm tương tự",
      products: smilarProducts,
    },
  };
};

export const productRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  getItemDetail,
};
