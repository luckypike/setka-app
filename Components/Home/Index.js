import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import useAppState from 'react-native-appstate-hook'

import {
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Text,
  View
} from 'react-native'

import Current from '../Current'

import Days from './Index/Days'
import Fixtures from './Index/Fixtures'
import useI18n from '../I18n'

import { API_URL } from 'react-native-dotenv'

export default function Index () {
  const { myLeagues } = useContext(Current)
  const I18n = useI18n()

  const [updated, setUpdated] = useState()
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
      setUpdated(false)
      const { data } = await axios.get(API_URL + '/fixtures.json', {
        params: {
          leagues,
          from: date.startOf('day').format(),
          to: date.add(1, 'day').startOf('day').format()
        }
      })

      setFixtures(data.leagues)
      setReload(false)
      setUpdated(dayjs())
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

        <View style={styles.activity}>
          {(updated || updated === false) &&
            <>
              <Text style={styles.updating}>
                {updated ? `${I18n.t('updated')} ${updated.format('HH:mm')}` : I18n.t('updating') }
              </Text>
              <ActivityIndicator
                size="small"
                color="#666"
                style={[
                  styles.activityIndicator,
                  updated ? styles.updated : styles.notUpdated
                ]}
              />
            </>
          }
        </View>

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
  },

  activity: {
    height: 20,
    position: 'relative',
    flexDirection: 'row',
    width: 100,
    alignSelf: 'center',
    marginBottom: 16
  },

  activityIndicator: {
    position: 'absolute',
    right: -18,
    top: 0
  },

  updating: {
    alignSelf: 'center',
    color: '#666',
    fontSize: 12,
    textAlign: 'center'
  },

  updated: {
    opacity: 0
  }
})
