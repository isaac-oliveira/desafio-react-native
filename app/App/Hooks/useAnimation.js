import { useEffect, useRef, useState } from 'react'
import { ViewStyle } from 'react-native'
import Animated, { Easing } from 'react-native-reanimated'

interface AnimStyleObject {
  [key: string]: ViewStyle;
}

export type AnimationStyle = (anim: Animated.Value) => AnimStyleObject

interface Props {
  duration?: Number;
  autoPlay?: Boolean;
  animationStyle: AnimationStyle;
  easing?: Easing;
}

const useAnimation = ({ duration = 2000, autoPlay, animationStyle, easing = Easing.exp }: Props) => {
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

  function startAnim (callback) {
    setFinishedInitialAnim(false)
    Animated.timing(animValue, {
      toValue: 1,
      easing,
      duration
    }).start(callback)
  }

  function resetAnim (callback) {
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
