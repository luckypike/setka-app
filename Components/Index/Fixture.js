import React from 'react'
// import PropTypes from 'prop-types'
import dayjs from 'dayjs'

import {
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native'

import Score from './Score'

export default function Fixture ({ fixture }) {
  return (
    <View
      style={[
        styles.container,
        ((fixture.score && !fixture.end && fixture.minute >= 0) ? styles.live : styles.nolive)
      ]}
    >
      <View style={[styles.team, styles.local]}>
        <Text style={styles.name} ellipsizeMode="tail" numberOfLines={1}>
          {fixture.local_team.name}
        </Text>
        <Image style={styles.logo} source={{ uri: fixture.local_team.logo }} />
      </View>

      {!fixture.score &&
        <View style={styles.time}>
          <Text style={styles.timeText}>
            {dayjs(fixture.starting_at).format('HH:mm')}
          </Text>
        </View>
      }

      {fixture.score &&
        <View style={[styles.scores, fixture.end ? styles.end : styles.running]}>
          <Score fixture={fixture} />
        </View>
      }

      <View style={[styles.team, styles.visitor]}>
        <Image style={styles.logo} source={{ uri: fixture.visitor_team.logo }} />
        <Text style={styles.name} ellipsizeMode="tail" numberOfLines={1}>
          {fixture.visitor_team.name}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 4,
    flexDirection: 'row'
  },

  live: {
    paddingBottom: 16
  },

  time: {
    backgroundColor: '#f4f4f4',
    flexBasis: 50,
    marginHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'center'
  },

  scores: {
    backgroundColor: '#f4f4f4',
    flexBasis: 50,
    marginHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'center'
  },

  end: {
    backgroundColor: '#38003c'
  },

  timeText: {
    textAlign: 'center'
  },

  local: {
    justifyContent: 'flex-end'
  },

  team: {
    paddingVertical: 4,
    flex: 1,
    flexDirection: 'row'
    // flexGrow: 1,
    // flexBasis: 'fill',
    // backgroundColor: 'green'
  },

  name: {
    paddingHorizontal: 8
  },

  logo: {
    width: 20,
    height: 20
  }
})
