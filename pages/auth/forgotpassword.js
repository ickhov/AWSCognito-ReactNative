/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { 
    StatusBar, 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableHighlight, 
    View 
} from 'react-native';
import Colors from '../../assets/colors';
import Fonts from '../../assets/fonts';


export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <View style={styles.container}>
          <StatusBar 
            backgroundColor="#ffa24e" 
            barStyle="light-content"/>

          <Text style={styles.title}>What's your email?</Text>

          <TextInput 
            style={styles.input}
            placeholder='Email Address'/>

          <TouchableHighlight 
            style={styles.btn} 
            activeOpacity={0.5}
            underlayColor={Colors.lightdark}
            onPress={() => this.props.navigation.navigate('ResetPassword')}>
            <Text style={styles.btnTextWhite}>Recover my password</Text>
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