if (__DEV__) {
  require('./environment')();
}
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import React from 'react';

import AppContainer from './container/App';

const store = createStore(reducer);

export default App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });

