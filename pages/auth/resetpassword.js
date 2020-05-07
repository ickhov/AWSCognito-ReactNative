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
  TouchableOpacity,
  StatusBar
} from 'react-native';

import Amplify, { Auth } from 'aws-amplify';
import awsConfig from '../../src/aws-exports';

Amplify.configure({Auth: awsConfig});

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: this.props.route.params.email,
      resetCode: '',
      newPassword: '',
      errorMessage: ''
    };
    
    this.resetPassword = this.resetPassword.bind(this);
    this.resendCode = this.resendCode.bind(this);
  };

  resetPassword = () => {
    Auth.forgotPasswordSubmit(this.state.email, this.state.resetCode, this.state.newPassword)
      .then(() => this.props.navigation.navigate('Login'))
      .catch(err => { this.setState({ errorMessage: err.message }) })
  }

  resendCode = () => {
    Auth.forgotPassword(this.state.email)
      .catch(err => { this.setState({ errorMessage: err.message }) })
  }

  render() {
    return (
      <View style={styles.container}>
          <StatusBar 
            backgroundColor="#ffa24e" 
            barStyle="light-content"/>

          <Text style={styles.title}>Let's set a new password</Text>

          <TextInput 
            style={styles.input}
            placeholder='Reset Code'
            onChangeText={(resetCode) => this.setState({resetCode})}
            value={ this.state.resetCode }
            keyboardType='numeric'/>

          <TextInput 
            style={styles.input}
            placeholder='Password'
            secureTextEntry
            onChangeText={(newPassword) => this.setState({newPassword})}
            value={this.state.newPassword}/>

          <Text style={styles.errorText}>
            {this.state.errorMessage}
          </Text>

          <View style={styles.btnContainer}>
            <TouchableHighlight 
              style={styles.btn} 
              activeOpacity={0.5}
              underlayColor={Colors.lightdark}
              onPress={this.resendCode}>
              <Text style={styles.btnTextWhite}>Resend Code</Text>
            </TouchableHighlight>

            <TouchableHighlight 
              style={styles.btn} 
              activeOpacity={0.5}
              underlayColor={Colors.lightdark}
              onPress={this.resetPassword}>
              <Text style={styles.btnTextWhite}>Reset Password</Text>
            </TouchableHighlight>
          </View>

          <TouchableOpacity
            style={styles.btnNoBackground} 
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.btnTextBlack}>Back to Login</Text>
          </TouchableOpacity>

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
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%'
  },
  btn: {
    backgroundColor: Colors.dark,
    padding: 16,
    width: "45%",
    borderRadius: 20,
    marginTop: 10
  },
  btnNoBackground: {
    backgroundColor: Colors.none,
    padding: 8,
    width: "45%",
    marginTop: 10
  },
  btnTextWhite: {
    fontFamily: Fonts.normal,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.white
  },
  btnTextBlack: {
    fontFamily: Fonts.normal,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.black,
    textDecorationLine: 'underline'
  },
  errorText: {
    fontFamily: Fonts.normal,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.error
  }
});