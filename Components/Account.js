import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'

import {
  SafeAreaView,
  SectionList,
  Text,
  Switch,
  View
} from 'react-native'

import Current from './Current'

import { API_URL } from 'react-native-dotenv'

export default function Account () {
  const { settings, setSettings } = useContext(Current)

  const [countries, setCountries] = useState()

  useEffect(() => {
    const _fetch = async () => {
      const { data } = await axios.get(API_URL + '/countries.json')

      setCountries(data.countries)
      // console.log(data.countries)
    }

    _fetch()
  }, [])

  const [values, setValues] = useState()

  useEffect(() => {
    const v = {}

    if (countries) {
      countries.forEach(country => {
        country.leagues.forEach(league => {
          v[league.id] = (settings !== null && settings[league.id] === true)
        })
      })

      setValues(v)
    }
  }, [countries])

  useEffect(() => {
    if (values && Object.values(values).filter(val => val).length > 0) setSettings(values)
  }, [values])

  // if (countries) {
  //   console.log(countries.map(country => ({ ...country, data: country.leagues })))
  // }

  const handleStatusChange = (id, status) => {
    // console.log({ ...values, id: status })
    if (values[id] !== status) {
      setValues({ ...values, [id]: status })
    }
  }

  return (
    <SafeAreaView>
      {countries && values &&
        <SectionList
          sections={countries.map(country => ({ ...country, data: country.leagues }))}
          renderSectionHeader={({ section: { name } }) => (
            <Text>{name}</Text>
          )}
          renderItem={({ item }) => <League {...item} onStatusChange={handleStatusChange} values={values} />}
        />
      }
    </SafeAreaView>
  )
}

function League ({ id, name, onStatusChange, values }) {
  const [status, setStatus] = useState(values[id])

  useEffect(() => {
    onStatusChange && onStatusChange(id, status)
  }, [status])

  return (
    <View>
      <Text>{name}</Text>
      <Switch value={status} onValueChange={value => setStatus(value)} />
    </View>
  )
}
