/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Login from './pages/login';
import SignUp from './pages/signup';
import EmailConfirmation from './pages/emailconfirmation';
//import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

// const AuthStack = createSwitchNavigator(
//   { 
//     Login: Login, 
//     SignUp: SignUp, 
//     ConfirmEmail: EmailConfirmation 
//   },
//   {
//     initialRouteName: 'Login',
//   }
// );

// const MainNavigator = createAppContainer(createSwitchNavigator(
//   {
//     //AuthLoading: AuthLoadingScreen,
//     //App: AppStack,
//     Auth: AuthStack,
//   },
//   {
//     initialRouteName: 'Auth',
//   }
// ));

const App = () => {
  return (
    <>
      <EmailConfirmation/>
    </>
  );
};

export default App;
