import { formatNumber } from 'utils'

import { Button } from 'components'

import { useAppSelector } from 'hooks'

const CartInfo = props => {
  //? Porps
  const { handleRoute, cart } = props

  //? Store
  const { totalItems, totalPrice, totalDiscount } = useAppSelector(state => state.cart)

  //? Render(s)
  return (
    <div className="px-4 py-2 mt-10 space-y-5 lg:mt-0 lg:h-fit lg:py-4">
      {/* total cart price */}
      <div className="pb-2 border-b border-gray-200 flex justify-between">
        <span className="text-sm">Giá ({formatNumber(totalItems)} sản phẩm)</span>
        <div className="flex-center">
          <span className="">{formatNumber(totalPrice)}</span>
          <span className="ml-1">VNĐ</span>
        </div>
      </div>

      {/* total cart items */}
      <div className="flex justify-between">
        <span>Tổng tiền</span>
        <div className="flex-center">
          <span className="text-sm">{formatNumber(totalPrice - totalDiscount)}</span>
          <span className="ml-1">VNĐ</span>
        </div>
      </div>

      <span className="inline-block w-full pb-2 border-b border-gray-200 lg:max-w-xs">
        Phí vận chuyển được tính toán dựa trên địa chỉ, thời gian giao hàng, trọng lượng và khối
        lượng hàng hóa của bạn
      </span>

      {/* total cart profit */}
      <div className="flex justify-between">
        <span className="text-red-500">Số tiền bạn đã tiết kiệm được từ việc mua hàng</span>
        <div className="flex-center gap-x-1">
          <span className="text-red-500 text-sm">
            ({((totalDiscount / totalPrice) * 100).toFixed(1)}%)
          </span>
          <span className="text-red-500">{formatNumber(totalDiscount)}</span>
          <span className="ml-1 text-red-500">VNĐ</span>
        </div>
      </div>

      {cart && (
        <Button onClick={handleRoute} className="hidden w-full lg:block">
          Tiếp tục
        </Button>
      )}
    </div>
  )
}

export default CartInfo
