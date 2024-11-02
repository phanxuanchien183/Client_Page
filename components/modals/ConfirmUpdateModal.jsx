import { Button, Modal } from 'components'

const ConfirmUpdateModal = props => {
  //? Props
  const { title, isLoading, isShow, onClose, onConfirm, onCancel } = props

  //? Render(s)
  return (
    <Modal isShow={isShow} onClose={onClose} effect="ease-out">
      <Modal.Content onClose={onClose}>
        <Modal.Body>
          <div className="px-3 py-6 space-y-4 text-center bg-white md:rounded-lg">
            <p>
              Bạn có đồng ý cập nhật những thay đổi
              <span className="font-bold text-green-500">{title}</span>
            </p>
            <div className="flex justify-center gap-x-20">
              <Button onClick={onConfirm} isLoading={isLoading}>
                Chắc chắn
              </Button>
              <Button className="!bg-green-500" onClick={onCancel}>
                Hủy bỏ
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}

export default ConfirmUpdateModal
