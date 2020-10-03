import React from 'react'
import { TouchableOpacity, StyleSheet, Image, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import TextQueryHighlight from './TextQueryHighlight'

import { actions as ToDoActions } from '../Redux/ToDo'
import SearchSelector from '../Selectors/SearchSelector'

import { Colors, Images } from '../Themes'

const ToDoItem = ({ item, onItemPress }) => {
  const query = useSelector(SearchSelector.query)
  const dispatch = useDispatch()
  const { isDone } = item

  function onCheck() {
    dispatch(ToDoActions.requestToggleToDo(item))
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnCheck} onPress={onCheck}>
        <Image source={Images.check[isDone ? '1' : '0']} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnItem} onPress={onItemPress}>
        <TextQueryHighlight
          style={[
            styles.title,
            {
              textDecorationLine: isDone ? 'line-through' : 'none',
              color: isDone ? Colors.c400 : Colors.a120
            }
          ]}
          query={query}
        >
          {item.title}
        </TextQueryHighlight>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  btnCheck: {
    padding: 25,
    justifyContent: 'center'
  },
  check: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: Colors.a120
  },
  btnItem: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    paddingLeft: 10
  }
})

export default ToDoItem
