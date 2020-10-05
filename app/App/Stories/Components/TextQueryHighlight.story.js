import React from 'react'
import { View, StyleSheet } from 'react-native'
import { storiesOf, addDecorator } from '@storybook/react-native'

import TextQueryHighlight from '../../Components/TextQueryHighlight'

addDecorator(storyFn => <View style={styles.decorator}>{storyFn()}</View>)

storiesOf('Text Query Highlight', module)
  .add('Query not found', () => <TextQueryHighlight query='a'>Exemplo</TextQueryHighlight>)
  .add('Query found', () => <TextQueryHighlight query='e'>Exemplo</TextQueryHighlight>)

const styles = StyleSheet.create({
  decorator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
