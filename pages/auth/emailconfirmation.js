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

import Amplify, { Auth } from 'aws-amplify';
import awsConfig from '../../src/aws-exports';

Amplify.configure({Auth: awsConfig});

export default class EmailConfirmation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: this.props.route.params.email,
      confirmationCode: '',
      errorMessage: ''
    };
    
    this.confirmUser = this.confirmUser.bind(this);
    this.resendCode = this.resendCode.bind(this);
  };

  confirmUser = () => {
    if (this.state.email != '' && this.state.confirmationCode != '') {
      Auth.confirmSignUp(this.state.email, this.state.confirmationCode)
        .then(() => { this.props.navigation.navigate('Feed') })
        .catch(err => { this.setState({ errorMessage: err.message }) })
    } else if (this.state.email == '' && this.state.confirmationCode == '') {
      this.setState({errorMessage: 'Please enter your email and confirmation code'})
    } else if (this.state.email == '') {
      this.setState({errorMessage: 'Please enter your email'})
    } else {
      this.setState({errorMessage: 'Please enter the confirmation code'})
    }
  }

  resendCode = () => {
    Auth.resendSignUp(this.state.email)
      .catch(err => { this.setState({ errorMessage: err.message }) })
  }

  render() {
    return (
      <View style={styles.container}>
          <StatusBar 
            backgroundColor="#ffa24e" 
            barStyle="light-content"/>

          <Text style={styles.title}>Please confirm your email</Text>

          <TextInput 
            style={styles.input}
            placeholder='Email Address'
            onChangeText={(email) => this.setState({email})}
            value={ this.state.email }
            keyboardType='email-address'
            autoCapitalize='none'/>

          <TextInput 
            style={styles.input}
            placeholder='Confirmation Code'
            onChangeText={(confirmationCode) => this.setState({confirmationCode})}
            value={ this.state.confirmationCode }
            keyboardType='numeric'/>

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
              onPress={this.confirmUser}>
              <Text style={styles.btnTextWhite}>Continue</Text>
            </TouchableHighlight>
          </View>

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
  btnTextWhite: {
    fontFamily: Fonts.normal,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.white
  },
  errorText: {
    fontFamily: Fonts.normal,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.error
  }
});