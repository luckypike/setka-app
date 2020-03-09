import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import {
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native'

import Index from './Index'
import League from './League'
import useI18n from '../I18n'

const Stack = createStackNavigator()

export default function Account () {
  const I18n = useI18n()
  const navigation = useNavigation()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Index"
        component={Index}
        options={{
          title: I18n.t('settings.title'),
          headerLargeTitle: true,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.header}>
              <Text style={styles.cancel}>
                {I18n.t('done')}
              </Text>
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen
        name="League" component={League}
        options={({ route }) => (
          {
            title: route.params.league.name,
            headerLargeTitle: true
          }
        )}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  header: {
    marginRight: 20
  },

  cancel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#0d7ffb'
  }
})
