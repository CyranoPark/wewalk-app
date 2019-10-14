if (__DEV__) {
  require('./environment')();
}
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import React from 'react';

import AppNavigator from './navigation/AppNavigator';

const store = createStore(reducer);

export default App = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });

