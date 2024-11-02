import { apiHandler, setJson } from '@/helpers/api'

const getToken = apiHandler(
  async req => {
    const result = {credentials: null}
    return setJson({
      data: { ...result.credentials },
    })
  },
  {
    isJwt: true,
    identity: 'admin',
  }
)

export const GET = getToken
export const dynamic = 'force-dynamic'
