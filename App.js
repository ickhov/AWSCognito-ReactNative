/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Login from './pages/auth/login';
import SignUp from './pages/auth/signup';
import EmailConfirmation from './pages/auth/emailconfirmation';
import ForgotPassword from './pages/auth/forgotpassword';
import ResetPassword from './pages/auth/resetpassword';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
//import { createStackNavigator } from 'react-navigation-stack';

//const Stack = createStackNavigator();

const AuthStack = createSwitchNavigator(
  { 
    Login: Login, 
    SignUp: SignUp, 
    EmailConfirmation: EmailConfirmation 
  }
);

const MainNavigator = createAppContainer(createSwitchNavigator(
  {
    //AuthLoading: AuthLoadingScreen,
    //App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  }
));

const App = () => {
  return (
    <>
      <MainNavigator/>
    </>
  );
};

export default App;
