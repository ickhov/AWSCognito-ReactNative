/**
 * Sign up page
 *
 * @format
 * @flow strict-local
 */

 // init AWS Cognito
import Amplify, { Auth } from 'aws-amplify';
import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import Colors from '../../assets/colors';
import Fonts from '../../assets/fonts';
import awsConfig from '../../src/aws-exports';
import PopUpDialog from '../components/popUpDialog';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

Amplify.configure({Auth: awsConfig});

// aws cognito requires password to be at least 8 characters
// and contains lowercase and uppercase letters, and a number
const passwordRequirement = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])\S{8,99}$/

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

  // sign up the user using email and password
  signUpUser = () => {
    Keyboard.dismiss();
    // check to make sure email and pasword are filled in
    if (this.state.email != '' && this.state.password != '') {
      if (passwordRequirement.test(this.state.password)) {
        Auth.signUp({
          username: this.state.email,
          password: this.state.password,
          attributes: {
            email: this.state.email
          }
        })
          .then(() => { this.props.navigation.navigate('EmailConfirmation', { 
            email: this.state.email 
          })})
          .catch(err => { this.setState({ 
            emailBorderColor: Colors.white,
            passwordBorderColor: Colors.white,
            errorMessage: err.message,
            showAlert: true
          }) })
      } else {
        this.setState({
          emailBorderColor: Colors.white,
          passwordBorderColor: Colors.error,
          errorMessage: 'Password must be at least 8 characters and have an uppercase letter, a lowercase letter, and a number.',
          showAlert: true
        })
      }
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
            autoCapitalize='none'
            returnKeyType='done'/>

          <TextInput 
            style={[styles.input, {
              borderColor: this.state.passwordBorderColor
            }]}
            placeholder='Password'
            secureTextEntry
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            returnKeyType='done'
            blurOnSubmit={false}/>

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
      </TouchableWithoutFeedback>
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