import React, { useContext } from 'react'
import { useRoute } from '@react-navigation/native'
// import PropTypes from 'prop-types'

import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Switch,
  View
} from 'react-native'

import Current from '../Current'
import useI18n from '../I18n'

export default function League () {
  const I18n = useI18n()
  const route = useRoute()
  const { league } = route.params

  const { myTeams, setMyTeams } = useContext(Current)
  const { myLeagues, setMyLeagues } = useContext(Current)

  const handleTeamPress = id => {
    const newMyTeams = new Map(myTeams)
    newMyTeams.set(id, !myTeams.get(id))

    setMyTeams(newMyTeams)
  }

  const handleLeaguePress = value => {
    const newMyLeagues = new Map(myLeagues)
    newMyLeagues.set(league.id, value)

    setMyLeagues(newMyLeagues)
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.league}>
          <View style={styles.leagueText}>
            <Text>
              {I18n.t('settings.league.show')}
            </Text>
          </View>

          <View style={styles.leagueSwitch}>
            <Switch
              value={!!myLeagues.get(league.id)}
              onValueChange={handleLeaguePress}
            />
          </View>
        </View>

        <Text style={styles.desc}>
          {I18n.t('settings.league.desc')}
        </Text>

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
                  <Text style={styles.inMyTeamsSign}>
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

  league: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginTop: 32,
    marginBottom: 16,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8
  },

  leagueName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 16
  },

  desc: {
    marginBottom: 32
  },

  leagueText: {
    paddingRight: 16,
    flexBasis: '80%'
  },

  leagueSwitch: {
    // backgroundColor: 'green',
    flexShrink: 0,
    flexBasis: 60,
    marginLeft: 'auto'
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
  },

  inMyTeamsSign: {
    fontWeight: '700'
  }
})
