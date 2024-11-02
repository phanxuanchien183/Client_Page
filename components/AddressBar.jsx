import { Icons, Skeleton, WithAddressModal } from '@/components'

import { useTranslate } from '@/hooks'

const BasicAddressBar = ({ addressModalProps }) => {
  const trans = useTranslate()
  //? Props
  const { address, isLoading, isVerify, openAddressModal, isAddress } = addressModalProps || {}

  //? Render(s)
  if (!isVerify) {
    return null
  } else if (isLoading) {
    return <Skeleton.Item animated="background" height="h-5 lg:h-6" width="w-3/4 lg:w-1/4" />
  } else if (!isAddress) {
    return (
      <button
        type="button"
        onClick={openAddressModal}
        className="flex items-center w-full gap-x-1 lg:w-fit"
      >
        <Icons.Location2 className="icon" />
        <span>{trans.shipping.please_choose_your_city}</span>

        <Icons.ArrowRight2 className="mr-auto icon" />
      </button>
    )
  } else if (isAddress && address) {
    return (
      <button
        type="button"
        onClick={openAddressModal}
        className="flex items-center w-full gap-x-1 lg:w-fit"
      >
        <Icons.Location2 className="icon" />
        <span>
          {trans.shipping.send_to} {address?.province?.name}{address?.city ? `, ${address?.city.name}`: ''}{address?.area ? `, ${address?.area.name}` : ''}
        </span>
        <Icons.ArrowRight2 className="mr-auto icon" />
      </button>
    )
  }
}

export default function AddressBar() {
  return (
    <WithAddressModal>
      <BasicAddressBar />
    </WithAddressModal>
  )
}
