/* global fetch:false */
import React, {Component} from 'react';
import {
  ScrollView,
  TextInput,
  View,
  Button,
  AsyncStorage,
  ActivityIndicator,
  Text,
  StyleSheet,
  ImageBackground, Image,
} from 'react-native';

import {fonts, colors} from '../../styles';
import Environment from '../Environment';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: '',
      isLoggingIn: false,
    };
  }

  _userLogin = () => {
    this.setState({isLoggingIn: true, message: ''});

    const params = {
      userName: this.state.username,
      password: this.state.password,
      code: ''
    };

    let proceed = false;

    fetch(`${`${Environment.CLIENT_API}/web/api2/v1/auth/login`}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
      .then((response) => {
        if (response.status === 200) {
          proceed = true;
        } else (this.setState({message: `Error code: ${response.status}`}));
        return response.json()
      })
      .then((response) => {
        if (proceed) AsyncStorage.setItem('token', response.token);
      })
      .then(() => {
        this.setState({isLoggingIn: false});
        if (proceed) this.props.navigation.navigate({routeName: 'Projects'})
      })
  };

  clearUsername = () => {
    this._username.setNativeProps({text: ''});
  };

  clearPassword = () => {
    this._password.setNativeProps({text: ''});
  };

  render() {
    return (
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.container}
      >
        <Image
          source={require('../../../assets/images/RNS_nerd.png')}
          style={styles.nerdImage}
        />
        <ScrollView style={{padding: 20}}>
          <TextInput
            ref={component => this._username = component}
            placeholder='Username'
            onChangeText={(username) => this.setState({username})}
            autoFocus
            onFocus={this.clearUsername}
            style={styles.availableText}
          />
          <TextInput
            ref={component => this._password = component}
            placeholder='Password'
            onChangeText={(password) => this.setState({password})}
            secureTextEntry
            onFocus={this.clearPassword}
            onSubmitEditing={this._userLogin}
            style={styles.availableText}
          />
          {!!this.state.message && (
            <Text
              style={{fontSize: 14, color: 'red', padding: 5}}
            >
              {this.state.message}
            </Text>
          )}
          {this.state.isLoggingIn && <ActivityIndicator />}
          <View style={{margin: 7}} />
          <Button
            disabled={this.state.isLoggingIn || !this.state.username || !this.state.password}
            onPress={this._userLogin}
            title="Login"
            color="#FF1966"
            style={styles.button}
          />
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 50,
  },
  nerdImage: {
    width: 80,
    height: 80,
  },
  availableText: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
    fontSize: 20,
  },
  button: {
    alignSelf: 'stretch',
    marginTop: 20,
    marginBottom: 20,
  },
});
