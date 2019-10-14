import { connect } from 'react-redux';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

const AppNavigator = createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Login: LoginScreen,
    Main: MainTabNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  })
);

const mapStateToProps = state => {
  return state;
}

const mapDispatchToProps = dispatch => {
  return {};
}

export default ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(AppNavigator);

// const AppContainer = () => (
//   <Provider store={store}>
//     <ConnectedApp />
//   </Provider>
// );
