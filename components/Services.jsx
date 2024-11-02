import { useParams } from "next/navigation";
import { CashOnDelivery, Daysreturn, ExpressDelivery, OriginalProducts, Support } from '@/components'

export default function Services() {
  const { lang } = useParams();
  const services = [
    {
      name: 'Chuyển phát nhanh',
      nameEn: 'Express delivery',
      icon: <ExpressDelivery className="w-10 h-10" />,
    },
    { name: '24/7', nameEn: '24/7', icon: <Support className="w-10 h-10" /> },
    {
      name: 'Thanh toán khi nhận hàng',
      nameEn: 'Cash on delivery',
      icon: <CashOnDelivery className="w-10 h-10" />,
    },
    {
      name: 'Đảm bảo đổi trả trong 7 ngày',
      nameEn: 'Ensure return in 7 days',
      icon: <Daysreturn className="w-10 h-10" />,
    },
    {
      name: 'Đảm bảo tính nguyên vẹn của sản phẩm',
      nameEn: 'Ensure the intact of the product',
      icon: <OriginalProducts className="w-10 h-10" />,
    },
  ]

  //? Render(s)
  return (
    <section className="hidden py-5 border-t border-b-2 border-gray-200 lg:flex justify-evenly">
      {services.map((item, i) => (
        <div key={i} className="flex items-center gap-x-1">
          {item.icon}
          <span className="text-xs">{lang === 'vi' ? item.name : item.nameEn}</span>
        </div>
      ))}
    </section>
  )
}
