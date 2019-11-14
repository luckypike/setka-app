import React from 'react'
import PropTypes from 'prop-types'

import {
  StyleSheet,
  Text,
  View
} from 'react-native'

import League from './League'

Fixtures.propTypes = {
  fixtures: PropTypes.array
}

export default function Fixtures ({ fixtures }) {
  return (
    <View style={styles.container}>
      {fixtures.map(league =>
        <League {...league} key={league.id} />
      )}

      {fixtures.length === 0 &&
        <View style={styles.empty}>
          <Text style={styles.noFixtures}>
            Нет игр в ваших лигах :(
          </Text>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 16
  },

  empty: {
    padding: 32
  },

  noFixtures: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18
  }
})
