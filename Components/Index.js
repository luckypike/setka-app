import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text
} from 'react-native'

import { Svg, Circle, Path } from 'react-native-svg'

import Current from './Current'
import Fixtures from './Index/Fixtures'

import { API_URL } from 'react-native-dotenv'

export default function Index ({ navigation }) {
  const { settings } = useContext(Current)

  const [date, setDate] = useState(dayjs())
  const [leagues, setLeagues] = useState()
  const [fixtures, setFixtures] = useState()

  useEffect(() => {
    if (settings) {
      setLeagues(Object.entries(settings).filter(ob => ob[1]).map(ob => parseInt(ob[0], 10)))
    } else {
      navigation.navigate('Account')
    }
  }, [settings])

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
    }

    if (leagues && date) _fetch()
  }, [leagues, date])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>
              Setka
            </Text>
          </View>

          <TouchableOpacity
            style={styles.account}
            onPress={() => navigation.navigate('Account')}
          >
            <Account />
          </TouchableOpacity>
        </View>

        {fixtures &&
          <Fixtures fixtures={fixtures} />
        }
      </ScrollView>
    </SafeAreaView>
  )
}

function Account () {
  return (
    <Svg viewBox="0 0 32 32" width={28} height={28}>
      <Circle
        cx="16"
        cy="16"
        fill="none"
        r="4"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"/>
      <Path
        d="M27.758 10.366l-1-1.732a2 2 0 00-2.732-.732l-.526.304c-2 1.154-4.5-.289-4.5-2.598V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v.608c0 2.309-2.5 3.753-4.5 2.598l-.526-.304a2 2 0 00-2.732.732l-1 1.732a2 2 0 00.732 2.732l.526.304c2 1.155 2 4.041 0 5.196l-.526.304a2 2 0 00-.732 2.732l1 1.732a2 2 0 002.732.732l.526-.304c2-1.155 4.5.289 4.5 2.598V27a2 2 0 002 2h2a2 2 0 002-2v-.608c0-2.309 2.5-3.753 4.5-2.598l.526.304a2 2 0 002.732-.732l1-1.732a2 2 0 00-.732-2.732l-.526-.304c-2-1.155-2-4.041 0-5.196l.526-.304a1.999 1.999 0 00.732-2.732z"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2" />
    </Svg>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4'
  },

  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32
  },

  account: {
    marginLeft: 'auto',
    width: 28,
    height: 28
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold'
  }
})
