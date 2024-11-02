'use client'

import { useGetReviewsListQuery } from '@/store/services'

import {
  Pagination,
  ShowWrapper,
  EmptyCommentsList,
  PageContainer,
  ReviewsTable,
  TableSkeleton,
} from '@/components'

import { useTitle, useUrlQuery, useChangeRoute, useTranslate } from '@/hooks'

const ReviewsPage = () => {
  const trans = useTranslate()
  useTitle(trans.common.review_management)
  //? Assets
  const query = useUrlQuery()
  const page = query.page ? +query.page : 1

  const changeRoute = useChangeRoute()

  //? Get Review Data
  const { data, isError, error, isFetching, refetch, isSuccess } = useGetReviewsListQuery({
    page,
  })

  //? Render
  return (
    <main id="_adminReviews">
      <PageContainer title={trans.common.review_management}>
        <ShowWrapper
          error={error}
          isError={isError}
          refetch={refetch}
          isFetching={isFetching}
          isSuccess={isSuccess}
          dataLength={data?.data?.reviewsLength ?? 0}
          emptyComponent={<EmptyCommentsList />}
          loadingComponent={<TableSkeleton />}
        >
          {data && data?.data && <ReviewsTable reviews={data?.data?.reviews} />}
        </ShowWrapper>
        {data && data?.data && data?.data?.reviewsLength > 10 && (
          <div className="py-4 mx-auto lg:max-w-5xl">
            <Pagination
              pagination={data?.data?.pagination}
              changeRoute={changeRoute}
              section="_adminReviews"
            />
          </div>
        )}
      </PageContainer>
    </main>
  )
}

export default ReviewsPage
