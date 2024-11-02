'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

import { HandleResponse, LoginForm, ResponsiveImage } from '@/components'

import { useLoginMutation } from '@/store/services'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { userLogin, showAlert } from '@/store'
import { useTitle } from '@/hooks'

export default function LoginPage() {
  useTitle('Đăng nhập quản trị viên')
  //? Assets
  const dispatch = useDispatch()
  const { push } = useRouter()

  //? Login User
  const [login, { data, isSuccess, isError, isLoading, error }] = useLoginMutation()

  //? Handlers
  const submitHander = async ({ user_name, password }) => {
    if (user_name && password) {
      await login({
        body: { user_name, password },
      })
    }
  }

  //? Handle Login User Response
  useEffect(() => {
    if (isSuccess) {
      const { user } = data?.data;
      const roles = user?.roles.map(x => x.slug) || [];
      if (roles.includes('admin')) {
        dispatch(userLogin(data?.data.token))

        dispatch(
          showAlert({
            status: 'success',
            title: data.message,
          })
        )
        push('/admin')
      } else {
        dispatch(
          showAlert({
            status: 'error',
            title: 'Bạn không có quyền truy cập bảng điều khiển',
          })
        )
      }
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError && error)
      dispatch(
        showAlert({
          status: 'error',
          title: error?.data?.message,
        })
      )
  }, [isError])

  return (
    <>
      <main className="grid items-center min-h-screen">
        <section className="container max-w-md px-12 py-6 space-y-6 lg:border lg:border-gray-100 lg:rounded-lg lg:shadow">
          <Link passHref href="/">
            {/* <Logo className="mx-auto w-48 h-24" /> */}
            <ResponsiveImage
                dimensions="mx-auto w-48 h-24"
                className="overflow-hidden"
                src="/logo-htshalom.png"
                alt={`HT Shalom`}
              />
          </Link>
          <h1>
            <font className="">
              <font>Đăng nhập</font>
            </font>
          </h1>
          <LoginForm isLoading={isLoading} onSubmit={submitHander} />
        </section>

        {/* <div className="fixed max-w-xs px-2 py-3 bg-white border rounded-lg shadow-lg top-5 right-5">
          <h5 className="mb-2 text-amber-600">
            Bạn có thể sử dụng tài khoản và mật khẩu bên dưới để xem bảng công cụ quản lý.
          </h5>
          <div className="text-left">
            <span className="text-sm text-zinc-500">Tên tài khoản: admin</span>
            <br />
            <span className="text-sm text-zinc-500">Password: 123456</span>
          </div>
        </div> */}
        <div className="fixed max-w-xs px-2 py-3 bg-white border rounded-lg shadow-lg top-5 right-5">
          <h5 className="mb-2 text-amber-600">
            Sử dụng tài khoản và mật khẩu quản trị để xem bảng công cụ quản lý.
          </h5>
        </div>
      </main>
    </>
  )
}
