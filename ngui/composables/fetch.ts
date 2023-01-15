import { nanoid } from 'nanoid'
import { ElMessage } from 'element-plus'
import type { UseFetchOptions } from '#app'

const api = useCookie('api')
const token = useCookie('token')

const toFetch
  = async<T>(url: string, options?: UseFetchOptions<T>) => {
    const { data, error } = await useFetch(url, {
      baseURL: api.value || 'http://127.0.0.1:2017/api/',
      headers: {
        'Authorization': token.value!,
        'X-V2raya-Request-Id': nanoid()
      },
      ...options
    })

    if (error.value)
      ElMessage.error({ message: error.value?.message })

    return { data, error }
  }

export { toFetch }
