import { Button, Modal } from 'components'

export default function ConfirmDeleteModal(props) {
  //? Props
  const { title, isLoading, isShow, onClose, onCancel, onConfirm } = props

  //? Render(s)
  return (
    <>
      <Modal isShow={isShow} onClose={onClose} effect="ease-out">
        <Modal.Content onClose={onClose}>
          <Modal.Body>
            <div className="px-3 py-6 space-y-4 text-center bg-white md:rounded-lg">
              <p>
                Xác nhận xóa <span className="font-bold text-red-500">{title}</span>?
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
    </>
  )
}
