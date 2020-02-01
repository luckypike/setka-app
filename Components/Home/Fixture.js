import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Text
} from 'react-native'

import Score from './Fixture/Score'
import Details from './Fixture/Details'
import Current from '../Current'

Fixture.propTypes = {
  fixture: PropTypes.object
}

export default function Fixture ({ fixture }) {
  const { myTeams } = useContext(Current)
  const myTeamIds = [...myTeams].filter(ob => ob[1]).map(ob => ob[0])

  const [active, setActive] = useState(false)

  const hasActive = () => {
    return (fixture.local_team.standing && fixture.visitor_team.standing) || fixture.events.length > 0
  }

  const myTeam = team => myTeamIds.includes(team.id)

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setActive(!active)}
        style={[
          styles.container,
          ((fixture.score && !fixture.end && fixture.minute >= 0) ? styles.live : styles.nolive)
        ]}
      >
        <View style={[styles.team, styles.local]}>
          <Text
            style={[styles.name, myTeam(fixture.local_team) ? styles.myTeam : styles.notMyTeam]}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {fixture.local_team.name}
          </Text>
          <Image style={styles.logo} source={{ uri: fixture.local_team.logo }} resizeMode="contain" />
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
          <Image style={styles.logo} source={{ uri: fixture.visitor_team.logo }} resizeMode="contain" />
          <Text
            style={[styles.name, myTeam(fixture.visitor_team) ? styles.myTeam : styles.notMyTeam]}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {fixture.visitor_team.name}
          </Text>
        </View>
      </TouchableOpacity>

      {active && hasActive() &&
        <Details
          fixture={fixture}
        />
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 4,
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
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1
  },

  myTeam: {
    fontWeight: 'bold'
  },

  name: {
    paddingHorizontal: 8
  },

  logo: {
    width: 20,
    height: 20
  }
})
