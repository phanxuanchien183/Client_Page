import prisma from "../../lib/prisma";

const getAll = async ({ page, page_size }, filter) => {
  const orders = await prisma.order.findMany({
    where: { ...filter },
    include: {
      account: true,
      order_details: true,
    },
    skip: (page - 1) * page_size,
    take: page_size,
    orderBy: {
      created_at: "desc",
    },
  });
  const ordersLength = await prisma.order.count({
    where: { ...filter },
  });

  return {
    orders,
    ordersLength,
    pagination: {
      currentPage: page,
      nextPage: page + 1,
      previousPage: page - 1,
      hasNextPage: page_size * page < ordersLength,
      hasPreviousPage: page > 1,
      lastPage: Math.ceil(ordersLength / page_size),
    },
  };
};

const getById = async (id) => {
  const result = await prisma.order.findUnique({ where: { id } });
  if (!result) throw "Đơn hàng không tồn tại";
  return result;
};

const create = async (id, params) => {
  const { account_id, payment_id, shipping_id, order_details, ...orderParams } =
    params;

  order_details?.forEach((item) => sold(item.product_id, item.quantity));
  await prisma.order.create({
    data: {
      account: {
        connect: {
          id: account_id,
        },
      },
      order_details: {
        createMany: {
          data: order_details,
        },
      },
      ...orderParams,
    },
  });
};

const sold = async (_id, quantity) => {
  const product = await prisma.product.findUnique({ where: { id } });
  await prisma.product.update({
    where: { id },
    data: {
      quantity: product.quantity - quantity,
    },
  });
};

const _delete = async (id) => {
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) throw "Đơn hàng không tồn tại";
  await prisma.order.delete({ where: { id } });
};

const update = async (id, params) => {
  const { account_id, payment_id, shipping_id, order_details, ...orderParams } =
    params;
  const order = await prisma.order.findById(id);
  if (!order) throw "Đơn hàng không tồn tại";
  await prisma.order.update({
    where: { id },
    data: {
      ...orderDto,
      account: {
        connect: {
          id: account_id,
        },
      },
      order_details: {
        upsert: order_details.map((detail) => ({
          where: {
            order_id_product_id: {
              order_id: id,
              product_id: detail.product_id,
            },
          },
          create: {
            product: {
              connect: {
                id: detail.product_id,
              },
            },
            quantity: detail.quantity,
            published: detail.published || true,
          },
          update: {
            quantity: detail.quantity,
            published: detail.published,
          },
        })),
      },
    },
  });
};

export const orderRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};
