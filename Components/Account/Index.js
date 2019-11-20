import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View
} from 'react-native'

import Current from '../Current'

import { API_URL } from 'react-native-dotenv'

Index.propTypes = {
  navigation: PropTypes.object
}

Index.navigationOptions = ({ navigation, navigationOptions }) => ({
  headerBackTitle: 'Назад'
})

export default function Index ({ navigation }) {
  const { myTeams, setMyTeams } = useContext(Current)

  const [countries, setCountries] = useState()

  useEffect(() => {
    const _fetch = async () => {
      const { data } = await axios.get(API_URL + '/countries.json')

      setCountries(data.countries)
    }

    _fetch()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {countries &&
        <ScrollView style={styles.countries}>
          {countries.map(country =>
            <View key={country.id}>
              <Text style={styles.country}>
                {country.name}
              </Text>
              <View style={styles.leagues}>
                {country.leagues.map((league, i) =>
                  <TouchableOpacity
                    key={league.id}
                    onPress={() => navigation.navigate('AccountLeague', { league })}
                  >
                    <View style={[styles.league, i === 0 ? styles.firstLeague : styles.noFirstLeague]}>
                      {league.logo &&
                        <Image
                          style={styles.logo}
                          source={{ uri: league.logo }}
                          resizeMode="contain"
                        />
                      }
                      <View>
                        <Text>
                          {league.name}
                        </Text>

                        <Text style={styles.desc}>
                          Сколько команд и сколько подписано
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </ScrollView>
      }
    </SafeAreaView>
  )
}

// function League ({ id, name, onStatusChange, values }) {
//   const [status, setStatus] = useState(values[id])
//
//   useEffect(() => {
//     onStatusChange && onStatusChange(id, status)
//   }, [status])
//
//   return (
//     <View style={styles.league}>
//       <Text style={styles.name}>{name}</Text>
//       <Switch value={status} onValueChange={value => setStatus(value)} />
//     </View>
//   )
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4'
  },

  countries: {
    padding: 16
    // backgroundColor: 'red'
    // flex: 1
  },

  country: {
    fontWeight: 'bold',
    fontSize: 18,
    // marginLeft: 16,
    marginBottom: 16
  },

  leagues: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 32
  },

  league: {
    alignItems: 'center',
    // marginBottom: 8,
    flexDirection: 'row',
    // alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8
  },

  noFirstLeague: {
    borderTopColor: '#ddd',
    borderTopWidth: 0.5
  },

  desc: {
    color: '#777777',
    fontSize: 14
  },

  logo: {
    width: 24,
    height: 24,
    marginRight: 8
  }
})
