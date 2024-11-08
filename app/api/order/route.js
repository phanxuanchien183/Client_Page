import joi from 'joi'
import { setJson, apiHandler } from '@/helpers/api'
import { getQuery, usersRepo, orderRepo } from '@/helpers'

const getOrders = apiHandler(
  async req => {
    const query = getQuery(req)
    const page = query.page ? +query.page : 1
    const page_size = query.page_size ? +query.page_size : 10
    const userId = req.headers.get('userId')
    const user = await usersRepo.getById(userId);
    const result = await orderRepo.getAll(
      {
        page,
        page_size,
      },
      { account: {id: user?.account?.id} }
    )
    return setJson({
      data: result,
    })
  },
  {
    isJwt: true,
  }
)

const createOrder = apiHandler(
  async req => {
    const userId = req.headers.get('userId')
    const body = await req.json()
    await orderRepo.create(userId, body)
    return setJson({
      message: 'Successful creation order',
    })
  },
  {
    isJwt: true,
    schema: joi.object({
      address: joi.object().required(),
      mobile: joi.string(),
      cart: joi.array().required(),
      totalItems: joi.number().required(),
      totalPrice: joi.number().required(),
      totalDiscount: joi.number().required(),
      paymentMethod: joi.string().required(),
    }),
  }
)

export const GET = getOrders
export const POST = createOrder
export const dynamic = 'force-dynamic'
