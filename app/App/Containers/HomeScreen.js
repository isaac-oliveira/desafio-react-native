import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Animated, { Easing } from 'react-native-reanimated'

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
import useAnimation, { AnimationStyle } from '../Hooks/useAnimation'

const { height } = Dimensions.get('screen')

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

  const { animStyle: initialAnimStyle, finishedInitialAnim } = useAnimation({
    duration: 1000,
    autoPlay: true,
    animationStyle: initialAnimationStyle
  })

  const { animStyle: searchAnimStyle, animValue: searchAnimValue, startAnim, resetAnim } = useAnimation({
    duration: 500,
    autoPlay: false,
    animationStyle: searchAnimationStyle,
    easing: Easing.linear
  })

  const dispatch = useDispatch()

  const fetchToDos = useCallback(() => {
    if (finishedInitialAnim) {
      dispatch(UiActions.request({ filter, query }))
    }
  }, [dispatch, filter, query, finishedInitialAnim])

  useEffect(() => {
    fetchToDos()
  }, [fetchToDos])

  function searchModeShow () {
    setSearchMode(true)
    startAnim()
  }

  function searchModeHide () {
    setSearchMode(false)
    setQuery(null)
    resetAnim()
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
        <Animated.View
          style={[styles.headerContainer, initialAnimStyle.headerContainerAnim, searchAnimStyle.headerContainerAnim]}
        >
          <Header
            searchAnimValue={searchAnimValue}
            searchMode={searchMode}
            searchModeShow={searchModeShow}
            searchModeHide={searchModeHide}
            onChangeQuery={onChangeQuery}
          />
        </Animated.View>
        <Animated.View style={[styles.content, initialAnimStyle.contentAnim, searchAnimStyle.contentAnim]}>
          <View style={[styles[searchMode ? 'filterContainerSearch' : 'filterContainer']]}>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  content: {
    flex: 1,
    backgroundColor: Colors.a420,
    overflow: 'hidden',
    borderTopLeftRadius: 40
  },
  filterContainer: {
    padding: 10,
    backgroundColor: Colors.a420,
    elevation: 0
  },
  filterContainerSearch: {
    padding: 10,
    backgroundColor: Colors.a420,
    elevation: 5
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

const initialAnimationStyle: AnimationStyle = anim => ({
  headerContainerAnim: {
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [height * 0.2, 0]
        })
      }
    ]
  },
  contentAnim: {
    opacity: anim.interpolate({
      inputRange: [0, 0.5],
      outputRange: [0, 1],
      extrapolateRight: 1
    }),
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [height * 0.7, 0]
        })
      }
    ]
  }
})

const searchAnimationStyle: AnimationStyle = anim => ({
  headerContainerAnim: {
    height: anim.interpolate({
      inputRange: [0, 1],
      outputRange: [height * 0.3, height * 0.075]
    }),
    padding: anim.interpolate({
      inputRange: [0, 1],
      outputRange: [30, 0]
    }),
    paddingVertical: anim.interpolate({
      inputRange: [0, 1],
      outputRange: [30, 10]
    })
  },
  contentAnim: {
    borderTopLeftRadius: anim.interpolate({
      inputRange: [0, 1],
      outputRange: [40, 0]
    })
  }
})

export default HomeScreen
