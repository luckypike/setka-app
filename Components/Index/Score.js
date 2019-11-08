import React from 'react'
// import PropTypes from 'prop-types'

import {
  StyleSheet,
  View,
  Text
} from 'react-native'

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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },

  score: {
    paddingHorizontal: 4
  },

  end: {
    color: '#ffffff'
  }
})
