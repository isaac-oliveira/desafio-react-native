import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import DefaultBackground from '../Components/DefaultBackground'
import FilterRadio from '../Components/FilterRadio'
import ToDoItem from '../Components/ToDoItem'
import List from '../Components/List'
import EmptyList from '../Components/EmptyList'
import BottomSheet from '../Components/BottomSheet'
import EmptySearchList from '../Components/EmptySearchList'
import Header from '../Components/Header'
import ErrorList from '../Components/ErrorList'

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
  const bottomSheetRef = useRef(null)
  const [filter, setFilter] = useState('all')
  const [searchMode, setSearchMode] = useState(false)
  const [query, setQuery] = useState(null)
  const toDos = useSelector(ToDoSelector.sortedToDos)
  const ui = useSelector(state => state.ui)

  const dispatch = useDispatch()

  const fetchToDos = useCallback(() => {
    dispatch(UiActions.request({ filter, query }))
  }, [dispatch, filter, query])

  useEffect(() => {
    fetchToDos()
  }, [fetchToDos])

  function searchModeShow () {
    setSearchMode(true)
  }

  function searchModeHide () {
    setSearchMode(false)
    setQuery(null)
  }

  function showAddSheet () {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.show({ filter, query }, null)
    }
  }

  function onChangeQuery (value) {
    setQuery(value)
  }

  const ListErrorComponent = () => <ErrorList onTryAgain={fetchToDos} />

  const renderItem = ({ item }) => {
    function showEditSheet () {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.show({ filter, query }, item)
      }
    }

    return <ToDoItem query={query} item={item} onItemPress={showEditSheet} />
  }

  return (
    <BottomSheet ref={bottomSheetRef}>
      <DefaultBackground>
        <View
          style={[
            styles.headerContainer,
            {
              flex: searchMode ? 0 : 0.3,
              padding: searchMode ? 0 : 30,
              paddingVertical: searchMode ? 10 : 30
            }
          ]}
        >
          <Header
            searchMode={searchMode}
            searchModeShow={searchModeShow}
            searchModeHide={searchModeHide}
            onChangeQuery={onChangeQuery}
          />
        </View>
        <Animated.View
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
            keyExtractor={item => String(item.id)}
            ListEmptyComponent={searchMode ? EmptySearchList : EmptyList}
            ListErrorComponent={ListErrorComponent}
            renderItem={renderItem}
          />
          <TouchableOpacity style={styles.btnAdd} onPress={showAddSheet}>
            <Image source={Images.add['36px']} />
          </TouchableOpacity>
        </Animated.View>
      </DefaultBackground>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 30
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
