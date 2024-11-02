import prisma from "../../lib/prisma";

const getAll = async () => {
  const result = await prisma.detail.findMany({
    orderBy: { created_at: "desc" },
  });
  return result;
};

const getById = async (id) => {
  const result = await prisma.detail.findFirst({
    where: {
      category_id: id,
    },
  });
  // if (!result) throw 'Đặc điểm phân loại không tồn tại'
  return result;
};

const create = async (params) => {
  const { category_id, ...detailParams } = params;
  await prisma.detail.create({
    data: {
      category: {
        connect: {
          id: category_id,
        },
      },
      ...detailParams,
    },
  });
};

const _delete = async (id) => {
  const details = await prisma.detail.findUnique({ where: { id } });
  if (!details) throw "Đặc điểm phân loại không tồn tại";
  await prisma.detail.delete({ where: { id } });
};

const update = async (id, params) => {
  const { category_id, ...detailParams } = params;
  const details = await prisma.detail.findUnique({ where: { id } });
  if (!details) throw "Đặc điểm phân loại không tồn tại";
  await prisma.detail.update({
    where: { id },
    data: {
      category: {
        connect: {
          id: category_id,
        },
      },
      ...detailParams,
    },
  });
};

export const detailsRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};
