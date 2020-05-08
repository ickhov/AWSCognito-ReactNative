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
    TouchableOpacity,
    View 
} from 'react-native';
import Colors from '../../assets/colors';
import Fonts from '../../assets/fonts';

import PopUpDialog from '../components/popUpDialog';

import Amplify, { Auth } from 'aws-amplify';
import awsConfig from '../../src/aws-exports';

Amplify.configure({Auth: awsConfig});

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errorMessage: '',
      emailBorderColor: Colors.white,
      showAlert: false
    };
    
    this.resetPassword = this.resetPassword.bind(this);
  };

  resetPassword = () => {
    if (this.state.email != '') {
      Auth.forgotPassword(this.state.email)
        .then(() => { this.props.navigation.navigate('ResetPassword', { 
          email: this.state.email 
        })})
        .catch(err => { this.setState({ 
          emailBorderColor: Colors.white,
          errorMessage: err.message,
          showAlert: true
        }) })
    } else {
      this.setState({
        emailBorderColor: Colors.error, 
        errorMessage: 'Please enter your email.',
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

          <Text style={styles.title}>What's your email?</Text>

          <TextInput 
            style={[styles.input, {
              borderColor: this.state.emailBorderColor
            }]}
            placeholder='Email Address'
            onChangeText={(email) => this.setState({email})}
            value={ this.state.email }
            keyboardType='email-address'
            autoCapitalize='none'/>

          <TouchableHighlight 
            style={styles.btn} 
            activeOpacity={0.5}
            underlayColor={Colors.lightdark}
            onPress={this.resetPassword}>
            <Text style={styles.btnTextWhite}>Recover my password</Text>
          </TouchableHighlight>

          <TouchableOpacity
            style={styles.btnNoBackground} 
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.btnTextBlack}>Back to Login</Text>
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