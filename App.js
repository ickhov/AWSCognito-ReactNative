/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/auth/login';
import SignUp from './pages/auth/signup';
import EmailConfirmation from './pages/auth/emailconfirmation';
import ForgotPassword from './pages/auth/forgotpassword';
import ResetPassword from './pages/auth/resetpassword';
import Feed from './pages/app/feed';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login" headerMode='none'>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="EmailConfirmation" component={EmailConfirmation} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />

      <Stack.Screen name="Feed" component={Feed} />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <>
      <NavigationContainer>
        <AuthStack/>
      </NavigationContainer>
    </>
  );
};

export default App;
