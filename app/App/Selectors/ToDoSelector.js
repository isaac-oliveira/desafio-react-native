import { createSelector } from '@reduxjs/toolkit'
import { orderBy } from 'lodash'

import type { GlobalState } from '../Redux'

export const state = ({ toDo, search }: GlobalState) => ({ toDo, search })

export const getToDos = createSelector(state, ({ toDo, search }) => {
  const sorted = orderBy(toDo.data, ['isDone', 'title'], ['asc'])

  if (search.query) {
    const searchableToDo = sorted.filter(item => {
      return item.title.toLowerCase().includes(search.query.toLowerCase())
    })

    return searchableToDo
  }

  return sorted
})

export default {
  getToDos
}
