import joi from "joi";

import { usersRepo } from "helpers";
import { apiHandler } from "helpers/api";
import { setJson } from "@/helpers/api";

const getUertInfo = apiHandler(
  async (req) => {
    const userId = req.headers.get("userId");
    const user = await usersRepo.getById(userId);
    const account = user.account;
    return setJson({
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        roles: account.roles,
        address: user.address,
      },
    });
  },
  {
    isJwt: true,
  }
);

export const GET = getUertInfo;
export const dynamic = "force-dynamic";
