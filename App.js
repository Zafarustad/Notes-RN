import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './Reducers/store';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './Routes/Routes';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <StatusBar backgroundColor="#2f89fc" />
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
