export type ToDoType = {
  id: number,
  title: string,
  description: string,
  isDone: boolean,
  reminder: string,
  priority: string
}

export type ToDoForm = {
  title?: string,
  reminder?: string,
  priority?: string
} | null
