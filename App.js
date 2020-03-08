import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import { enableScreens } from 'react-native-screens'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as RNLocalize from 'react-native-localize'
import I18n from 'i18n-js'
import axios from 'axios'
import dayjs from 'dayjs'

import Home from './Components/Home/Home'
import Account from './Components/Account/Account'
import Current from './Components/Current'

import { API_URL } from 'react-native-dotenv'

const leaguesKey = '@Setka:leaguesKey'
const teamsKey = '@Setka:teamsKey'

enableScreens()

I18n.pluralization.ru = function (count) {
  var key = count % 10 === 1 && count % 100 !== 11 ? 'one' : [2, 3, 4].indexOf(count % 10) >= 0 && [12, 13, 14].indexOf(count % 100) < 0 ? 'few' : count % 10 === 0 || [5, 6, 7, 8, 9].indexOf(count % 10) >= 0 || [11, 12, 13, 14].indexOf(count % 100) >= 0 ? 'many' : 'other'
  if (count < 1) key = 'zero'
  return [key]
}

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

    // I18n.default_locale = 'en'

    const {
      languageTag
    } = RNLocalize.findBestAvailableLanguage(['en', 'ru'])

    const locales = {
      en: () => require('./locales/en.json'),
      ru: () => require('./locales/ru.json')
    }

    if (languageTag) I18n.locale = languageTag
    I18n.translations = { [I18n.locale]: locales[I18n.locale]() }
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
        setMyTeams,
        I18n
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
