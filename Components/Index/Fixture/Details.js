import React from 'react'
import PropTypes from 'prop-types'

import {
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native'

Details.propTypes = {
  fixture: PropTypes.object
}

export default function Details ({ fixture }) {
  return (
    <View style={styles.root}>
      {fixture.local_team.standing && fixture.visitor_team.standing &&
        <View style={styles.row}>
          <View style={styles.data}>
            <View style={[styles.standing, styles.local]}>
              <Text style={styles.points}>
                {fixture.local_team.standing.points} очк.
              </Text>

              <Text style={styles.rank}>
                {fixture.local_team.standing.rank}
              </Text>
            </View>
          </View>
          <Text style={styles.what}>
            Позиция
          </Text>
          <View style={styles.data}>
            <View style={styles.standing}>
              <Text style={styles.rank}>
                {fixture.visitor_team.standing.rank}
              </Text>

              <Text style={styles.points}>
                {fixture.visitor_team.standing.points} очк.
              </Text>
            </View>
          </View>
        </View>
      }

      {fixture.events.length > 0 &&
        <View style={styles.events}>
          {fixture.events.map(event =>
            <View key={event.id} style={styles.row}>
              <View style={styles.data}>
                {event.team_local &&
                  <>
                    {event.type === 'goal' &&
                      <Image
                        style={styles.goal}
                        source={require('./ball.png')}
                      />
                    }

                    {event.type === 'card' &&
                      <View
                        style={event.detail.toLowerCase() === 'yellow card' ? styles.cardYellow : styles.cardRed }
                      />
                    }

                    <Text style={styles.local}>
                      {event.player}
                    </Text>
                  </>
                }
              </View>

              <Text style={styles.minute}>
                {event.minute}{'\''}
              </Text>

              <View style={styles.data}>
                {event.team_visitor &&
                  <>
                    {event.type === 'goal' &&
                      <Image
                        style={[styles.goal, styles.goalVisitor]}
                        source={require('./ball.png')}
                      />
                    }

                    {event.type === 'card' &&
                      <View
                        style={[
                          event.detail.toLowerCase() === 'yellow card' ? styles.cardYellow : styles.cardRed,
                          styles.cardVisitor
                        ]}
                      />
                    }

                    <Text>
                      {event.player}
                    </Text>
                  </>
                }
              </View>
            </View>
          )}
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#ffffff',
    marginBottom: 8
  },

  row: {
    flexDirection: 'row',
    marginBottom: 8
  },

  what: {
    flexBasis: 120,
    fontSize: 12,
    textAlign: 'center'
  },

  minute: {
    flexBasis: 80,
    fontSize: 10,
    textAlign: 'center'
  },

  local: {
    textAlign: 'right',
    justifyContent: 'flex-end'
  },

  points: {
    fontSize: 11,
    color: '#777',
    marginHorizontal: 12
    // marginLeft: 'auto'
  },

  rank: {
    fontWeight: 'bold'
  },

  standing: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  goal: {
    position: 'absolute',
    width: 12,
    height: 12,
    marginTop: -6,
    marginRight: -22,
    right: 0,
    top: '50%'
  },

  cardYellow: {
    position: 'absolute',
    backgroundColor: '#ffcb00',
    width: 8,
    height: 12,
    marginTop: -6,
    marginRight: -20,
    right: 0,
    top: '50%'
  },

  cardRed: {
    position: 'absolute',
    backgroundColor: 'red',
    width: 8,
    height: 12,
    marginTop: -6,
    marginRight: -20,
    right: 0,
    top: '50%'
  },

  cardVisitor: {
    right: 'auto',
    left: 0,
    marginLeft: -20,
    marginRight: 0
  },

  goalVisitor: {
    right: 'auto',
    left: 0,
    marginLeft: -22,
    marginRight: 0
  },

  data: {
    position: 'relative',
    // backgroundColor: 'red',
    flex: 1
  }
})
