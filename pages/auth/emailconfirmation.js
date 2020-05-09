/**
 * Email Confirmation Page
 */

import React, { Component } from 'react';
import Colors from '../../assets/colors';
import Fonts from '../../assets/fonts';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StatusBar
} from 'react-native';

import PopUpDialog from '../components/popUpDialog';

import Amplify, { Auth } from 'aws-amplify';
import awsConfig from '../../src/aws-exports';

Amplify.configure({Auth: awsConfig});

export default class EmailConfirmation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // grab the email from the sign up page
      email: this.props.route.params.email,
      confirmationCode: '',
      errorMessage: '',
      popUpTitle: '',
      emailBorderColor: Colors.white,
      confirmationCodeBorderColor: Colors.white,
      showAlert: false
    };
    
    this.confirmUser = this.confirmUser.bind(this);
    this.resendCode = this.resendCode.bind(this);
  };

  confirmUser = () => {
    Keyboard.dismiss();

    if (this.state.email != '' && this.state.confirmationCode != '') {
      Auth.confirmSignUp(this.state.email, this.state.confirmationCode)
        .then(() => { this.props.navigation.navigate('Feed') })
        .catch(err => { this.setState({ 
          emailBorderColor: Colors.white,
          confirmationCodeBorderColor: Colors.white,
          errorMessage: err.message,
          popUpTitle: 'Something went wrong!',
          showAlert: true
        }) })
    } else if (this.state.email == '' && this.state.confirmationCode == '') {
      this.setState({
        emailBorderColor: Colors.error, 
        confirmationCodeBorderColor: Colors.error,
        errorMessage: 'Please enter your email and confirmation code.',
        popUpTitle: 'Something went wrong!',
        showAlert: true
      })
    } else if (this.state.email == '') {
      this.setState({
        emailBorderColor: Colors.error, 
        confirmationCodeBorderColor: Colors.white,
        errorMessage: 'Please enter your email.',
        popUpTitle: 'Something went wrong!',
        showAlert: true
      })
    } else if (this.state.confirmationCode == '') {
      this.setState({
        emailBorderColor: Colors.white,
        confirmationCodeBorderColor: Colors.error,
        errorMessage: 'Please enter your confirmation code.',
        popUpTitle: 'Something went wrong!',
        showAlert: true
      })
    }
  }

  resendCode = () => {
    Keyboard.dismiss();
    
    Auth.resendSignUp(this.state.email)
      .then(() => this.setState({ 
        errorMessage: 'Your new confirmation code has been sent.',
        popUpTitle: 'Success',
        showAlert: true
      }))
      .catch(err => { this.setState({ 
        emailBorderColor: Colors.white,
        confirmationCodeBorderColor: Colors.white,
        errorMessage: err.message,
        showAlert: true
      }) })
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
          <StatusBar 
            backgroundColor="#ffa24e" 
            barStyle="light-content"/>

          <Text style={styles.title}>Please confirm your email</Text>

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
              borderColor: this.state.confirmationCodeBorderColor
            }]}
            placeholder='Confirmation Code'
            onChangeText={(confirmationCode) => this.setState({confirmationCode})}
            value={ this.state.confirmationCode }
            keyboardType='numeric'
            returnKeyType='done'/>

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

          <PopUpDialog
            showAlert={this.state.showAlert}
            title={this.state.popUpTitle}
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
  }
});