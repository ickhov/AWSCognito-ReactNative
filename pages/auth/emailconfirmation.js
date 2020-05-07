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
  TouchableOpacity,
  TouchableHighlight,
  StatusBar
} from 'react-native';

export default class EmailConfirmation extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <View style={styles.container}>
          <StatusBar 
            backgroundColor="#ffa24e" 
            barStyle="light-content"/>

          <Text style={styles.title}>Please confirm your email</Text>

          <TextInput 
            style={styles.input}
            placeholder='Email Address'/>

          <TextInput 
            style={styles.input}
            placeholder='Confirmation Code'
            keyboardType='number-pad'/>

          <TouchableHighlight 
            style={styles.btn} 
            activeOpacity={0.5}
            underlayColor={Colors.lightdark}
            onPress={() => alert('Pressed!')}>
            <Text style={styles.btnTextWhite}>Continue</Text>
          </TouchableHighlight>

          <TouchableHighlight 
            style={styles.btn} 
            activeOpacity={0.5}
            underlayColor={Colors.lightdark}
            onPress={() => alert('Pressed!')}>
            <Text style={styles.btnTextWhite}>Resend the code</Text>
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