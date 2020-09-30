// @flow
import apisauce from 'apisauce'

const create = (baseURL: string = 'http://10.0.0.15:3000') => {
  const api = apisauce.create({
    baseURL,
    timeout: 60000
  })

  const getToDos = () => api.get('/todos')

  const getFilteredToDos = (filter: string) => api.get(`/todos/${filter}`)

  return {
    getToDos,
    getFilteredToDos
  }
}

export type Api = {
  getToDos: () => Promise<*>,
  getFilteredToDos: (filter: string) => Promise<*>
}

export default {
  create
}
