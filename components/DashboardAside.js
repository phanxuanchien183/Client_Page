import Link from 'next/link'

import { Icons, BoxLink, Logout, ResponsiveImage } from 'components'

export default function ProfileAside() {
  const profilePaths = [
    {
      name: 'Sản phẩm mới',
      Icon: Icons.Plus,
      path: '/admin/products/create',
    },
    {
      name: 'Quản lý sản phẩm',
      Icon: Icons.Save,
      path: '/admin/products',
    },
    {
      name: 'Quản lý đơn hàng',
      Icon: Icons.Bag,
      path: '/admin/orders',
    },
    {
      name: 'Quản lý danh mục',
      Icon: Icons.Category,
      path: '/admin/categories',
    },
    {
      name: 'Đặc điểm phân loại',
      Icon: Icons.Location,
      path: '/admin/details',
    },
    {
      name: 'Quản lý người dùng',
      Icon: Icons.Users,
      path: '/admin/users',
    },
    {
      name: 'Quản lý đánh giá',
      Icon: Icons.Comment,
      path: '/admin/reviews',
    },
    {
      name: 'Quản lý thanh trượt',
      Icon: Icons.Slider,
      path: '/admin/sliders',
    },
    {
      name: 'Quản lý Banner',
      Icon: Icons.Image,
      path: '/admin/banners',
    },
  ]

  //? Render(s)
  return (
    <aside className="sticky mt-6 lg:border lg:border-gray-200 lg:rounded-md lg:pt-4 min-w-max top-6">
      <Link passHref href="/admin">
        <ResponsiveImage
          dimensions="w-40 h-12 mx-auto"
          className="overflow-hidden"
          src="/logo-htshalom.png"
          alt={`HT Shalom`}
        />
      </Link>

      <div className="mt-4">
        {profilePaths.map((item, index) => (
          <BoxLink key={index} path={item.path} name={item.name}>
            <item.Icon className="icon text-black" />
          </BoxLink>
        ))}
        <Logout />
      </div>
    </aside>
  );
}
