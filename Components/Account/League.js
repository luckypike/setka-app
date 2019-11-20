import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'

import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  View
} from 'react-native'

import Current from '../Current'

League.propTypes = {
  navigation: PropTypes.object
}

League.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title')
})

export default function League ({ navigation }) {
  const league = navigation.getParam('league')

  const { myTeams, setMyTeams } = useContext(Current)

  useEffect(() => {
    navigation.setParams({ title: league.name })
  }, [league])

  const handleTeamPress = id => {
    const newMyTeams = new Map(myTeams)
    newMyTeams.set(id, !myTeams.get(id))

    setMyTeams(newMyTeams)
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.teams}>
          {league.teams.map((team, i) =>
            <TouchableOpacity
              onPress={() => handleTeamPress(team.id)}
              style={[styles.team, i === 0 ? styles.firstTeam : styles.noFirstTeam]}
              key={team.id}
            >
              {team.logo &&
                <Image
                  style={styles.logo}
                  source={{ uri: team.logo }}
                  resizeMode="contain"
                />
              }

              <Text>
                {team.name}
              </Text>

              {!!myTeams.get(team.id) &&
                <View style={styles.inMyTeams}>
                  <Text>
                    +
                  </Text>
                </View>
              }
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4'
  },

  scroll: {
    padding: 16
  },

  teams: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 32
  },

  team: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8
  },

  noFirstTeam: {
    borderTopColor: '#ddd',
    borderTopWidth: 0.5
  },

  logo: {
    width: 24,
    height: 24,
    marginRight: 8
  },

  inMyTeams: {
    marginLeft: 'auto'
  }
})
