import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import axios from 'axios'

import Navigator from './Components/Navigator'
import Current from './Components/Current'

import { API_URL } from 'react-native-dotenv'

const settingsKey = '@Setka:settingsKey'

export default function App () {
  const [settings, setSettings] = useState()

  useEffect(() => {
    const _getSettings = async () => {
      // await AsyncStorage.removeItem(settingsKey)
      const value = await AsyncStorage.getItem(settingsKey)
      const storedSettings = JSON.parse(value)

      setSettings(storedSettings)
    }

    _getSettings()
  }, [])

  useEffect(() => {
    const _push = async () => {
      await axios.patch(API_URL + '/device', {
        device: {
          token,
          league_ids: Object.entries(settings).filter(ob => ob[1]).map(ob => parseInt(ob[0], 10))
        }
      })
    }

    if (settings) {
      AsyncStorage.setItem(settingsKey, JSON.stringify(settings))
      if (token) _push()
    }
  }, [settings])

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

  if (settings === undefined) return null

  return (
    <Current.Provider value={{ settings, setSettings }}>
      <Navigator />
    </Current.Provider>
  )
}
