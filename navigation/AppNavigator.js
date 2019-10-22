import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

const RootNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Login: LoginScreen,
    Main: MainTabNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default createAppContainer(RootNavigator);
