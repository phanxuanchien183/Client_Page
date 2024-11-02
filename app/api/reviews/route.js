import joi from 'joi'

import { setJson, apiHandler } from '@/helpers/api'
import { getQuery, usersRepo, reviewRepo } from '@/helpers'

const getAll = apiHandler(
  async req => {
    const userId = req.headers.get('userId')
    const user = await usersRepo.getById(userId);
    const query = getQuery(req)

    const page = query.page ? +query.page : 1
    const page_size = query.page_size ? +query.page_size : 10

    const result = await reviewRepo.getAll(
      {
        page,
        page_size,
      },
      {
        account: {id: user?.account?.id},
      }
    )

    return setJson({
      data: result,
    })
  },
  {
    isJwt: true,
  }
)

const create = apiHandler(
  async req => {
    const userId = req.headers.get('userId')
    const body = await req.json()
    await reviewRepo.create(userId, body)
    return setJson({
      message: 'Successful success',
    })
  },
  {
    isJwt: true,
    schema: joi.object({
      product: joi.string().required(),
      title: joi.string().required(),
      rating: joi.number().required(),
      comment: joi.string().required(),
      negativePoints: joi.array(),
      positivePoints: joi.array(),
    }),
  }
)

export const GET = getAll
export const POST = create
export const dynamic = 'force-dynamic'
