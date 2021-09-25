import axios from 'axios'
import { useQuery } from 'vue-query'

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
})

export const search = (search: string) => {
  return useQuery(
    search,
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      return api.get(`pokemon/${search}`).then((res) => res.data)
    },
    {
      refetchOnWindowFocus: false,
      // staleTime: Infinity,
      // vue-query only use cached value when toggle inactive - active component
      cacheTime: Infinity,
    }
  )
}

export default api
