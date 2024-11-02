import { EditIconBtn } from 'components/common/IconBtns'
import moment from 'moment-jalaali'
import Link from 'next/link'

const OrdersTable = props => {
  //? Props
  const { orders } = props

  //? Render(s)
  return (
    <div className="overflow-x-auto mt-7">
      <table className="w-full whitespace-nowrap">
        <thead className="h-9 bg-emerald-50">
          <tr className="text-emerald-500">
            <th className="border-gray-100 border-x-2">Mã</th>
            <th>Tên người nhận</th>
            <th>Tình trạng</th>
            <th className="border-gray-100 border-x-2">E-mail</th>
            <th>Thời gian đặt hàng</th>
            <th>Thay đổi trạng thái</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {orders.length > 0 &&
            orders.map(order => (
              <tr
                className="text-xs text-center transition-colors border-b border-gray-100 md:text-sm hover:bg-gray-50"
                key={order.id}
              >
                <td className="py-3 px-1.5">{order.id}</td>
                <td className="py-3 px-1.5">{order.user.name}</td>
                <td className="py-3 px-1.5">
                  {order.delivered ? (
                    <span className="inline-block p-1 text-green-600 rounded-md bg-green-50">
                      Hoàn thành
                    </span>
                  ) : (
                    <span className="p-1 rounded-md text-amber-600 bg-amber-50">
                      Chưa được xác nhận
                    </span>
                  )}
                </td>
                <td className="py-3 px-1.5">{order.user.email}</td>
                <td>{moment(order.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                <td className="p-2">
                  <Link href={`/admin/orders/${order.id}`}>
                    <EditIconBtn />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrdersTable
