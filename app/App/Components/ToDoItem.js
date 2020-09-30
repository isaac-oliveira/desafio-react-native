import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'

const ToDoItem = ({ item }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.check} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 20
  },
  check: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#000'
  },
  title: {
    paddingLeft: 25
  }
})

export default ToDoItem
