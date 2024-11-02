import { Loading } from 'components'

export const Button = props => {
  //? Props
  const {
    type = 'button',
    isLoading = false,
    children,
    className = '',
    isRounded = false,
    ...restProps
  } = props

  //? Render
  return (
    <button
      type={type}
      disabled={isLoading}
      className={`button ${isRounded ? 'rounded-3xl' : ''} ${className}
      `}
      {...restProps}
    >
      {isLoading ? <Loading /> : children}
    </button>
  )
}

export const LoginBtn = ({ children, ...restProps }) => (
  <Button type="submit" className="mx-auto rounded-3xl w-44" {...restProps}>
    {children}
  </Button>
)

export const SubmitModalBtn = ({ children, ...restPropps }) => (
  <Button
    type="submit"
    className="w-full max-w-xl mx-auto rounded-md btn lg:w-64 lg:ml-0"
    {...restPropps}
  >
    {children}
  </Button>
)
