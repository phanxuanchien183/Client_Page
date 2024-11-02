import prisma from "../../lib/prisma";

const getAll = async (filter = {}) => {
  const result = await prisma.category.findMany({
    where: { ...filter },
    orderBy: { created_at: "desc" },
    include: {
      children: true
    }
  });
  return result;
};

const getOne = async (filter) => {
  try {
    const result = await prisma.category.findFirst({ where: { ...filter }, include: {children: true}, orderBy: {created_at: 'asc'} });
    return result;
  } catch (error) {
    console.log("error", error);
    throw "Không có dữ liệu danh mục";
  }
};

const create = async (params) => {
  const category = await prisma.category.findFirst({ name: params.name });
  if (category) throw "Tên danh mục đã tồn tại";
  const { parent_id, ...categoryParams } = params;
  await prisma.category.create({
    data: {
      parent: {
        connect: {
          id: parent_id,
        },
      },
      ...categoryParams,
    },
  });
};

const _delete = async (id) => {
  const children = await prisma.category.findFirst({
    where: { parent_id: id },
  });
  if (children) throw "Vui lòng xóa tất cả các danh mục liên quan đến danh mục này";
  const product = await prisma.product.findFirst({
    where: { category_id: id },
  });
  if (product) throw "Vui lòng xóa tất cả các sản phẩm liên quan đến danh mục này";

  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw "Danh mục không tồn tại";
  await prisma.category.delete({ where: { id } });
};

const update = async (id, params) => {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw "Danh mục không tồn tại";
  const { parent_id, ...categoryParams } = params;
  await prisma.category.update({
    where: { id },
    data: {
      parent: {
        connect: {
          id: parent_id,
        },
      },
      ...categoryParams,
    },
  });
};

export const categoryRepo = {
  getAll,
  getOne,
  create,
  update,
  delete: _delete,
};
