import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Animated, { Easing } from 'react-native-reanimated'

import DefaultBackground from '../Components/DefaultBackground'
import ToggleFilter from '../Components/ToggleFilter'
import ToDoItem from '../Components/ToDoItem'
import List from '../Components/List'
import ListError from '../Components/ListErrorComponent'
import ListSearchEmptyComponent from '../Components/ListSearchEmptyComponent'
import ListToDoEmptyComponent from '../Components/ListToDoEmptyComponent'
import BottomSheet from '../Components/BottomSheet'
import Header from '../Components/Header'

import useAnimation, { AnimationStyle } from '../Hooks/useAnimation'

import { actions as UiActions } from '../Redux/Ui'

import ToDoSelector from '../Selectors/ToDoSelector'
import UiSelector from '../Selectors/UiSelector'

import { Colors, Images } from '../Themes'

const { height } = Dimensions.get('screen')

const filters = [
  { title: 'Todos', value: 'all' },
  { title: 'Hoje', value: 'today' },
  { title: 'Esta Semana', value: 'week' },
  { title: 'Atrasadas', value: 'late' }
]

const HomeScreen = () => {
  const bottomSheetRef = useRef(null)
  const [filter, setFilter] = useState('all')
  const [searchMode, setSearchMode] = useState(false)

  const toDos = useSelector(ToDoSelector.getToDos)
  const ui = useSelector(UiSelector.ui)

  const { animStyle: initialAnimStyle, finishedInitialAnim } = useAnimation({
    duration: 1000,
    autoPlay: true,
    animationStyle: initialAnimationStyle
  })

  const { animStyle: searchAnimStyle, startAnim, resetAnim } = useAnimation({
    duration: 500,
    autoPlay: false,
    animationStyle: searchAnimationStyle,
    easing: Easing.linear
  })

  const dispatch = useDispatch()

  const fetchToDos = useCallback(() => {
    if (finishedInitialAnim) {
      dispatch(UiActions.request(filter))
    }
  }, [dispatch, filter, finishedInitialAnim])

  useEffect(() => {
    fetchToDos()
  }, [fetchToDos])

  function searchModeShow () {
    setSearchMode(true)
    startAnim()
  }

  function searchModeHide () {
    setSearchMode(false)
    resetAnim()
  }

  function showAddSheet () {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.show(filter, null)
    }
  }

  const ListErrorComponent = () => <ListError onTryAgain={fetchToDos} />

  const renderItem = ({ item }) => {
    function showEditSheet () {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.show(filter, item)
      }
    }

    return <ToDoItem item={item} onItemPress={showEditSheet} />
  }

  return (
    <BottomSheet ref={bottomSheetRef}>
      <DefaultBackground>
        <Header
          animStyle={[initialAnimStyle.headerContainerAnim]}
          searchMode={searchMode}
          searchModeShow={searchModeShow}
          searchModeHide={searchModeHide}
        />

        <Animated.View style={[styles.content, initialAnimStyle.contentAnim, searchAnimStyle.contentAnim]}>
          <View style={styles[searchMode ? 'filterContainerSearch' : 'filterContainer']}>
            <ToggleFilter
              loading={ui.fetching && !finishedInitialAnim}
              filters={filters}
              value={filter}
              onChange={setFilter}
            />
          </View>
          <List
            loading={ui.fetching}
            error={ui.error}
            data={toDos}
            keyExtractor={item => String(item.id)}
            ListEmptyComponent={searchMode ? ListSearchEmptyComponent : ListToDoEmptyComponent}
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
  content: {
    flex: 1,
    position: 'absolute',
    top: height * 0.3,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.a420,
    overflow: 'hidden',
    borderTopLeftRadius: 40
  },
  contentScroll: {
    flex: 1,
    position: 'relative',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.a420,
    overflow: 'hidden',
    borderTopLeftRadius: 40
  },
  filterContainer: {
    padding: 5,
    backgroundColor: Colors.a420,
    elevation: 0
  },
  filterContainerSearch: {
    padding: 5,
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
  contentAnim: {
    top: anim.interpolate({
      inputRange: [0, 1],
      outputRange: [height * 0.3, height * 0.075]
    }),
    borderTopLeftRadius: anim.interpolate({
      inputRange: [0, 1],
      outputRange: [40, 0]
    })
  }
})

export default HomeScreen
