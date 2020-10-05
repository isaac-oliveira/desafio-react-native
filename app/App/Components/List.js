import React from 'react'
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import type { FlatListProps } from 'react-native'

import { Colors } from '../Themes'

type Props = FlatListProps & {
  loading: boolean,
  error: boolean,
  ListErrorComponent: React.ReactNode
}

const List = ({ loading, error, ListErrorComponent, ...rest }: Props) => {
  if (loading) {
    return <ActivityIndicator style={styles.loading} color={Colors.a120} size='large' />
  }

  if (error) {
    return <ListErrorComponent />
  }

  return <FlatList contentContainerStyle={rest.data.length === 0 ? styles.contentList : {}} {...rest} />
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignSelf: 'center'
  },
  contentList: {
    flex: 1
  }
})

export default List
