import { EmptySearch } from 'components'
import Image from 'next/image'

export default function EmptySearchList() {
  return (
    <div className="py-20">
      <EmptySearch className="mx-auto h-60 w-60" />
      <div className="max-w-md p-2 mx-auto space-y-2 border rounded-md">
        <div className="flex items-center gap-x-2">
          <Image src="/icons/exclamation.svg" alt="exclamation" width={32} height={32} />
          <h5>Không tìm thấy kết quả</h5>
        </div>
        <p className="text-gray-500">
          Sử dụng nhiều từ phù hợp hơn hoặc kiểm tra các thuộc tính tìm kiếm{' '}
        </p>
      </div>
    </div>
  )
}
