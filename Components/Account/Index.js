import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View
} from 'react-native'

import Current from '../Current'

import { API_URL } from 'react-native-dotenv'

export default function Index () {
  const navigation = useNavigation()
  const { myTeams, myLeagues } = useContext(Current)

  const [countries, setCountries] = useState()

  useEffect(() => {
    const _fetch = async () => {
      const { data } = await axios.get(API_URL + '/countries.json')

      setCountries(data.countries)
    }

    _fetch()
  }, [])

  const myTeamIds = [...myTeams].filter(ob => ob[1]).map(ob => ob[0])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.countries}>
        {countries && countries.map(country =>
          <View key={country.id}>
            <Text style={styles.country}>
              {country.name}
            </Text>
            <View style={styles.leagues}>
              {country.leagues.map((league, i) =>
                <TouchableOpacity
                  key={league.id}
                  onPress={
                    () => navigation.navigate(
                      'Account',
                      {
                        screen: 'League',
                        params: { league }
                      }
                    )
                  }
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

                      {league.teams.filter(t => myTeamIds.includes(t.id)).map(t => t.id).length > 0 &&
                        <Text style={styles.desc}>
                          уведомления: {league.teams.filter(t => myTeamIds.includes(t.id)).map(t => t.id).length} ком.
                        </Text>
                      }
                    </View>

                    {!!myLeagues.get(league.id) &&
                      <View style={styles.inMyLeagues}>
                        <Text style={styles.inMyLeaguesSign}>
                          +
                        </Text>
                      </View>
                    }
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },

  countries: {
    paddingBottom: 48
  },

  country: {
    fontWeight: 'bold',
    fontSize: 18,
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

  cancel: {
    fontSize: 17,
    marginHorizontal: 16,
    color: '#0d7ffb'
  },

  desc: {
    color: '#777777',
    fontSize: 12
  },

  logo: {
    width: 24,
    height: 24,
    marginRight: 8
  },

  inMyLeagues: {
    marginLeft: 'auto'
  },

  inMyLeaguesSign: {
    fontWeight: '700'
  }
})
