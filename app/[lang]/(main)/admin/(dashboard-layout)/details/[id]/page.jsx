'use client'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { showAlert } from 'store'

import {
  useCreateDetailsMutation,
  useDeleteDetailsMutation,
  useGetDetailsQuery,
  useUpdateDetailsMutation,
} from '@/store/services'

import {
  BigLoading,
  Button,
  ConfirmDeleteModal,
  ConfirmUpdateModal,
  DetailsList,
  HandleResponse,
  PageContainer,
} from '@/components'
import { Tab } from '@headlessui/react'

import { useAppDispatch, useDisclosure, useTitle, useUrlQuery, useTranslate } from 'hooks'

import { SubmitHandler, useForm } from 'react-hook-form'

const tabListNames = [
  { id: 0, name: 'Chọn loại' },
  { id: 1, name: 'Thuộc tính' },
  { id: 2, name: 'Thông tin' },
]

const DetailsContentPage = ({ params: { id } }) => {
  const trans = useTranslate()
  //? Assets
  const { back } = useRouter()
  const query = useUrlQuery()
  const dispatch = useAppDispatch()

  const categoryId = id
  const categoryName = query.category_name

  const initialUpdataInfo = {}

  //? Modals
  const [isShowConfirmDeleteModal, confirmDeleteModalHandlers] = useDisclosure()
  const [isShowConfirmUpdateModal, confirmUpdateModalHandlers] = useDisclosure()

  //? States
  const [updateInfo, setUpdateInfo] = useState(initialUpdataInfo)

  const [mode, setMode] = useState('create')

  //? Queries
  //*   Get Details
  const { data: details, isLoading: isLoadingGet } = useGetDetailsQuery({
    id: categoryId,
  })

  //*   Update Details
  const [
    updateDetails,
    {
      data: dataUpdate,
      isSuccess: isSuccessUpdate,
      isError: isErrorUpdate,
      error: errorUpdate,
      isLoading: isLoadingUpdate,
    },
  ] = useUpdateDetailsMutation()

  //*   Create Details
  const [
    createDetails,
    {
      data: dataCreate,
      isSuccess: isSuccessCreate,
      isError: isErrorCreate,
      isLoading: isLoadingCreate,
      error: errorCreate,
    },
  ] = useCreateDetailsMutation()

  //*   Delete Details
  const [
    deleteDetails,
    {
      isSuccess: isSuccessDelete,
      isError: isErrorDelete,
      error: errorDelete,
      data: dataDelete,
      isLoading: isLoadingDelete,
    },
  ] = useDeleteDetailsMutation()

  //? Hook Form
  const { handleSubmit, register, reset, control } = useForm({
    defaultValues: {
      optionsType: 'none',
      info: [],
      specification: [],
    },
  })

  //? Re-Renders
  useEffect(() => {
    if (details?.data) {
      setMode('edit')
      reset({
        optionsType: details?.data?.optionsType,
        info: details?.data?.info,
        specification: details?.data?.specification,
      })
    }
  }, [details])

  //? Handlers
  //*   Create
  const createHandler = async ({ info, specification, optionsType }) => {
    if (info.length !== 0 && specification.length !== 0) {
      await createDetails({
        body: {
          category_id: categoryId,
          info,
          specification,
          optionsType,
        },
      })
    } else {
      dispatch(
        showAlert({
          status: 'error',
          title: trans.details.please_type_infor,
        })
      )
    }
  }

  //*   Update
  const updateHandler = ({ info, specification, optionsType }) => {
    setUpdateInfo(prev => ({
      ...prev,
      ...details?.data,
      info,
      specification,
      optionsType,
    }))

    confirmUpdateModalHandlers.open()
  }

  const onConfirmUpdate = () => {
    updateDetails({
      id: details?.data?.id,
      body: updateInfo,
    })
  }

  const onCancelUpdate = () => {
    setUpdateInfo(initialUpdataInfo)
    confirmUpdateModalHandlers.close()
  }

  const onSuccessUpdate = () => {
    setUpdateInfo(initialUpdataInfo)
    confirmUpdateModalHandlers.close()
  }

  const onErrorUpdate = () => {
    setUpdateInfo(initialUpdataInfo)
    confirmUpdateModalHandlers.close()
  }

  //*   Delete
  const deleteHandler = () => confirmDeleteModalHandlers.open()

  const onConfirmDelete = () => deleteDetails({ id: details?.data?.id })

  const onCancelDelete = () => confirmDeleteModalHandlers.close()

  const onSuccessDelete = () => {
    confirmDeleteModalHandlers.close()
    reset({
      optionsType: 'none',
      info: [],
      specification: [],
    })
    back()
  }

  const onErrorDelete = () => confirmDeleteModalHandlers.close()

  useTitle(`${trans.common.details_management} - ${categoryName ? categoryName : ''}`)

  //? Render(s)
  return (
    <>
      <ConfirmDeleteModal
        title={trans.details.delete}
        isLoading={isLoadingDelete}
        isShow={isShowConfirmDeleteModal}
        onClose={confirmDeleteModalHandlers.close}
        onCancel={onCancelDelete}
        onConfirm={onConfirmDelete}
      />

      {/* Handle Delete Response */}
      {(isSuccessDelete || isErrorDelete) && (
        <HandleResponse
          isError={isErrorDelete}
          isSuccess={isSuccessDelete}
          error={errorDelete?.data?.message}
          message={dataDelete?.message}
          onSuccess={onSuccessDelete}
          onError={onErrorDelete}
        />
      )}

      <ConfirmUpdateModal
        title={trans.details.update}
        isLoading={isLoadingUpdate}
        isShow={isShowConfirmUpdateModal}
        onClose={confirmUpdateModalHandlers.close}
        onCancel={onCancelUpdate}
        onConfirm={onConfirmUpdate}
      />

      {/* Handle Update Response */}
      {(isSuccessUpdate || isErrorUpdate) && (
        <HandleResponse
          isError={isErrorUpdate}
          isSuccess={isSuccessUpdate}
          error={errorUpdate?.data?.message}
          message={dataUpdate?.message}
          onSuccess={onSuccessUpdate}
          onError={onErrorUpdate}
        />
      )}

      {/* Handle Create Details Response  */}
      {(isSuccessCreate || isErrorCreate) && (
        <HandleResponse
          isError={isErrorCreate}
          isSuccess={isSuccessCreate}
          error={errorCreate?.data?.message}
          message={dataCreate?.message}
        />
      )}

      <main>
        {isLoadingGet ? (
          <div className="px-3 py-20">
            <BigLoading />
          </div>
        ) : (
          <PageContainer title={`${trans.common.details_management} - ${categoryName ? categoryName : ''}`}>
            <form
              onSubmit={
                mode === 'create' ? handleSubmit(createHandler) : handleSubmit(updateHandler)
              }
              className="p-3 space-y-6"
            >
              <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-slate-200 p-1">
                  {tabListNames.map(item => (
                    <Tab
                      key={item.id}
                      className={({ selected }) =>
                        `tab
                         ${
                           selected
                             ? 'bg-white shadow'
                             : 'text-blue-400 hover:bg-white/[0.12] hover:text-blue-600'
                         }
                        `
                      }
                    >
                      {item.name}
                    </Tab>
                  ))}
                </Tab.List>

                <Tab.Panels>
                  <Tab.Panel>
                    <div className="space-y-3">
                      <p className="mb-2">{trans.details.choose_type}:</p>
                      <div className="flex items-center gap-x-1">
                        <input
                          type="radio"
                          id="none"
                          value="none"
                          className="mr-1"
                          {...register('optionsType')}
                        />
                        <label htmlFor="none">{trans.common.default}</label>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <input
                          type="radio"
                          id="colors"
                          value="colors"
                          className="mr-1"
                          {...register('optionsType')}
                        />
                        <label htmlFor="colors">{trans.details.color}</label>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <input
                          type="radio"
                          id="sizes"
                          value="sizes"
                          className="mr-1"
                          {...register('optionsType')}
                        />
                        <label htmlFor="sizes">{trans.details.size}</label>
                      </div>
                    </div>
                  </Tab.Panel>

                  <Tab.Panel>
                    <DetailsList
                      name="info"
                      control={control}
                      register={register}
                      categoryName={categoryName}
                    />
                  </Tab.Panel>
                  <Tab.Panel>
                    <DetailsList
                      name="specification"
                      control={control}
                      register={register}
                      categoryName={categoryName}
                    />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
              <div className="flex justify-center gap-x-4">
                {mode === 'edit' ? (
                  <>
                    <Button
                      className="bg-amber-500 "
                      isRounded={true}
                      type="submit"
                      isLoading={isLoadingUpdate}
                    >
                      {trans.details.update}
                    </Button>

                    <Button
                      className="rounded-3xl"
                      isLoading={isLoadingDelete}
                      onClick={deleteHandler}
                    >
                      {trans.details.delete}
                    </Button>
                  </>
                ) : (
                  <Button
                    className="bg-green-500 "
                    isRounded={true}
                    type="submit"
                    isLoading={isLoadingCreate}
                  >
                    {trans.details.config}
                  </Button>
                )}
              </div>
            </form>
          </PageContainer>
        )}
      </main>
    </>
  )
}

export default DetailsContentPage
