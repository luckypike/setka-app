import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native'

import Index from './Index'
import League from './League'

const Stack = createNativeStackNavigator()

export default function Account () {
  const navigation = useNavigation()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Index"
        component={Index}
        options={{
          title: 'Настройки',
          headerLargeTitle: true,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text style={styles.cancel}>
                Готово
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
  cancel: {
    fontSize: 17,
    fontWeight: '500',
    // marginHorizontal: 16,
    color: '#0d7ffb'
  }
})
