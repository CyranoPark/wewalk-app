import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import React from 'react';

import AppContainer from './container/App';

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

export default App;
