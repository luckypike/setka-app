import React from 'react'
import PropTypes from 'prop-types'

import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text
} from 'react-native'

import Fixture from './Fixture'

League.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  fixtures: PropTypes.array.isRequired
}

export default function League ({ id, name, fixtures }) {
  return (
    <View style={styles.container}>
      <View style={styles.league}>
        <Text style={styles.name}>
          {name}
        </Text>

        <TouchableOpacity style={styles.table}>
          <Text style={styles.tableText}>
            Таблица
          </Text>
        </TouchableOpacity>
      </View>

      {fixtures.map(fixture =>
        <Fixture key={fixture.id} fixture={fixture} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32
  },

  league: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
    paddingHorizontal: 16
  },

  name: {
    fontWeight: '600',
    marginRight: 16,
    fontSize: 18
  },

  table: {
    marginLeft: 'auto'
  },

  tableText: {
    fontSize: 16,
    color: '#0d7ffb'
  }
})
