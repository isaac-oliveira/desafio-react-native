import React, { forwardRef, useImperativeHandle, useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, Text, Image, TextInput, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

import { Colors, Images } from '../Themes'
import moment from 'moment'

const FormToDo = ({ item, onChange }, ref) => {
  const [date, setDate] = useState(new Date(item?.reminder || Date.now()))
  const [dateMode, setDateMode] = useState('date')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showPriorityList, setShowPriorityList] = useState(false)
  const [title, setTitle] = useState(item?.title)
  const [reminder, setReminder] = useState(item?.reminder)
  const [priority, setPriority] = useState(item?.priority)

  useImperativeHandle(ref, () => ({
    values: {
      title,
      reminder,
      priority
    }
  }))

  useEffect(() => {
    if (onChange) {
      onChange({ title, reminder, priority })
    }
  }, [onChange, title, reminder, priority])

  function onDateItem() {
    setShowDatePicker(true)
  }

  function onPriorityItem() {
    setShowPriorityList(true)
  }

  function onPriorityItemSelected(item) {
    setPriority(item)
    setShowPriorityList(false)
  }

  return (
    <View>
      <View style={styles.inputContainer}>
        <Image source={Images.check[item?.isDone ? '1' : '0']} />
        <TextInput style={styles.remindInput} value={title} onChangeText={setTitle} placeholder='Novo lembrete' />
      </View>

      <TouchableOpacity style={styles.btnAction} onPress={onDateItem}>
        <View style={styles.btnActionLabelContainer}>
          <Image source={Images.bell['24px']} />
          <Text style={styles.btnActionLabel}>Lembrar-me</Text>
        </View>
        <Text style={styles[reminder ? 'btnActionValue' : 'btnActionValueNull']}>
          {reminder ? moment(reminder).calendar() : 'Selecione'}
        </Text>
      </TouchableOpacity>

      <View>
        <TouchableOpacity style={styles.btnAction} onPress={onPriorityItem}>
          <View style={styles.btnActionLabelContainer}>
            <Image source={Images.flag['24px']} />
            <Text style={styles.btnActionLabel}>Prioridade</Text>
          </View>
          <Text style={styles[priority ? 'btnActionValue' : 'btnActionValueNull']}>{priority || 'Selecione'}</Text>
        </TouchableOpacity>
        {showPriorityList && <PriorityList itemSelected={priority} onItemSelect={onPriorityItemSelected} />}
      </View>

      {showDatePicker && (
        <DateTimePicker
          testID='dateTimePicker'
          mode={dateMode}
          value={date}
          is24Hour={true}
          display='default'
          onChange={(event, value) => {
            if (value) {
              if (dateMode === 'date') {
                setShowDatePicker(false)
                setDate(value)
                setDateMode('time')
                setShowDatePicker(true)
              } else {
                setShowDatePicker(false)
                setReminder(value)
                setDateMode('date')
              }
            } else {
              setShowDatePicker(false)
              if (dateMode === 'time') {
                setDateMode('date')
              }
            }
          }}
        />
      )}
    </View>
  )
}

const priorityList = ['Nenhum', 'Baixa(!)', 'Média(!!)', 'Alta(!!!)']

function PriorityList({ itemSelected = 'Nenhum', onItemSelect }) {
  return (
    <View style={styles.priorityListContainer}>
      {priorityList.map(item => {
        const selected = item === itemSelected

        function onPress() {
          onItemSelect(item)
        }

        return (
          <TouchableOpacity
            key={item}
            style={styles[selected ? 'priorityItemSelected' : 'priorityItem']}
            onPress={onPress}
          >
            <Text style={selected ? styles.priorityItemTextSelected : {}}>{item}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.c500
  },
  remindInput: {
    flex: 1,
    fontSize: 26,
    fontWeight: '500',
    marginLeft: 20
  },
  btnAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.c500
  },
  btnActionLabelContainer: {
    flexDirection: 'row'
  },
  btnActionLabel: {
    marginLeft: 20,
    color: Colors.c300
  },
  btnActionValueNull: {
    alignSelf: 'flex-end',
    color: Colors.c500
  },
  btnActionValue: {
    alignSelf: 'flex-end',
    color: Colors.a220
  },
  priorityListContainer: {
    position: 'absolute',
    backgroundColor: Colors.a420,
    borderRadius: 5,
    right: 0,
    elevation: 3
  },
  priorityItem: {
    paddingVertical: 10,
    paddingHorizontal: 25
  },
  priorityItemSelected: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: Colors.d100[0]
  },
  priorityItemTextSelected: {
    color: Colors.d100[2]
  }
})

export default forwardRef(FormToDo)