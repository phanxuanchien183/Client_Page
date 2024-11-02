import { productRepo } from '@/helpers'

import {
  FreeShipping,
  Services,
  SmilarProductsSlider,
  ImageGallery,
  Description,
  Specification,
  Reviews,
  SelectColor,
  SelectSize,
  OutOfStock,
  AddToCart,
  Info,
  Breadcrumb,
  InitialStore,
} from '@/components'

import { useTranslate } from '@/hooks'

const getData = async params => {
  const product = await productRepo.getById({ id: params?.id })

  if (!product) return { notFound: true }

  const product_categoryID = product.category_id

  const smilarProducts = await productRepo.getAll({page: 1, page_size: 11}, {
    category_id: product_categoryID,
    quantity: {
      not: 0
    },
    id: product.id,
  })

  return {
    product: JSON.parse(JSON.stringify(product)),
    smilarProducts: {
      title: params?.title,
      products: JSON.parse(JSON.stringify(smilarProducts)),
    },
  }
}

const getDiscount = (product) => {
  return Math.round(
    Number(product?.unit_price - product?.price_sale_off) /
      Number(product?.unit_price / 100),
  )
}

const SingleProduct = async ({ params }) => {
  const trans = useTranslate()
  const { product, smilarProducts } = await getData({title: trans.product.related, ...params})

  return (
    <main className="xl:mt-28 container mx-auto py-4 space-y-4">
      <InitialStore product={product} />
      <Breadcrumb categoryLevels={product.category_levels} />

      <div className="h-fit lg:h-fit lg:grid lg:grid-cols-9 lg:px-4 lg:gap-x-2 lg:gap-y-4 lg:mb-10 xl:gap-x-7">
        <ImageGallery
          images={product.images}
          discount={getDiscount(product)}
          inStock={product.quantity}
          productName={product.title}
        />
        <div className="lg:col-span-4 ">
          {/* title */}
          <h2 className="p-3 text-base font-semibold leading-8 tracking-wide text-black/80 ">
            {product.title}
          </h2>

          <div className="section-divide-y" />

          {product.quantity > 0 && product.colors?.length > 0 && (
            <SelectColor colors={product.colors} />
          )}

          {product.quantity > 0 && product.sizes?.length > 0 && <SelectSize sizes={product.sizes} />}

          {product.quantity === 0 && <OutOfStock />}

          <Info infos={product?.info} />

          <FreeShipping />
        </div>
        <div className="lg:col-span-2">
          {product.quantity > 0 && <AddToCart product={product} />}
        </div>
      </div>

      <Services />

      {product.description.length > 0 && <Description description={product.description} />}

      <SmilarProductsSlider smilarProducts={smilarProducts} />

      <div className="section-divide-y" />

      <div className="flex">
        <div className="flex-1">
          <Specification specification={product.specification} />

          <div className="section-divide-y" />

          <Reviews
            numReviews={product.numReviews}
            prdouctID={product.id}
            productTitle={product.title}
          />
        </div>

        <div className="hidden w-full px-3 lg:block lg:max-w-xs xl:max-w-sm">
          {product.quantity > 0 && <AddToCart product={product} second />}
        </div>
      </div>
    </main>
  )
}

export default SingleProduct
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { product, smilarProducts } = await getData(params)

  return {
    title: `${product.title}`,
    description: `${product.description}`,
  }
}
