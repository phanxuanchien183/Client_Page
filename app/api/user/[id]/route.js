import joi from 'joi'

import { usersRepo } from 'helpers'
import { apiHandler } from 'helpers/api'
import { setJson } from '@/helpers/api'

const updateRole = apiHandler(
  async (req, { params }) => {
    const { id } = params
    const body = await req.json()
    await usersRepo.update(id, body)

    return setJson({
      message: 'Successful update',
    })
  },
  {
    isJwt: true,
    schema: joi.object({
      role: joi.object({
        slug: joi.string().required().valid('customer', 'admin')
      }),
    }),
    identity: 'root',
  }
)

const deleteUser = apiHandler(
  async (req, { params }) => {
    const { id } = params
    await usersRepo.delete(id)
    return setJson({
      message: 'User information has been deleted',
    })
  },
  {
    isJwt: true,
    identity: 'root',
  }
)

export const PATCH = updateRole
export const DELETE = deleteUser
export const dynamic = 'force-dynamic'
