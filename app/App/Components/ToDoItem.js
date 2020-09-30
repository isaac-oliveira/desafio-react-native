import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native'
import { useDispatch } from 'react-redux'

import { actions as ToDoActions } from '../Redux/ToDo'

import Images from '../Themes/Images'
import Colors from '../Themes/Colors'

const ToDoItem = ({ item }) => {
  const dispatch = useDispatch()
  const { isDone } = item

  function onCheck () {
    dispatch(ToDoActions.requestToggleToDo(item))
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnCheck} onPress={onCheck}>
        <Image source={Images.check[isDone ? '1' : '0']} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnItem}>
        <Text
          style={[
            styles.title,
            {
              textDecorationLine: isDone ? 'line-through' : 'none',
              color: isDone ? Colors.c400 : Colors.a120
            }
          ]}
        >
          {item.title}
        </Text>
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
    backgroundColor: '#000'
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
