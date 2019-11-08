import React from 'react'
// import PropTypes from 'prop-types'

import {
  StyleSheet,
  View,
  Text
} from 'react-native'

import Fixture from './Fixture'

export default function League ({ id, name, fixtures }) {
  return (
    <View style={styles.container}>
      <View style={styles.league}>
        <Text style={styles.name}>
          {name}
        </Text>
      </View>

      {fixtures.map(fixture =>
        <Fixture key={fixture.id} fixture={fixture} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },

  league: {
    marginBottom: 8
  },

  name: {
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
