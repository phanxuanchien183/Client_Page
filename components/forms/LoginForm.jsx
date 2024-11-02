'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoginBtn, TextField } from '@/components'
import { useTranslate } from '@/hooks'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { logInSchema } from 'utils'

const LoginForm = props => {
  const trans = useTranslate()
  //? Props
  const { isLoading, onSubmit } = props

  //? Form Hook
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setFocus,
  } = useForm({
    resolver: yupResolver(logInSchema),
    defaultValues: { user_name: '', password: '' },
  })

  //? Focus On Mount
  useEffect(() => {
    setFocus('user_name')
  }, [])

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <TextField
        errors={formErrors.user_name}
        placeholder={trans.auth.please_enter_user_name}
        name="user_name"
        control={control}
      />

      <TextField
        errors={formErrors.password}
        type="password"
        placeholder={trans.auth.please_enter_password}
        name="password"
        control={control}
      />
      <LoginBtn isLoading={isLoading}>{trans.auth.login}</LoginBtn>
    </form>
  )
}

export default LoginForm
