'use client'

import Image from 'next/image'

import { Button, ControlledCheckbox, TextField, UploadImage } from '@/components'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { bannerSchema } from '@/utils'
import { useTranslate } from '@/hooks'

import { useEffect } from 'react'

const BannerForm = props => {
  const trans = useTranslate()
  //? Props
  const {
    mode,
    createHandler,
    updateHandler,
    deleteHandler,
    isLoadingCreate,
    isLoadingDelete,
    isLoadingUpdate,
    selectedBanner,
  } = props

  //? Assets
  const defaultValues = {
    image: { url: '' },
    title: '',
    uri: '',
    isPublic: true,
    type: 'one',
  }

  //? Hook Form
  const {
    control,
    getValues,
    reset,
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors: formErrors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(bannerSchema),
  })

  //? Handlers
  const handleAddUploadedImageUrl = url => setValue('image.url', url)

  //? Re-Renders
  useEffect(() => {
    if (selectedBanner && mode === 'edit') {
      const { image, title, uri, isPublic, type } = selectedBanner

      reset({ image, title, uri, isPublic, type })
    }
  }, [selectedBanner])

  return (
    <section className="p-3 mx-auto mb-10 space-y-8">
      <div className="mx-3 overflow-x-auto mt-7 lg:mx-5 xl:mx-10">
        <form
          onSubmit={mode === 'create' ? handleSubmit(createHandler) : handleSubmit(updateHandler)}
          className="space-y-3"
        >
          <TextField
            label={trans.banner.title}
            control={control}
            name="title"
            errors={formErrors?.title}
          />

          <TextField
            label={trans.banner.link}
            control={control}
            name="uri"
            errors={formErrors?.uri}
          />

          <div className="w-44 my-3">
            <ControlledCheckbox name="published" control={control} label={trans.common.publish} />
          </div>

          <div className="flex items-center gap-8 mb-5">
            <label className="inline-flex items-center gap-x-2">
              <input
                className="w-5 h-5 text-red-600"
                type="radio"
                value="one"
                {...register('type')}
              />
              <span className="ml-2 text-gray-700">{trans.banner.type_1}</span>
            </label>

            <label className="inline-flex items-center gap-x-2">
              <input
                className="w-5 h-5 text-red-600"
                type="radio"
                value="two"
                {...register('type')}
              />
              <span className="ml-2 text-gray-700">{trans.banner.type_2}</span>
            </label>
          </div>

          <TextField
            label={trans.common.image}
            control={control}
            name="image.url"
            errors={formErrors?.image?.url}
          />

          <UploadImage folder="/banners" handleAddUploadedImageUrl={handleAddUploadedImageUrl} />

          {bannerSchema.isValidSync(watch()) && (
            <div className="mx-auto max-w-max">
              {getValues('image.url') && (
                <Image
                  src={getValues('image.url')}
                  width={getValues('type') === 'one' ? 400 : 300}
                  height={200}
                  alt="banner image"
                />
              )}
            </div>
          )}

          <div className="flex justify-evenly gap-x-4 pt-10">
            {mode === 'edit' ? (
              <>
                <Button
                  className="bg-amber-500 "
                  isRounded={true}
                  type="submit"
                  isLoading={isLoadingUpdate}
                >
                  {trans.common.refresh}
                </Button>

                <Button isRounded={true} isLoading={isLoadingDelete} onClick={deleteHandler}>
                  {trans.common.delete}
                </Button>
              </>
            ) : (
              <Button
                className="bg-green-500 "
                isRounded={true}
                type="submit"
                isLoading={isLoadingCreate}
              >
                {trans.common.submit}
              </Button>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}

export default BannerForm
