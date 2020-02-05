import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import useAppState from 'react-native-appstate-hook'

import {
  StyleSheet,
  ScrollView,
  View
} from 'react-native'

import Current from '../Current'

import Days from './Index/Days'
import Fixtures from './Index/Fixtures'

import { API_URL } from 'react-native-dotenv'

export default function Index () {
  const { myLeagues } = useContext(Current)

  const [date, setDate] = useState(dayjs())
  const [leagues, setLeagues] = useState()

  useEffect(() => {
    setLeagues([...myLeagues].filter(ob => ob[1]).map(ob => ob[0]))
  }, [myLeagues])

  const [reload, setReload] = useState(true)

  const { appState } = useAppState({
    onForeground: () => {
      setReload(true)
    }
  })

  const [fixtures, setFixtures] = useState()

  useEffect(() => {
    const _fetch = async () => {
      const { data } = await axios.get(API_URL + '/fixtures.json', {
        params: {
          leagues,
          from: date.startOf('day').format(),
          to: date.add(1, 'day').startOf('day').format()
        }
      })

      setFixtures(data.leagues)
      setReload(false)
    }

    if (leagues && date && reload) _fetch()
  }, [leagues, date, reload])

  const handleDateChange = value => {
    setDate(value)
    setReload(true)
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Days
          onDateChange={handleDateChange}
          initDate={date}
          leagues={leagues}
          appState={appState}
        />

        {fixtures &&
          <Fixtures fixtures={fixtures} />
        }
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingVertical: 32
  }
})
