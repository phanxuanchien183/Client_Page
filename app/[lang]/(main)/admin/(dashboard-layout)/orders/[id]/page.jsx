'use client'

import { useGetSingleOrderQuery } from '@/store/services'

import { BigLoading, DashboardLayout, OrderCard, PageContainer } from '@/components'

import { useTitle, useUrlQuery, useTranslate } from '@/hooks'

const SingleOrder = ({ params }) => {
  const trans = useTranslate()
  useTitle(trans.order.detail)
  //? Assets
  const query = useUrlQuery()

  //? Get Order Data
  const { data, isLoading } = useGetSingleOrderQuery({
    id: params.id,
  })

  //? Render(s)
  return (
    <main>
      <PageContainer title={trans.order.detail}>
        {isLoading ? (
          <div className="px-3 py-20">
            <BigLoading />
          </div>
        ) : data ? (
          <section className="max-w-5xl px-3 py-3 mx-auto lg:px-8">
            <OrderCard singleOrder order={data?.data} />
          </section>
        ) : null}
      </PageContainer>
    </main>
  )
}

export default SingleOrder
