import React, { useCallback, useState } from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'

import FormToDo from './FormToDo'
import { actions as ToDoActions } from '../Redux/ToDo'
import { Colors } from '../Themes'

const EditToDo = ({ filter, item, hide }) => {
  const dispatch = useDispatch()

  const [clickConfirm, setClickConfirm] = useState(false)

  const onChange = useCallback(
    value => {
      dispatch(ToDoActions.requestUpdateToDo({ filter, item: { ...item, ...value } }))
    },
    [dispatch, filter, item]
  )

  function onDelete() {
    if (!clickConfirm) {
      setClickConfirm(!clickConfirm)
    } else {
      dispatch(ToDoActions.requestDeleteToDo({ filter, item }))
      hide()
    }
  }

  return (
    <View>
      <FormToDo item={item} onChange={onChange} />
      <TouchableOpacity style={[styles.btn, { backgroundColor: Colors.d200[clickConfirm ? 1 : 0] }]} onPress={onDelete}>
        <Text style={[styles.btnText, { color: clickConfirm ? Colors.a420 : Colors.a320 }]}>Apagar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.a320,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 15
  },
  btnText: {
    color: Colors.a420
  }
})

export default EditToDo
