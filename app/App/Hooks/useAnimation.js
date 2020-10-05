import { useEffect, useRef, useState } from 'react'
import type { ViewStyle } from 'react-native'
import Animated, { Easing } from 'react-native-reanimated'

type AnimStyleObject = {
  [key: string]: ViewStyle
}

export type AnimationStyle = (anim: Animated.Value) => AnimStyleObject

type Props = {
  duration?: number,
  autoPlay?: boolean,
  animationStyle: AnimationStyle,
  easing?: Easing
}

type Callback = () => void

type Anim = {
  animStyle: AnimStyleObject,
  animValue: Animated.Value,
  startAnim(callback: Callback): void,
  resetAnim(callback: Callback): void,
  finishedInitialAnim: boolean
}

const useAnimation = ({ duration = 2000, autoPlay, animationStyle, easing = Easing.exp }: Props): Anim => {
  const [finishedInitialAnim, setFinishedInitialAnim] = useState(!autoPlay)
  const animValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (autoPlay) {
      Animated.timing(animValue, {
        toValue: 1,
        easing,
        duration
      }).start(() => setFinishedInitialAnim(true))
    }
  }, [autoPlay, duration, easing, animValue])

  const animStyle = animationStyle(animValue)

  function startAnim (callback?: Callback) {
    setFinishedInitialAnim(false)
    Animated.timing(animValue, {
      toValue: 1,
      easing,
      duration
    }).start(callback)
  }

  function resetAnim (callback?: Callback) {
    setFinishedInitialAnim(false)
    animValue.setValue(1)
    Animated.timing(animValue, {
      toValue: 0,
      easing,
      duration
    }).start(callback)
  }

  return {
    animStyle,
    animValue,
    startAnim,
    resetAnim,
    finishedInitialAnim
  }
}

export default useAnimation
