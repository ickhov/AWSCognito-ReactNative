/**
 * Custom alert component
 * 
 * Properties that can be initialize:
 * showAlert: bool
 * title: string
 * message: string
 * showCancelButton: bool
 * showConfirmButton: bool
 * cancelText: string
 * confirmText: string
 * cancelButtonColor: string
 * confirmButtonColor: string
 * onCancelPressed: () => {}
 * onConfirmPressed: () => {}
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Colors from '../../assets/colors'
import Fonts from '../../assets/fonts'

import {
  StyleSheet,
  View
} from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';

export default class PopUpDialog extends Component {

  render() {
    return (
        <AwesomeAlert
            show={this.props.showAlert ?? false}
            showProgress={false}
            contentContainerStyle={styles.popUpContainer}
            titleStyle={styles.popUpTitle}
            messageStyle={styles.popUpText}
            cancelButtonTextStyle={styles.popUpBtnText}
            cancelButtonStyle={styles.popUpBtn}
            title={this.props.title ?? 'Default'}
            message={this.props.message ?? 'No message'}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={true}
            showCancelButton={this.props.showCancelButton ?? true}
            showConfirmButton={this.props.showConfirmButton ?? false}
            cancelText={this.props.cancelText ?? 'Cancel'}
            confirmText={this.props.confirmText ?? 'Confirm'}
            cancelButtonColor={this.props.cancelButtonColor ?? Colors.error}
            confirmButtonColor={this.props.confirmButtonColor ?? Colors.success}
            onCancelPressed={this.props.onCancelPressed}
            onConfirmPressed={this.props.onConfirmPressed}
        />
    );
  }
};

const styles = StyleSheet.create({
  popUpContainer: {
    borderRadius: 20
  },
  popUpTitle: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    textAlign: 'center',
    color: Colors.black
  },
  popUpText: {
    fontFamily: Fonts.normal,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.black
  },
  popUpBtn: {
    backgroundColor: Colors.error
  },
  popUpBtnText: {
    fontFamily: Fonts.normal,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.white
  }
});