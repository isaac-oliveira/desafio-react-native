// @flow
import apisauce from 'apisauce'

const create = (baseURL: string = 'http://10.0.0.15:3000') => {
  const api = apisauce.create({
    baseURL,
    timeout: 60000
  })

  const getToDo = (id: number) => api.get(`/todos/${id}`)

  const getToDos = () => api.get('/todos')

  const getFilteredToDos = (filter: string) => api.get(`/todos/${filter}`)

  const deleteToDo = (id: number) => api.delete(`/todos/${id}`)

  const putToDo = (item: any) => api.put(`/todos/${item.id}`, item)

  const postToDo = (item: any) => api.post('/todos', item)

  const toggleToDo = (item: any) =>
    api.put(`/todos/${item.id}`, {
      ...item,
      isDone: !item.isDone
    })

  return {
    getToDo,
    getToDos,
    getFilteredToDos,
    deleteToDo,
    putToDo,
    postToDo,
    toggleToDo
  }
}

export type Api = {
  getToDo: () => Promise<*>,
  getToDos: () => Promise<*>,
  getFilteredToDos: (filter: string) => Promise<*>,
  deleteToDo: (id: number) => Promise<*>,
  putToDo: (item: any) => Promise<*>,
  postToDo: (item: any) => Promise<*>,
  toggleToDo: (item: any) => Promise<*>
}

export default {
  create
}
