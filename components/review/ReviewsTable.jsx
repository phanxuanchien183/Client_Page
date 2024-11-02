import Link from 'next/link'

import { EditIconBtn, ResponsiveImage } from 'components'

const ReviewsTable = props => {
  //? Props
  const { reviews } = props

  //? Render(s)
  return (
    <section className="mx-3 overflow-x-auto mt-7 lg:mx-10">
      <table className="w-full whitespace-nowrap">
        <thead className="h-9 bg-emerald-50">
          <tr className="text-emerald-500">
            <th></th>
            <th className="border-gray-100 border-x-2">Mã</th>
            <th>Tình trạng</th>
            <th className="border-gray-100 border-x-2">Người dùng</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {reviews.length > 0 &&
            reviews.map(review => (
              <tr
                className="text-xs text-center transition-colors border-b border-gray-100 md:text-sm hover:bg-gray-50"
                key={review.id}
              >
                <td className="p-2">
                  <ResponsiveImage
                    dimensions="w-7 h-7"
                    className="mx-auto"
                    src={review.product.images[0].url}
                    alt=""
                  />
                </td>
                <td className="p-2">{review.id}</td>
                <td className="p-2 font-bold">
                  <span
                    className={`py-1.5 px-2 rounded-lg font-bold inline-block
                      ${
                        review.status === 1
                          ? 'bg-amber-100 text-amber-500 '
                          : review.status === 2
                            ? 'bg-green-100 text-green-500 '
                            : 'bg-red-100 text-red-500 '
                      }
                    `}
                  >
                    {review.status === 1
                      ? 'Chờ xác nhận'
                      : review.status === 2
                        ? 'Xác nhận'
                        : 'none'}
                  </span>
                </td>
                <td className="p-2">{review.user.name}</td>

                <td className="p-2">
                  <Link href={`/admin/reviews/${review.id}`}>
                    <EditIconBtn />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  )
}

export default ReviewsTable
