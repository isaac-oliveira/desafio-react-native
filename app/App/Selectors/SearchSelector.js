import type { GlobalState } from '../Redux'

const query = (state: GlobalState) => state.search.query

export default {
  query
}
