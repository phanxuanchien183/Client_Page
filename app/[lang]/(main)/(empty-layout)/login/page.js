'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

import { HandleResponse, LoginForm, ResponsiveImage } from '@/components'

import { useTranslate } from '@/hooks'

import { useLoginMutation } from '@/store/services'
import { useDispatch } from 'react-redux'
import { userLogin } from '@/store'

export default function LoginPage() {
  const trans = useTranslate()
  //? Assets
  const dispatch = useDispatch()
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo')

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
  return (
    <>
      {/*  Handle Login Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error?.data?.message}
          message={data?.message}
          onSuccess={() => {
            dispatch(userLogin(data.data.token))
            replace(redirectTo || '/')
          }}
        />
      )}
      <main className="grid items-center min-h-screen bg-shalom-orange-100">
        <section className="container bg-white max-w-md px-12 py-6 space-y-6 lg:border lg:border-gray-100 lg:rounded-lg lg:shadow">
          <Link passHref href="/">
            <ResponsiveImage
                dimensions="mx-auto w-48 h-24"
                className="overflow-hidden"
                src="/logo-htshalom.png"
                alt={`HT Shalom`}
              />
          </Link>
          <h1>
            <font className="">
              <font>{trans.auth.login}</font>
            </font>
          </h1>
          <LoginForm isLoading={isLoading} onSubmit={submitHander} />
          <div className="text-xs">
            <p className="inline mr-2 text-gray-800 text-xs">{trans.auth.dont_have_an_account}</p>
            <Link href="/register" className="text-blue-400 text-xs">
              {trans.auth.register}
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
