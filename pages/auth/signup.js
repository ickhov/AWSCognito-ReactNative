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

import PopUpDialog from '../components/popUpDialog';

import Amplify, { Auth } from 'aws-amplify';
import awsConfig from '../../src/aws-exports';

Amplify.configure({Auth: awsConfig});

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      emailBorderColor: Colors.white,
      passwordBorderColor: Colors.white,
      showAlert: false
    };
    
    this.signUpUser = this.signUpUser.bind(this);
  };

  signUpUser = () => {
    if (this.state.email != '' && this.state.password != '') {
      Auth.signUp({
        username: this.state.email,
        password: this.state.password,
        attributes: {
          email: this.state.email
        }
      })
        .then(data => { this.props.navigation.navigate('EmailConfirmation', { 
          email: this.state.email 
        })})
        .catch(err => { this.setState({ 
          emailBorderColor: Colors.white,
          passwordBorderColor: Colors.white,
          errorMessage: err.message,
          showAlert: true
        }) })
    } else if (this.state.email == '' && this.state.password == '') {
      this.setState({
        emailBorderColor: Colors.error, 
        passwordBorderColor: Colors.error,
        errorMessage: 'Please enter an email and a password.',
        showAlert: true
      })
    } else if (this.state.email == '') {
      this.setState({
        emailBorderColor: Colors.error, 
        passwordBorderColor: Colors.white,
        errorMessage: 'Please enter your email.',
        showAlert: true
      })
    } else if (this.state.password == '') {
      this.setState({
        emailBorderColor: Colors.white,
        passwordBorderColor: Colors.error,
        errorMessage: 'Please enter your password.',
        showAlert: true
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <StatusBar 
            backgroundColor="#ffa24e" 
            barStyle="light-content"/>

          <Text style={styles.title}>Create a Nookeroo Account</Text>

          <TextInput 
            style={[styles.input, {
              borderColor: this.state.emailBorderColor
            }]}
            placeholder='Email Address'
            onChangeText={(email) => this.setState({email})}
            value={ this.state.email }
            keyboardType='email-address'
            autoCapitalize='none'/>

          <TextInput 
            style={[styles.input, {
              borderColor: this.state.passwordBorderColor
            }]}
            placeholder='Password'
            secureTextEntry
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}/>

          <TouchableHighlight 
            style={styles.btn} 
            activeOpacity={0.5}
            underlayColor={Colors.lightdark}
            onPress={this.signUpUser}>
            <Text style={styles.btnTextWhite}>Sign Up</Text>
          </TouchableHighlight>

          <TouchableOpacity
            style={styles.btnNoBackground} 
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.btnTextBlack}>Already have an account? Log In Here</Text>
          </TouchableOpacity>

          <PopUpDialog
            showAlert={this.state.showAlert}
            title='Something went wrong!'
            message={this.state.errorMessage}
            cancelText='Dismiss'
            onCancelPressed={() => {
              this.setState({ showAlert: false })
            }}
          />
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
    padding: 13,
    marginBottom: 8,
    borderRadius: 20,
    borderWidth: 4
  },
  btn: {
    backgroundColor: Colors.dark,
    padding: 16,
    width: "50%",
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10
  },
  btnNoBackground: {
    backgroundColor: Colors.none,
    padding: 8,
    width: "90%"
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
  }
});