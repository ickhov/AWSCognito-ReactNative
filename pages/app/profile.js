/**
 * Profile page
 *
 * @format
 * @flow strict-local
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
  TouchableOpacity,
  TouchableHighlight,
  StatusBar
} from 'react-native';

import PopUpDialog from '../components/popUpDialog';

// init AWS Cognito
import Amplify, { Auth } from 'aws-amplify';
import awsConfig from '../../src/aws-exports';

Amplify.configure({Auth: awsConfig});

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      islandName: '',
      profilePicture: '',
      emailBorderColor: Colors.white,
      nameBorderColor: Colors.white,
      islandNameBorderColor: Colors.white,
      showAlert: false
    };
    
    this.saveData = this.saveData.bind(this);
  };

  // siave user profile data
  saveData = () => {
    Keyboard.dismiss();
    
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
          <StatusBar 
            backgroundColor="#ffa24e" 
            barStyle="light-content"/>

          <Text style={styles.title}>Your Nookeroo Profile</Text>

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
              borderColor: this.state.nameBorderColor
            }]}
            placeholder='Character Name'
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            keyboardType='default'
            returnKeyType='done'/>

        <TextInput 
            style={[styles.input, {
              borderColor: this.state.islandNameBorderColor
            }]}
            placeholder='Island Name'
            onChangeText={(islandName) => this.setState({islandName})}
            value={this.state.islandName}
            keyboardType='default'
            returnKeyType='done'/>

          <View style={styles.btnContainer}>
            <TouchableHighlight 
              style={styles.btn} 
              activeOpacity={0.5}
              underlayColor={Colors.lightdark}
              onPress={() => alert("Hello")}>
              <Text style={styles.btnTextWhite}>Cancel</Text>
            </TouchableHighlight>

            <TouchableHighlight 
              style={styles.btn} 
              activeOpacity={0.5}
              underlayColor={Colors.lightdark}
              onPress={() => alert("Hello")}>
              <Text style={styles.btnTextWhite}>Update</Text>
            </TouchableHighlight>
          </View>

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