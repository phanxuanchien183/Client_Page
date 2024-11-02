import { Icons } from 'components'

import { useRouter } from 'next/navigation'

const IconButton = props => {
  //? Props
  const { title, icon, children, ...restPorps } = props

  //? Render(s)
  return (
    <button type="button" title={title} className="mx-3 my-2" {...restPorps}>
      {icon}
      {children}
    </button>
  )
}

export const BackIconBtn = props => {
  //? Assets
  const { back } = useRouter()

  //? Render(s)
  return (
    <IconButton
      title="Quay lại"
      icon={
        <Icons.ArrowLeft className="text-gray-500 rounded-2xl w-8 h-8 p-1 lg:w-9 lg:h-9 lg:p-1.5 active:scale-95 bg-gray-50" />
      }
      onClick={() => back()}
      {...props}
    />
  )
}

export const EditIconBtn = props => (
  <IconButton
    title="Chỉnh sửa"
    icon={
      <Icons.Edit className="rounded-2xl w-8 h-8 p-1 lg:w-9 lg:h-9 lg:p-1.5 active:scale-95 text-amber-500 bg-amber-100" />
    }
    {...props}
  />
)

export const DeleteIconBtn = props => (
  <IconButton
    title="Xóa"
    icon={
      <Icons.Delete className="text-red-500 bg-red-100 rounded-2xl w-8 h-8 p-1 lg:w-9 lg:h-9 lg:p-1.5 active:scale-95" />
    }
    {...props}
  />
)

export const AddIconBtn = props => (
  <IconButton
    title="Thêm mới"
    icon={
      <Icons.Plus className="text-green-500 bg-green-100 rounded-2xl w-8 h-8 p-1 lg:w-9 lg:h-9 lg:p-1.5 active:scale-95" />
    }
    {...props}
  />
)

export const AddToListIconBtn = props => (
  <AddIconBtn className="border-2 border-green-100 rounded-full flex-center gap-x-4" {...props}>
    <span className="pl-2 text-base text-green-500">Thêm vào danh sách</span>
  </AddIconBtn>
)

export const DeleteFromListIconBtn = props => (
  <DeleteIconBtn className="border-2 border-red-100 rounded-full flex-center gap-x-4" {...props}>
    <span className="pl-2 text-base text-red-500">Xóa khỏi danh sách</span>
  </DeleteIconBtn>
)
