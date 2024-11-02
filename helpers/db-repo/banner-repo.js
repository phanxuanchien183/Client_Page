import prisma from "../../lib/prisma";

const getAll = async (query = {}, filter = {}, sort = {}) => {
  const result = await prisma.banner.findMany({
    where: { ...filter },
    orderBy: { created_at: "desc" },
  });
  return result;
};

const getById = async (id) => {
  const result = await prisma.banner.findUnique({ where: { id } });
  if (!result) throw "Dữ liệu không tồn tại";
  return result;
};

const create = async (params) => {
  const { category_id, ...bannerParams } = params;
  await prisma.banner.create({
    data: {
      category: {
        connect: {
          id: category_id,
        },
      },
      ...bannerParams,
    },
  });
};

const _delete = async (id) => {
  const result = await prisma.banner.findUnique({ where: { id } });
  if (!result) throw "Dữ liệu không tồn tại";
  await prisma.banner.delete({ where: { id } });
};

const update = async (id, params) => {
  const { category_id, ...bannerParams } = params;
  const result = await prisma.banner.findUnique({ where: { id } });
  if (!result) throw "Dữ liệu không tồn tại";
  await prisma.banner.update({
    where: { id },
    data: {
      category: {
        connect: {
          id: category_id,
        },
      },
      ...bannerParams,
    },
  });
};

export const bannerRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};
