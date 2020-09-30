// @flow
import apisauce from 'apisauce'

const create = (baseURL: string = 'http://10.0.0.15:3000') => {
  const api = apisauce.create({
    baseURL,
    timeout: 60000
  })

  const getToDos = () => api.get('/todos')

  const getFilteredToDos = (filter: string) => api.get(`/todos/${filter}`)

  const toggleToDo = (item: any) =>
    api.put(`/todos/${item.id}`, {
      ...item,
      isDone: !item.isDone
    })

  return {
    getToDos,
    getFilteredToDos,
    toggleToDo
  }
}

export type Api = {
  getToDos: () => Promise<*>,
  getFilteredToDos: (filter: string) => Promise<*>,
  toggleToDo: (item: any) => Promise<*>
}

export default {
  create
}
