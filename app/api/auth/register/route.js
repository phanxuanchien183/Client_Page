import joi from "joi";

import { usersRepo } from "helpers";
import { apiHandler, setJson } from "helpers/api";

const register = apiHandler(
  async (req) => {
    const body = await req.json();
    body.dob = "";
    const result = await usersRepo.create(body);
    return setJson({
      data: result,
    });
  },
  {
    schema: joi.object({
      name: joi.string().required(),
      email: joi.string().required(),
      phone: joi.string().required(),
      user_name: joi.string().required(),
      password: joi.string().min(6).required(),
    }),
  }
);

export const POST = register;
export const dynamic = "force-dynamic";
