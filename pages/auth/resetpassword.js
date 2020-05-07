/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Colors from '../../assets/colors'
import Fonts from '../../assets/fonts'

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StatusBar
} from 'react-native';

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <View style={styles.container}>
          <StatusBar 
            backgroundColor="#ffa24e" 
            barStyle="light-content"/>

          <Text style={styles.title}>Let's set a new password</Text>

          <TextInput 
            style={styles.input}
            placeholder='Reset Code'/>

          <TextInput 
            style={styles.input}
            placeholder='New Password'
            secureTextEntry/>

          <TouchableHighlight 
            style={styles.btn} 
            activeOpacity={0.5}
            underlayColor={Colors.lightdark}
            onPress={() => alert('Pressed!')}>
            <Text style={styles.btnTextWhite}>Done</Text>
          </TouchableHighlight>

      </View>
    );
  }
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
  btn: {
    backgroundColor: Colors.dark,
    padding: 16,
    width: "50%",
    borderRadius: 20,
    marginTop: 10
  },
  btnTextWhite: {
    fontFamily: Fonts.normal,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.white
  }
});