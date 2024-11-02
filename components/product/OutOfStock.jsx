export default function OutOfStock() {
  return (
    <section className="lg:py-2 lg:bg-gray-100 mx-3 p-1.5 rounded bg-gray-50/50 my-5 lg:my-0 lg:rounded-lg">
      <div className="flex items-center justify-between gap-x-2">
        <div className="h-[3px] bg-gray-300 flex-1" />
        <h4 className="text-base font-bold text-gray-500">Không đủ hàng trong kho</h4>
        <div className="h-[3px] bg-gray-300 flex-1" />
      </div>
      <p className="px-3 text-sm text-gray-700">
        Sản phẩm này hiện không có sẵn và hàng tồn kho không đủ.
      </p>
    </section>
  )
}
