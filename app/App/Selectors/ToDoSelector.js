import { createSelector } from '@reduxjs/toolkit'
import { orderBy } from 'lodash'

export const toDos = state => state.toDo

export const sortedToDos = createSelector(toDos, toDos => {
  const sorted = orderBy(toDos.data, ['isDone'], ['asc'])

  return sorted
})

export default {
  toDos,
  sortedToDos
}
