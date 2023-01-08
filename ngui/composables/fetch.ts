import type { UseFetchOptions } from '#app'
import { nanoid } from 'nanoid'
import { useToast } from 'vuestic-ui'

const api = useCookie('api')
const { init } = useToast()
const token = useCookie('token')

const toFetch =
  async<T>(url: string, options?: UseFetchOptions<T>) => {
    const { data, error } = await useFetch(url, {
      baseURL: api.value || 'http://127.0.0.1:2017/api/',
      headers: {
        'Authorization': token.value!,
        'X-V2raya-Request-Id': nanoid(),
      },
      ...options
    })

    return { data, error}
  }

export { toFetch }
