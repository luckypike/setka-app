import React, { useState, useEffect, useRef } from 'react'

import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
  Text
} from 'react-native'

export default function Days ({ initDate, onDateChange }) {
  const daysRef = useRef()

  const [date, setDate] = useState(initDate)

  const [days] = useState(() => {
    return Array.from(Array(28), (_, x) => {
      const d = date.add(x - 7, 'day')
      return { key: d.format('YYYYMMDD'), date: d }
    })
  })

  useEffect(() => {
    daysRef.current.scrollToIndex({ index: 6 })
  }, [])

  const handleDayPress = value => {
    setDate(value)
    onDateChange && onDateChange(value)
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={daysRef}
        getItemLayout={(data, index) => ({ length: 56, offset: 56 * index, index })}
        data={days}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.days}
        renderItem={({ item, index, separators }) =>
          <Day
            onDayPress={handleDayPress}
            day={item.date}
            active={item.date.isSame(date, 'day')}
            date={date}
          />
        }
      />
    </View>
  )
}

function Day ({ day, active, onDayPress }) {
  return (
    <TouchableOpacity
      style={[
        styles.day,
        active ? styles.activeDay : styles.inactiveDay
      ]}
      onPress={() => onDayPress(day)}
    >
      <Text style={[styles.dd, active ? styles.activeText : styles.inactiveText]}>
        {day.format('dd')}
      </Text>
      <Text style={[styles.DD, active ? styles.activeText : styles.inactiveText]}>
        {day.format('DD')}
      </Text>
      <Text style={[styles.mm, active ? styles.activeText : styles.inactiveText]}>
        {day.format('MMM')}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    //
    marginBottom: 32
  },

  days: {
    // paddingHorizontal: 16,
    flexDirection: 'row'
  },

  day: {
    width: 48,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: '#e1e1e1',
    paddingTop: 8,
    paddingBottom: 16
  },

  activeDay: {
    backgroundColor: '#212121',
    color: 'white'
  },

  dd: {
    marginTop: 4,
    textAlign: 'center',
    fontSize: 14
  },

  DD: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18
  },

  mm: {
    textAlign: 'center',
    fontSize: 8,
    marginTop: 4,
    textTransform: 'uppercase'
  },

  activeText: {
    color: '#ffffff'
  }
})
