'use client'

import { useAppDispatch } from '@/hooks'

import { setTempColor, setTempSize, addToLastSeen } from '@/store'
import { useEffect } from 'react'

const InitialStore = props => {
  const { product } = props

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (product) {
      const { colors, sizes } = product

      if (colors?.length > 0) {
        dispatch(setTempColor(colors[0]))
        dispatch(setTempSize(null))
      } else if (sizes?.length > 0) {
        dispatch(setTempSize(sizes[0]))
        dispatch(setTempColor(null))
      } else {
        dispatch(setTempColor(null))
        dispatch(setTempSize(null))
      }
    }
  }, [product])
  useEffect(() => {
    dispatch(
      addToLastSeen({
        productID: product.id,
        image: product.images[0],
        title: product.title,
      })
    )
  }, [product.id])
  return null
}

export default InitialStore
