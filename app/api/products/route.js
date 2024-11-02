import joi from 'joi'

import { setJson, apiHandler } from '@/helpers/api'
import { getQuery, productRepo, categoryRepo } from '@/helpers'

const getAllProduct = apiHandler(async req => {
  const query = getQuery(req)

  const page = query.page ? +query.page : 1
  const page_size = query.page_size ? +query.page_size : 10
  const sort = query.sort ? +query.sort : 1

  const { category, search, inStock, discount, price } = query

  //? Filters
  const currentCategory = await categoryRepo.getOne({ slug: category })

  const categoryFilter = currentCategory
    ? {
        category: { id: currentCategory.id?.toString() },
      }
    : {}

  const searchFilter = search
    ? {
        title: {
          $regex: search,
          $options: 'i',
        },
      }
    : {}

  const inStockFilter = inStock === 'true' ? { quantity: { not: 0 } } : {}

  const discountFilter = discount === 'true' ? { price_sale_off: { not: null }, quantity: { not: 0 } } : {}

  const priceFilter = price
    ? {
        unit_price: {
          from: +price.split('-')[0],
          to: +price.split('-')[1],
        },
      }
    : {}

  //? Sort
  const order =
    sort === 3
      ? { unit_price: 'desc' }
      : sort === 4
        ? { unit_price: 'asc' }
        : sort === 1
          ? { created_at: 'desc' }
            : { id: 1 }

  const result = await productRepo.getAll(
    {
      page,
      page_size,
    },
    {
      ...categoryFilter,
      ...inStockFilter,
      ...discountFilter,
      ...priceFilter,
      ...searchFilter,
    },
    order
  )
  return setJson({
    data: result,
  })
})

const createProduct = apiHandler(
  async req => {
    const body = await req.json()
    await productRepo.create(body)
    return setJson({
      message: 'New product success',
    })
  },
  {
    isJwt: true,
    identity: 'admin',
    schema: joi.object({
      title: joi.string().required(),
      price: joi.number().required(),
      category: joi.array().required(),
      images: joi.array().required(),
      info: joi.array().required(),
      specification: joi.array().required(),
      inStock: joi.number(),
      description: joi.string().allow(''),
      discount: joi.number(),
      sizes: joi.array(),
      colors: joi.array(),
      category_levels: joi.object(),
    }),
  }
)

export const GET = getAllProduct
export const POST = createProduct
export const dynamic = 'force-dynamic'
