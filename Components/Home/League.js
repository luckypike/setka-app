import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import axios from 'axios'

import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text
} from 'react-native'

import { API_URL } from 'react-native-dotenv'

export default function League () {
  const route = useRoute()
  const { league } = route.params

  const [standings, setStandings] = useState()

  useEffect(() => {
    const _fetch = async () => {
      const { data } = await axios.get(API_URL + `/leagues/${league.id}/standings.json`, {
        params: {
          league_id: league.id
        }
      })

      setStandings(data.standings)
    }

    _fetch()
  }, [league.id])

  return (
    <ScrollView>
      <View style={styles.container}>
        {standings && standings.map((standing, i) =>
          <View key={standing.id} style={[styles.standing, i === 0 ? styles.firstStanding : styles.noFirstStanding]}>
            <Text style={styles.rank}>
              {standing.rank}
            </Text>

            <View style={styles.team}>
              <Image style={styles.logo} source={{ uri: standing.team.logo }} resizeMode="contain" />
              <Text
                style={styles.name}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {standing.team.name}
              </Text>
            </View>

            <Text style={styles.played}>
              {standing.played}
            </Text>

            <Text style={styles.points}>
              {standing.points}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 32
  },

  standing: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12
  },

  noFirstStanding: {
    borderTopColor: '#ddd',
    borderTopWidth: 0.5
  },

  team: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1
  },

  name: {
    paddingHorizontal: 8
  },

  logo: {
    width: 20,
    height: 20
  },

  points: {
    fontWeight: '700',
    width: 40,
    textAlign: 'center'
  },

  played: {
    width: 32,
    textAlign: 'center'
  },

  rank: {
    // marginRight: 16,
    width: 32,
    textAlign: 'center'
  }
})
