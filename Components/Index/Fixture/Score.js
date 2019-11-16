import React from 'react'
import PropTypes from 'prop-types'

import {
  StyleSheet,
  View,
  Text
} from 'react-native'

Score.propTypes = {
  fixture: PropTypes.object
}

export default function Score ({ fixture }) {
  const textColor = fixture.end ? styles.end : styles.running

  return (
    <View style={styles.container}>
      <View style={styles.score}>
        <Text style={textColor}>
          {fixture.scores.local_team}
        </Text>
      </View>

      <View>
        <Text style={textColor}>
          -
        </Text>
      </View>

      <View style={styles.score}>
        <Text style={textColor}>
          {fixture.scores.visitor_team}
        </Text>
      </View>

      {!fixture.end && fixture.minute >= 0 &&
        <>
          <Text
            style={styles.matchtime}
            left={`${(fixture.minute > 90 ? 1 : fixture.minute / 90) * 100}%`}
          >
            {fixture.minute}{'\''}
          </Text>

          <View
            width={`${(fixture.minute > 90 ? 1 : fixture.minute / 90) * 100}%`}
            style={styles.timeline}
          />
        </>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center'
  },

  score: {
    paddingHorizontal: 4
  },

  timeline: {
    position: 'absolute',
    left: 0,
    bottom: -8,
    backgroundColor: '#38003c',
    height: 4
  },

  matchtime: {
    position: 'absolute',
    bottom: -16,
    // transform: translate(-50%, 0),
    textAlign: 'center',
    fontSize: 7,
    width: 12

  },

  end: {
    color: '#ffffff'
  }
})
