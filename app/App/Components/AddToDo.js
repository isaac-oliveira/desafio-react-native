import React, { useCallback, useMemo, useState } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'

import FormToDo from './FormToDo'
import { actions as ToDoActions } from '../Redux/ToDo'
import { Colors } from '../Themes'

const AddToDo = ({ filter, hide }) => {
  const dispatch = useDispatch()

  const [state, setState] = useState({
    title: null,
    reminder: null,
    priority: null
  })

  const isEmptyFields = useMemo(() => {
    const keys = Object.keys(state)
    const every = keys.every(key => !!state[key])

    return every
  }, [state])

  const onChange = useCallback(item => {
    setState(item)
  }, [])

  function onAdd() {
    dispatch(ToDoActions.requestCreateToDo({ filter, item: state }))
    hide()
  }

  return (
    <View>
      <FormToDo onChange={onChange} />
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: Colors.d100[isEmptyFields ? 2 : 1] }]}
        disabled={!isEmptyFields}
        onPress={onAdd}
      >
        <Text style={[styles.btnText, { opacity: isEmptyFields ? 1 : 0.5 }]}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  btn: {
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

export default AddToDo