/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Colors from '../assets/colors'
import Fonts from '../assets/fonts'

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar
} from 'react-native';

const Auth = () => {
  return (
    <>
      <View style={styles.container}>
          <StatusBar 
            backgroundColor="#ffa24e" 
            barStyle="light-content"/>
          <Text style={styles.title}>Welcome to Nookeroo</Text>
          <TextInput 
            style={styles.input}
            placeholder='Email Address'/>
          <TextInput 
            style={styles.input}
            placeholder='Password'
            secureTextEntry/>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.primary
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 30,
    textAlign: 'center',
    margin: 16
  },
  input: {
    fontFamily: Fonts.normal,
    width: "90%",
    backgroundColor: Colors.white,
    padding: 16,
    marginBottom: 8,
    borderRadius: 20
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%'
  },
  btn: {
    backgroundColor: Colors.dark,
    padding: 16,
    width: "45%",
    borderRadius: 20
  },
  btnText: {
    fontFamily: Fonts.normal,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.white
  }
});

export default Auth;
