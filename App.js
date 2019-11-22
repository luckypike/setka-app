import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import axios from 'axios'
import dayjs from 'dayjs'

import Navigator from './Components/Navigator'
import Current from './Components/Current'

import { API_URL } from 'react-native-dotenv'

// const settingsKey = '@Setka:settingsKey'
const leaguesKey = '@Setka:leaguesKey'
const teamsKey = '@Setka:teamsKey'

export default function App () {
  // const [settings, setSettings] = useState()
  const [myLeagues, setMyLeagues] = useState()
  const [myTeams, setMyTeams] = useState()

  useEffect(() => {
    const _getSettings = async () => {
      // const prevLeagues = JSON.parse(await AsyncStorage.getItem(settingsKey))
      // await AsyncStorage.removeItem(settingsKey)
      // console.log(await AsyncStorage.getItem(leaguesKey))
      // await AsyncStorage.removeItem(leaguesKey)
      const leagues = new Map(
        JSON.parse(
          await AsyncStorage.getItem(leaguesKey)
        ) || [
          [524, true], [754, true], [530, true], [754, true], [403, true]
        ]
      )

      const teams = new Map(
        JSON.parse(
          await AsyncStorage.getItem(teamsKey)
        )
      )

      // console.log(leagues)

      // if (leagues.size === 0 && prevLeagues) {
      //   leagues = new Map(Object.entries(prevLeagues))
      // }
      //
      // console.log(leagues)

      // const value = await AsyncStorage.getItem(settingsKey)
      // const storedSettings = JSON.parse(value)

      // console.log(storedSettings)

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

  return (
    <Current.Provider
      value={{
        myLeagues,
        setMyLeagues,
        myTeams,
        setMyTeams
      }}
    >
      <Navigator />
    </Current.Provider>
  )
}
