import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { Svg, Circle, Path } from 'react-native-svg'

import { TouchableOpacity, StyleSheet } from 'react-native'

import Index from './Index'
import League from './League'

import useI18n from '../I18n'
import Logo from '../Logo'

const Stack = createStackNavigator()

export default function Home () {
  const navigation = useNavigation()
  const I18n = useI18n()

  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        cardOverlayEnabled: true,
        ...TransitionPresets.ModalPresentationIOS
      }}
    >
      <Stack.Screen
        name="Index"
        component={Index}
        options={{
          headerTitle: () => <Logo />,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Account')} style={styles.header}>
              <Account />
            </TouchableOpacity>
          )
        }}
      />

      <Stack.Screen
        name="League"
        component={League}
        options={({ route }) => ({
          title: route.params.league.name,
          headerStatusBarHeight: 8,
          headerBackTitle: I18n.t('close')
        })}
      />
    </Stack.Navigator>
  )
}

function Account () {
  return (
    <Svg viewBox="0 0 32 32" width={28} height={28}>
      <Circle
        cx="16"
        cy="16"
        fill="none"
        r="4"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"/>
      <Path
        d="M27.758 10.366l-1-1.732a2 2 0 00-2.732-.732l-.526.304c-2 1.154-4.5-.289-4.5-2.598V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v.608c0 2.309-2.5 3.753-4.5 2.598l-.526-.304a2 2 0 00-2.732.732l-1 1.732a2 2 0 00.732 2.732l.526.304c2 1.155 2 4.041 0 5.196l-.526.304a2 2 0 00-.732 2.732l1 1.732a2 2 0 002.732.732l.526-.304c2-1.155 4.5.289 4.5 2.598V27a2 2 0 002 2h2a2 2 0 002-2v-.608c0-2.309 2.5-3.753 4.5-2.598l.526.304a2 2 0 002.732-.732l1-1.732a2 2 0 00-.732-2.732l-.526-.304c-2-1.155-2-4.041 0-5.196l.526-.304a1.999 1.999 0 00.732-2.732z"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2" />
    </Svg>
  )
}

const styles = StyleSheet.create({
  header: {
    marginRight: 20
  },

  done: {
    fontSize: 17,
    color: '#0d7ffb',
    fontWeight: '700'
  }
})
