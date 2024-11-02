'use client'
import { useRouter } from 'next/navigation'

import { HandleResponse, PageContainer, SliderForm } from 'components'

import { SubmitHandler } from 'react-hook-form'

import { useCreateSliderMutation } from '@/store/services'
import { useTitle, useUrlQuery, useTranslate } from '@/hooks'

const CreateSliderPage = () => {
  const trans = useTranslate()
  //? Assets
  const { back } = useRouter()
  const query = useUrlQuery()
  const categoryName = query?.category_name
  const categoryId = query?.category_id

  //? Queries
  //*     Create Slider
  const [createSlider, { data, isSuccess, isLoading, error, isError }] = useCreateSliderMutation()

  //? Handlers
  const createHandler = data => {
    const { image, isPublic, title, uri } = data
    createSlider({
      body: { category_id: categoryId, image, isPublic, title, uri },
    })
  }

  const onSuccess = () => back()

  useTitle(trans.slider.add + ' ' + categoryName)

  return (
    <>
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error?.data?.message}
          message={data?.message}
          onSuccess={onSuccess}
        />
      )}

      <main>
        <PageContainer title={trans.slider.new + ' ' + categoryName}>
          <SliderForm mode="create" isLoadingCreate={isLoading} createHandler={createHandler} />
        </PageContainer>
      </main>
    </>
  )
}

export default CreateSliderPage
