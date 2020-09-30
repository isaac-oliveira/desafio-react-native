import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import DefaultBackground from '../Components/DefaultBackground'
import FilterRadio from '../Components/FilterRadio'
import ToDoItem from '../Components/ToDoItem'
import List from '../Components/List'
import EmptyList from '../Components/EmptyList'
import ErrorList from '../Components/ErrorList'
import Search from '../Components/Search'

import { actions as UiActions } from '../Redux/Ui'
import ToDoSelector from '../Selectors/ToDoSelector'
import { Colors, Images } from '../Themes'

const filters = [
  { title: 'Todos', value: 'all' },
  { title: 'Hoje', value: 'today' },
  { title: 'Esta Semana', value: 'week' },
  { title: 'Atrasadas', value: 'month' }
]

const HomeScreen = () => {
  const [filter, setFilter] = useState('all')
  const [searchMode, setSearchMode] = useState(false)
  const toDos = useSelector(ToDoSelector.sortedToDos)
  const ui = useSelector(state => state.ui)

  const dispatch = useDispatch()

  const fetchToDos = useCallback(() => {
    dispatch(UiActions.request(filter))
  }, [dispatch, filter])

  useEffect(() => {
    fetchToDos()
  }, [fetchToDos])

  function searchModeShow () {
    setSearchMode(true)
  }

  function searchModeHide () {
    setSearchMode(false)
  }

  const ListErrorComponent = () => <ErrorList onTryAgain={fetchToDos} />

  const renderItem = ({ item }) => {
    return <ToDoItem item={item} />
  }

  return (
    <DefaultBackground>
      <View
        style={[
          styles.header,
          {
            flex: searchMode ? 0 : 0.3,
            padding: searchMode ? 0 : 30,
            paddingVertical: searchMode ? 10 : 30
          }
        ]}
      >
        {searchMode ? (
          <Search onBack={searchModeHide} />
        ) : (
          <>
            <View>
              <Text style={styles.headerTitle}>Hoje</Text>
              <Text style={styles.headerSubtitle}>29 de set</Text>
            </View>
            <TouchableOpacity style={styles.btnSearch} onPress={searchModeShow}>
              <Image source={Images.search['24px']} />
            </TouchableOpacity>
          </>
        )}
      </View>
      <View
        style={[
          styles.content,
          {
            flex: searchMode ? 1 : 0.75,
            borderTopLeftRadius: searchMode ? 0 : 40
          }
        ]}
      >
        <View
          style={[
            styles.filterContainer,
            {
              elevation: searchMode ? 5 : 0
            }
          ]}
        >
          <FilterRadio filters={filters} value={filter} onChange={setFilter} />
        </View>
        <List
          loading={ui.fetching}
          error={ui.error}
          data={toDos}
          keyExtractor={item => `${item.id}`}
          ListEmptyComponent={EmptyList}
          ListErrorComponent={ListErrorComponent}
          renderItem={renderItem}
        />
        <TouchableOpacity style={styles.btnAdd}>
          <Image source={Images.add['36px']} />
        </TouchableOpacity>
      </View>
    </DefaultBackground>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 30
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.a420
  },
  headerSubtitle: {
    fontSize: 18,
    color: Colors.c500
  },
  btnSearch: {
    padding: 15,
    backgroundColor: Colors.a420,
    borderRadius: 50
  },
  content: {
    flex: 0.7,
    backgroundColor: Colors.a420,
    overflow: 'hidden',
    borderTopLeftRadius: 40
  },
  filterContainer: {
    padding: 10,
    backgroundColor: Colors.a420
  },
  btnAdd: {
    padding: 15,
    backgroundColor: Colors.a220,
    borderRadius: 25,
    position: 'absolute',
    bottom: 26,
    right: 26
  }
})

export default HomeScreen
