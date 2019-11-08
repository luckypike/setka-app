import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import {
  SafeAreaView,
  Text
} from 'react-native'

import Current from './Current'

import { API_URL } from 'react-native-dotenv'

export default function Index ({ navigation }) {
  const { settings } = useContext(Current)

  const [leagues, setLeagues] = useState()
  const [fixtures, setFixtures] = useState()

  // console.log(settings)

  useEffect(() => {
    if (settings) {
      setLeagues(Object.entries(settings).filter(ob => ob[1]).map(ob => parseInt(ob[0], 10)))
    } else {
      navigation.navigate('Account')
    }
  }, [settings])

  useEffect(() => {
    const _fetch = async () => {
      const { data } = await axios.get(API_URL + '/fixtures.json')

      setFixtures(data.fixtures)
    }

    if (leagues) _fetch()
  }, [leagues])

  if (!settings || !fixtures) return null

  return (
    <SafeAreaView>
      <Text>
        Index
        {JSON.stringify(fixtures)}
      </Text>
    </SafeAreaView>
  )
}
