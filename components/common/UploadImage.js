'use client'
import { useState } from 'react'

const UploadImage = props => {
  //? Props
  const { folder, handleAddUploadedImageUrl } = props

  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const handleFileChange = event => {
    setFile(event.target.files?.[0] || null)
  }

  const handleUpload = async event => {
    setLoading(true)

    if (!file) {
      setError('Vui lòng chọn một tệp')
      setLoading(false)
      return
    }

    if (!file.type.startsWith('image/')) {
      setError('Tệp đã chọn phải là một hình ảnh')
      setLoading(false)
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Kích thước của hình ảnh không được vượt quá 5MB')
      setLoading(false)
      return
    }
  }

  return (
    <>
      <div className="flex-1 space-y-3 my-4">
        <label htmlFor="file" className="text-field__label">
          Trình gắn hình ảnh
        </label>
        <div className="flex items-center gap-x-3">
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="border border-gray-300 px-3 py-2 w-full"
          />
          <button
            type="button"
            disabled={loading || !file}
            onClick={handleUpload}
            className="text-green-600 bg-green-50 w-36 hover:text-green-700 hover:bg-green-100 py-2 rounded"
          >
            {loading ? 'Đang tải lên...' : 'Tải lên'}
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 my-1">{error}</p>}
      {message && <p className="text-green-500 my-1">{message}</p>}
    </>
  )
}

export default UploadImage
