import React from 'react'

import {
  StyleSheet,
  View
} from 'react-native'

import League from './League'

export default function Fixtures ({ fixtures }) {
  return (
    <View style={styles.container}>
      {fixtures.map(league =>
        <League {...league} key={league.id} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 16
  }
})
