import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Index from './Index'
import Account from './Account'

export default createAppContainer(
  createSwitchNavigator(
    {
      Index,
      Account
    },
    {
      initialRouteName: 'Index'
    }
  )
)
