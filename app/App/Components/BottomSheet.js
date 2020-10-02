import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { TouchableOpacity, Image, Modal, StyleSheet, View } from 'react-native'

import { Colors, Images } from '../Themes'
import AddToDo from './AddToDo'
import EditToDo from './EditToDo'

const BottomSheet = ({ children }, ref) => {
  const [filter, setFilter] = useState(null)
  const [state, setState] = useState(null)
  const [visible, setVisible] = useState(false)

  useImperativeHandle(ref, () => ({
    show,
    hide
  }))

  function show (filter, item) {
    setFilter(filter)
    setState(item)
    setVisible(true)
  }

  function hide () {
    setVisible(false)
  }

  return (
    <View style={styles.container}>
      {children}
      <Modal onRequestClose={hide} visible={visible} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.bottomSheet}>
            <TouchableOpacity style={styles.btnClose} onPress={hide}>
              <Image source={Images.close['24px']} />
            </TouchableOpacity>
            {state ? <EditToDo filter={filter} item={state} hide={hide} /> : <AddToDo filter={filter} hide={hide} />}
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0,0,.4)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    flex: 0.5,
    padding: 10,
    backgroundColor: Colors.a420
  },
  bottomSheet: {
    backgroundColor: Colors.a420,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    paddingHorizontal: 10
  },
  btnClose: {
    top: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
    zIndex: 3
  }
})

export default forwardRef(BottomSheet)
