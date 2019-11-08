import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'

import {
  SafeAreaView,
  SectionList,
  StyleSheet,
  Button,
  Text,
  Switch,
  View
} from 'react-native'

import Current from './Current'

import { API_URL } from 'react-native-dotenv'

export default function Account ({ navigation }) {
  const { settings, setSettings } = useContext(Current)

  const [countries, setCountries] = useState()

  useEffect(() => {
    const _fetch = async () => {
      const { data } = await axios.get(API_URL + '/countries.json')

      setCountries(data.countries)
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
    if (values) {
      setSettings(values)
    }
  }, [values])

  const handleStatusChange = (id, status) => {
    setValues({ ...values, [id]: status })
  }

  return (
    <SafeAreaView style={styles.container}>
      {countries && values &&
        <SectionList
          stickySectionHeadersEnabled={false}
          sections={countries.map(country => ({ ...country, data: country.leagues }))}
          renderSectionHeader={({ section: { name } }) => (
            <Text style={styles.country}>{name}</Text>
          )}
          renderItem={({ item }) => <League {...item} onStatusChange={handleStatusChange} values={values} />}
        />
      }

      <View style={styles.ready}>
        <Text>
          {Object.values(settings).filter(value => value).length}
        </Text>
        <Button
          title="Готово!"
          disabled={!settings || Object.values(settings).filter(value => value).length === 0}
          onPress={() => navigation.navigate('Index')}
        />
      </View>

    </SafeAreaView>
  )
}

function League ({ id, name, onStatusChange, values }) {
  const [status, setStatus] = useState(values[id])

  useEffect(() => {
    onStatusChange && onStatusChange(id, status)
  }, [status])

  return (
    <View style={styles.league}>
      <Text style={styles.name}>{name}</Text>
      <Switch value={status} onValueChange={value => setStatus(value)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  country: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 16,
    marginTop: 32
  },

  ready: {
    padding: 16
  },

  league: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    // marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8
  },

  name: {
    marginRight: 'auto'
  }
})
