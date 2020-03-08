import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native'

import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native'

import Fixture from './Fixture'
import Current from '../../Current'

League.propTypes = {
  league: PropTypes.object.isRequired,
  fixtures: PropTypes.array.isRequired
}

export default function League ({ league, fixtures }) {
  const navigation = useNavigation()
  const { I18n } = useContext(Current)

  return (
    <View style={styles.container}>
      <View style={styles.league}>
        {league.logo &&
          <Image
            style={styles.logo}
            source={{ uri: league.logo }}
            resizeMode="contain"
          />
        }

        <Text style={styles.name}>
          {league.name}
        </Text>

        <TouchableOpacity
          style={styles.table}
          onPress={() => navigation.navigate('League', { league })}
        >
          <Text style={styles.tableText}>
            {I18n.t('standings.title')}
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

  logo: {
    width: 24,
    height: 24,
    marginRight: 8
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
