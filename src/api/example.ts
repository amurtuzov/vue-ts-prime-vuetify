import axios from 'axios'

const citiesApiCall = async (
  abortController?: AbortController,
  params?: any,
): Promise<any> => {
  const { data } = await axios.post(
    '/example/',
    { ...params },
    { signal: abortController?.signal },
  )
  return data
}

export { citiesApiCall }
