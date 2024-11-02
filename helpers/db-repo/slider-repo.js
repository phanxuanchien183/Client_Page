import prisma from "../../lib/prisma";

const getAll = async (filter = {}, sort = {}) => {
  const result = await prisma.slider.findMany({
    where: { ...filter },
    orderBy: { ...sort },
  });
  return result;
};

const getById = async (id) => {
  const result = await prisma.slider.findUnique({ where: { id } });
  if (!result) throw "Dữ liệu không tồn tại";
  return result;
};

const getOne = async (filter) => {
  try {
    const result = await prisma.slider.findFirst({ where: filter });
    return result;
  } catch (error) {
    console.log(error);
    throw "Không có dữ liệu thanh trượt";
  }
};

const create = async (params) => {
  const { category_id, ...sliderParams } = params;
  await prisma.slider.create({
    data: { category: { connect: { id: category_id } }, ...sliderParams },
  });
};

const _delete = async (id) => {
  const result = await prisma.slider.findUnique({ where: { id } });
  if (!result) throw "Dữ liệu không tồn tại";
  await prisma.slider.delete({ where: { id } });
};

const update = async (id, params) => {
  const { category_id, ...sliderParams } = params;
  const result = await prisma.slider.findUnique({ where: { id } });
  if (!result) throw "Dữ liệu không tồn tại";
  await prisma.slider.update({
    where: { id },
    data: { category: { connect: { id: category_id } }, ...sliderParams },
  });
};

export const sliderRepo = {
  getAll,
  getById,
  getOne,
  create,
  update,
  delete: _delete,
};
