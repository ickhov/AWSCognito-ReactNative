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

// Authentication
import Login from './pages/auth/login';
import SignUp from './pages/auth/signup';
import EmailConfirmation from './pages/auth/emailconfirmation';
import ForgotPassword from './pages/auth/forgotpassword';
import ResetPassword from './pages/auth/resetpassword';

// App
import Feed from './pages/app/feed';
import Profile from './pages/app/profile';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login" headerMode='none'>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="EmailConfirmation" component={EmailConfirmation} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
}

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Feed" headerMode='none'>
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Auth" headerMode='none'>
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Profile/>
      </NavigationContainer>
    </>
  );
};

export default App;
