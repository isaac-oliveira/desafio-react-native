// @flow
import apisauce from 'apisauce'

import type { ToDoType } from '../Entities/ToDo'

const create = (baseURL: string = 'http://10.0.0.15:3000') => {
  const api = apisauce.create({
    baseURL,
    timeout: 60000
  })

  const getToDo = (id: number) => api.get(`/todos/${id}`)

  const getToDos = () => api.get('/todos')

  const getFilteredToDos = (filter: string) => api.get(`/todos/${filter}`)

  const deleteToDo = (id: number) => api.delete(`/todos/${id}`)

  const putToDo = (item: ToDoType) => api.put(`/todos/${item.id}`, item)

  const postToDo = (item: ToDoType) => api.post('/todos', item)

  const toggleToDo = (item: ToDoType) =>
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
  putToDo: (item: ToDoType) => Promise<*>,
  postToDo: (item: ToDoType) => Promise<*>,
  toggleToDo: (item: ToDoType) => Promise<*>
}

export default {
  create
}
