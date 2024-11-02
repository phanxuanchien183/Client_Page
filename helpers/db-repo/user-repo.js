import bcrypt from "bcryptjs";

import { auth } from "..";
import prisma from "../../lib/prisma";

const saltRounds = 10;

const getAll = async ({ page, page_size }, filter) => {
  const users = await prisma.user.findMany({
    where: { ...filter },
    skip: Number(page_size * (page - 1)),
    take: Number(page_size),
    orderBy: {
      created_at: "desc",
    },
    include: {
      account: {
        include: { roles: { select: { slug: true } } },
      },
    },
  });
  const usersLength = await prisma.user.count({ where: { ...filter } });
  return {
    users,
    usersLength,
    pagination: {
      currentPage: page,
      nextPage: page + 1,
      previousPage: page - 1,
      hasNextPage: page_size * page < usersLength,
      hasPreviousPage: page > 1,
      lastPage: Math.ceil(usersLength / page_size),
    },
  };
};

const update = async (id, params) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) throw "Người dùng không tồn tại";

  Object.assign(user, params);

  await prisma.user.update({
    where: {
      id,
    },
    data: user,
  });
};

const create = async (params) => {
  const { user_name, password, ...userParams } = params;
  if (await prisma.account.findFirst({ where: { user_name } })) {
    const userExistsError = new Error(
      'Tài khoản "' + user_name + '" đã tồn tại'
    );
    userExistsError.name = "UserExistsError";
    throw userExistsError;
  }
  if (await prisma.user.findFirst({ where: { email: userParams.email } })) {
    const userExistsError = new Error(
      'Email "' + userParams.email + '" đã tồn tại'
    );
    userExistsError.name = "UserExistsError";
    throw userExistsError;
  }
  const salt = await bcrypt.genSalt(saltRounds);
  const hashPassword = await bcrypt.hash(password, salt);
  const roles = await prisma.role.findMany();
  const newAccount = await prisma.account.create({
    data: {
      user: {
        create: { ...userParams },
      },
      roles: {
        connect: roles.filter(x => x.slug === "customer"),
      },
      user_name,
      password: hashPassword,
      salt,
    },
  });
  const newUser = await prisma.user.findUnique({
    where: { id: newAccount.user_id },
  });
  const newAccountRoles = await prisma.user.findMany({
    where: { account: { id: newAccount.id } },
  });
  const token = auth.createAccessToken({ id: newUser.id });

  return {
    user: {
      name: newUser.name,
      email: newUser.email,
      roles: newAccountRoles,
    },
    token,
  };
};

const authenticate = async ({ user_name, password } = {}) => {
  const account = await prisma.account.findFirst({
    where: { user_name },
    include: { roles: true },
  });
  const user = await prisma.user.findUnique({ where: { id: account.user_id } });

  if (!user || !account) {
    throw "Người dùng không tồn tại";
  }
  const isMatch = await bcrypt.compare(password, account.password);
  if (!isMatch) {
    throw "Tên tài khoản hoặc mật khẩu không chính xác";
  }
  const token = auth.createAccessToken({ id: user.id });
  return {
    user: {
      name: user.name,
      email: user.email,
      roles: account.roles,
    },
    token,
  };
};

const _delete = async (id) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw "Người dùng không tồn tại";
  await prisma.account.delete({ where: { user_id: user.id } });
  await prisma.user.delete({ where: { id } });
};

const resetPassword = async (id, password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashPassword = await bcrypt.hash(password, salt);
  const user = await prisma.user.findUnique({ where: { id } });
  const account = await prisma.account.findUnique({
    where: { user_id: user.id },
  });
  if (!user || !account) throw "Người dùng không tồn tại";
  await prisma.account.update({
    where: { id: account.id },
    data: { password: hashPassword, salt },
  });
};

const getById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { account: { include: { roles: { select: { slug: true } } } } },
    });
    return user;
  } catch {
    throw "Người dùng không tồn tại";
  }
};

const getOne = async (filter) => {
  try {
    const user = await prisma.user.findFirst({
      where: { ...filter },
      include: { account: { include: { roles: { select: { slug: true } } } } },
    });
    return user;
  } catch {
    throw "Không có dữ liệu";
  }
};

export const usersRepo = {
  create,
  getAll,
  getById,
  getOne,
  update,
  delete: _delete,
  resetPassword,
  authenticate,
};
