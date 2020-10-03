import React from 'react'
import { StyleSheet, Text } from 'react-native'

import splitQueryText from '../Helpers/splitQueryText'
import { Colors } from '../Themes'

interface Props {
  style: any;
  children: String;
  query: string;
}

const TextQueryHighlight = ({ style, children, query }: Props) => {
  const splits = splitQueryText(children, query)

  return (
    <Text style={style}>
      {splits.map((str, index) => {
        if (str.toLowerCase() === query.toLowerCase()) {
          return (
            <Text key={`${index}`} style={styles.bold}>
              {str}
            </Text>
          )
        }
        return str
      })}
    </Text>
  )
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
    textDecorationLine: 'none',
    color: Colors.a120
  }
})

export default TextQueryHighlight
