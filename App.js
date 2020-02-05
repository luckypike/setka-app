import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import { enableScreens } from 'react-native-screens'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import axios from 'axios'
import dayjs from 'dayjs'

import Home from './Components/Home/Home'
import Account from './Components/Account/Account'
import Current from './Components/Current'

import { API_URL } from 'react-native-dotenv'

const leaguesKey = '@Setka:leaguesKey'
const teamsKey = '@Setka:teamsKey'

enableScreens()

export default function App () {
  const [myLeagues, setMyLeagues] = useState()
  const [myTeams, setMyTeams] = useState()

  useEffect(() => {
    const _getSettings = async () => {
      const leagues = new Map(
        JSON.parse(
          await AsyncStorage.getItem(leaguesKey)
        ) || [
          [39, true], [1, true], [135, true], [235, true], [140, true], [78, true]
        ]
      )

      const teams = new Map(
        JSON.parse(
          await AsyncStorage.getItem(teamsKey)
        )
      )

      setMyLeagues(leagues)
      setMyTeams(teams)
    }

    _getSettings()
  }, [])

  useEffect(() => {
    if (myLeagues) {
      AsyncStorage.setItem(leaguesKey, JSON.stringify([...myLeagues]))
    }
  }, [myLeagues])

  useEffect(() => {
    const _push = async () => {
      await axios.patch(API_URL + '/device', {
        device: {
          timezone: dayjs().utcOffset(),
          token,
          team_ids: [...myTeams].filter(ob => ob[1]).map(ob => ob[0])
        }
      })
    }

    if (myTeams) {
      AsyncStorage.setItem(teamsKey, JSON.stringify([...myTeams]))
      if (token) _push()
    }
  }, [myTeams])

  const [token, setToken] = useState()

  useEffect(() => {
    PushNotificationIOS.addEventListener(
      'register',
      deviceToken => {
        setToken(deviceToken)
      }
    )

    PushNotificationIOS.addEventListener(
      'registrationError',
      _error => {
        // console.log(_error)
      }
    )

    PushNotificationIOS.addEventListener(
      'notification',
      _notification => {
        // console.log(_notification)
      }
    )

    PushNotificationIOS.requestPermissions()
  }, [])

  if (myLeagues === undefined) return null

  const Tab = createBottomTabNavigator()

  return (
    <Current.Provider
      value={{
        myLeagues,
        setMyLeagues,
        myTeams,
        setMyTeams
      }}
    >
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarVisible: false
          }}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Account" component={Account} />
        </Tab.Navigator>
      </NavigationContainer>
    </Current.Provider>
  )
}
