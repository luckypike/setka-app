import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Index from './Index'
import League from './League'

export default createAppContainer(
  createStackNavigator({
    AccountIndex: Index,
    AccountLeague: League
  }, {
    initialRouteName: 'AccountIndex',
    defaultNavigationOptions: {
      headerStyle: {
        // backgroundColor: '#fff',
        // borderBottomWidth: 0
      },
      headerTruncatedBackTitle: 'Назад'
    }
  })
)
