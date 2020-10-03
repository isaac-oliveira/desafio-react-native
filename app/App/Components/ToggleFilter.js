import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'

import { Colors } from '../Themes'

const { height, fontScale } = Dimensions.get('screen')

const ToggleFilter = ({ loading, filters, value, onChange }) => {
  const [current, setCurrent] = useState(value || 'all')

  useEffect(() => {
    if (onChange) {
      onChange(current)
    }
  }, [onChange, current])

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {loading && <ToggleFilterLoading filters={filters} current={current} />}
      {!loading &&
        filters.map(filter => {
          const active = filter.value === current

          function onPress () {
            setCurrent(filter.value)
          }

          return (
            <TouchableOpacity key={filter.value} disabled={active} onPress={onPress}>
              <Text adjustsFontSizeToFit numberOfLines={1} style={[styles[active ? 'itemActive' : 'itemInactive']]}>
                {filter.title}
              </Text>
            </TouchableOpacity>
          )
        })}
    </ScrollView>
  )
}

function ToggleFilterLoading ({ filters, current }) {
  return (
    <View style={styles.container}>
      {filters.map(filter => {
        const active = filter.value === current

        const style = active ? styles.itemActive : { ...styles.itemActive, backgroundColor: Colors.c400 }

        return <View key={filter.value} style={{ ...style, width: filter.title.length * 14 * fontScale }} />
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  scroll: {
    alignSelf: 'center'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: height * 0.05
  },
  itemActive: {
    fontSize: 16,
    backgroundColor: Colors.a120,
    color: Colors.a420,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 15,
    margin: 5
  },
  itemInactive: {
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 15,
    margin: 5,
    backgroundColor: Colors.a420,
    color: Colors.c400,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
})

export default ToggleFilter
