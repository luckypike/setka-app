import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import dayjs from 'dayjs'

import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
  Text
} from 'react-native'

import { API_URL } from 'react-native-dotenv'

Days.propTypes = {
  appState: PropTypes.string,
  initDate: PropTypes.object,
  onDateChange: PropTypes.func,
  leagues: PropTypes.array
}

export default function Days ({ initDate, onDateChange, leagues, appState }) {
  const daysRef = useRef()

  const [date, setDate] = useState(initDate)

  const [days] = useState(() => {
    return Array.from(Array(28), (_, x) => {
      const d = date.add(x - 7, 'day')
      return { key: d.format('YYYYMMDD'), date: d }
    })
  })

  useEffect(() => {
    if (appState === 'active' && date.isSame(dayjs(), 'day')) {
      daysRef.current.scrollToIndex({ animated: true, index: 6 })
    }
  }, [appState])

  const [fixtures, setFixtures] = useState()

  useEffect(() => {
    const _fetch = async () => {
      const { data } = await axios.get(API_URL + '/fixtures/days.json', {
        params: {
          leagues,
          from: days[0].date.startOf('day').format(),
          to: days[days.length - 1].date.startOf('day').format()
        }
      })

      setFixtures(data.fixtures)
    }

    if (leagues) _fetch()
  }, [leagues])

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
        initialScrollIndex={6}
        showsHorizontalScrollIndicator={false}
        style={styles.days}
        renderItem={({ item, index, separators }) =>
          <Day
            count={() => {
              const f = fixtures && fixtures.find(f => item.date.isSame(dayjs(f.date), 'day'))
              return (f && f.count) || null
            }}
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

function Day ({ day, active, onDayPress, count }) {
  const fixtures = count()
  const today = day.isSame(dayjs(), 'day')

  return (
    <TouchableOpacity
      style={[
        styles.day,
        active ? styles.activeDay : styles.inactiveDay
      ]}
      onPress={() => onDayPress(day)}
    >
      {fixtures &&
        <Text style={styles.fixtures}>
          {fixtures}
        </Text>
      }
      <Text style={[styles.dd, active ? styles.activeText : styles.inactiveText]}>
        {day.format('dd')}
      </Text>
      <Text style={[styles.DD, active ? styles.activeText : styles.inactiveText]}>
        {day.format('DD')}
      </Text>
      <Text style={[styles.mm, active ? styles.activeText : styles.inactiveText]}>
        {day.format('MMM')}
      </Text>
      {today &&
        <View style={styles.today} />
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },

  days: {
    flexDirection: 'row'
  },

  day: {
    width: 48,
    marginLeft: 8,
    backgroundColor: '#e1e1e1',
    paddingTop: 8,
    paddingBottom: 24,
    position: 'relative'
  },

  today: {
    position: 'absolute',
    top: 0,
    width: '100%',
    left: 0,
    height: 4,
    backgroundColor: 'red'
  },

  fixtures: {
    position: 'absolute',
    bottom: 4,
    left: '50%',
    width: 16,
    height: 16,
    fontSize: 10,
    fontWeight: 'bold',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    lineHeight: 16,
    // borderRadius: 8,
    marginLeft: -8
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
