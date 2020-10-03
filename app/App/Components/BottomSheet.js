import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { TouchableOpacity, Image, Modal, StyleSheet, View, Dimensions } from 'react-native'
import Animated from 'react-native-reanimated'

import AddToDo from './AddToDo'
import EditToDo from './EditToDo'

import useAnimation, { AnimationStyle } from '../Hooks/useAnimation'

import { Colors, Images } from '../Themes'

const { height } = Dimensions.get('screen')

const BottomSheet = ({ children }, ref) => {
  const [state, setState] = useState({
    filter: null,
    item: null,
    visible: false
  })

  const { animStyle, startAnim, resetAnim } = useAnimation({
    autoPlay: false,
    duration: 500,
    animationStyle
  })

  useEffect(() => {
    if (state.visible) {
      startAnim()
    }
  }, [startAnim, state])

  useImperativeHandle(ref, () => ({
    show,
    hide
  }))

  function show (filter, item) {
    setState({ filter, item, visible: true })
  }

  function hide () {
    resetAnim(() => setState({ ...state, visible: false }))
  }

  return (
    <View style={styles.container}>
      {children}
      <Modal onRequestClose={hide} visible={state.visible} transparent>
        <Animated.View style={[styles.modalContainer, animStyle.modalContainerAnim]}>
          <Animated.View style={[styles.bottomSheet, animStyle.bottomSheetAnim]}>
            <TouchableOpacity style={styles.btnClose} onPress={hide}>
              <Image source={Images.close['24px']} />
            </TouchableOpacity>
            {state?.item ? (
              <EditToDo filter={state.filter} item={state.item} hide={hide} />
            ) : (
              <AddToDo filter={state.filter} hide={hide} />
            )}
          </Animated.View>
        </Animated.View>
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

const animationStyle: AnimationStyle = anim => ({
  modalContainerAnim: {
    opacity: anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.2, 1]
    })
  },
  bottomSheetAnim: {
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [height * 0.5, 0]
        })
      }
    ]
  }
})

export default forwardRef(BottomSheet)
