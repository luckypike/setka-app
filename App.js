import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import Navigator from './Components/Navigator'
import Current from './Components/Current'

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
    if (settings) AsyncStorage.setItem(settingsKey, JSON.stringify(settings))
  }, [settings])

  if (settings === undefined) return null

  return (
    <Current.Provider value={{ settings, setSettings }}>
      <Navigator />
    </Current.Provider>
  )
}
