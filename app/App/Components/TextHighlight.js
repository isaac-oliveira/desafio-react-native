import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Colors } from '../Themes'

interface Props {
  style: any;
  children: String;
  query: string;
}

const TextHighlight = ({ style, children, query }: Props) => {
  const index = query ? children?.toLowerCase().indexOf(query?.toLowerCase()) : -1
  if (index === -1) {
    return <Text style={style}>{children}</Text>
  }

  const textHighlight = [
    children.slice(0, index),
    children.slice(index, index + query.length),
    children.slice(index + query.length)
  ]

  return (
    <Text style={style}>
      {textHighlight[0]}
      <Text style={styles.bold}>{textHighlight[1]}</Text>
      {textHighlight[2]}
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

export default TextHighlight
