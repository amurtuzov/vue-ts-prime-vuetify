import axios from 'axios'

axios.interceptors.response.use(undefined, async (error) => {
  if (!axios.isCancel(error) && [401].includes(error?.response?.status)) {
    window.location.reload()
  }
  return Promise.reject(error)
})
