import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text
} from 'react-native'

export default function App () {
  return (
    <SafeAreaView>
      <View>
        <Text style={styles.text}>SETKA</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {
    color: 'red'
  }
})
