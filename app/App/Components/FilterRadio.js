import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Colors } from '../Themes'

const FilterRadio = ({ filters, value, onChange }) => {
  const [current, setCurrent] = useState(value || 'all')

  useEffect(() => {
    if (onChange) {
      onChange(current)
    }
  }, [onChange, current])

  return (
    <View style={styles.container}>
      {filters.map(filter => {
        const active = filter.value === current

        function onPress () {
          setCurrent(filter.value)
        }

        return (
          <TouchableOpacity key={filter.value} disabled={active} onPress={onPress}>
            <Text style={styles[active ? 'itemActive' : 'itemInactive']}>{filter.title}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemActive: {
    backgroundColor: Colors.a120,
    color: Colors.a420,
    textAlign: 'center',
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 15,
    margin: 5
  },
  itemInactive: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    margin: 5,
    backgroundColor: Colors.a420,
    color: Colors.c400,
    textAlign: 'center'
  }
})

export default FilterRadio
