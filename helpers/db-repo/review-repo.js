import prisma from "../../lib/prisma";

const getAll = async ({ page, page_size }, filter) => {
  const reviews = await prisma.review.findMany({
    where: { ...filter },
    include: { product: true, account: true },
    skip: (page - 1) * page_size,
    take: page_size,
    orderBy: {
      created_at: "desc",
    },
  });
  const reviewsLength = await prisma.review.count({ where: { ...filter } });
  return {
    reviews,
    reviewsLength,
    pagination: {
      currentPage: page,
      nextPage: page + 1,
      previousPage: page - 1,
      hasNextPage: page_size * page < reviewsLength,
      hasPreviousPage: page > 1,
      lastPage: Math.ceil(reviewsLength / page_size),
    },
  };
};

const getById = async (id) => {
  const result = await prisma.review.findUnique({
    where: { id },
    include: { product: true, account: true },
  });
  if (!result) throw "Dữ liệu không tồn tại";
  return result;
};

const create = async (params) => {
  const { account_id, product_id, ...reviewParams } = params;
  await prisma.review.create({
    data: {
      account: {
        connect: {
          account_id,
        },
      },
      product: {
        connect: {
          product_id,
        },
      },
      ...reviewParams,
    },
  });
};

const _delete = async (id) => {
  const result = await prisma.review.findUnique({ where: { id } });
  if (!result) throw "Dữ liệu không tồn tại";
  await prisma.review.delete({ where: { id } });
};

const update = async (id, params) => {
  const { account_id, product_id, ...reviewParams } = params;
  const result = await prisma.review.findUnique({ where: { id } });
  if (!result) throw "Dữ liệu không tồn tại";
  await prisma.review.update({
    where: { id },
    data: {
      account: {
        connect: {
          account_id,
        },
      },
      product: {
        connect: {
          product_id,
        },
      },
      ...reviewParams,
    },
  });
  return result;
};

export const reviewRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};
