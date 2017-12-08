import React, { Component } from 'react';
import Network from './Network';
import {
  Button,
  View,
  Linking,
  Alert,
  Text,
  FlatList,
  Navigator
} from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { devices: [] }
  }
  _onPressButton = (e) => {
    let that = this;
    let challenge = "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM"
    let client_id = "0c2cefcfe2f245f58e053c31fa2241cb";
    let redirect_uri = "cloud.artik.example.hellocloud://oauth2callback";
    let state = "abcdefgh";
    let url = `https://accounts.artik.cloud/authorize?prompt=login&client_id=${client_id}&response_type=code&code_challenge=${challenge}&code_challenge_method=S256&redirect_uri=${redirect_uri}&state=${state}`
    Linking.openURL(url)
    Linking.addEventListener('url', (event) => {
      var code = event.url.split("code=")[1].split('&')[0];
      let dkm = {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "cloud.artik.example.hellocloud://oauth2callback",
        state: "abcdefgh",
        code_verifier: "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk",
        client_id: "0c2cefcfe2f245f58e053c31fa2241cb"
      };
      let urlGetToken = `https://accounts.artik.cloud/token?grant_type=${dkm.grant_type}&code=${dkm.code}&redirect_uri=${dkm.redirect_uri}&state=${dkm.state}&code_verifier=${dkm.code_verifier}&client_id=${dkm.client_id}`;
      fetch(urlGetToken, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(responseJson => {
        console.log("======");
        console.log(responseJson);
        let access_token = JSON.parse(responseJson._bodyInit).access_token;
        Network.token = access_token;
        console.log(`--------net token: ${Network.token}`)
        // that.getUserInfo(access_token);
        //that.getUserInfo();
        that.props.navigation.navigate('Devices');
      }).catch(error => {
        console.error(error);
      });
    });
  }

  getUserInfo() {
    let that = this;
    let url = `https://api.artik.cloud/v1.1/users/self`
    Network.get('/users/self', (responseJson) => {
      let userId = JSON.parse(responseJson._bodyInit).data.id;
      that.getDevices(userId)
    })
  }

  getDevices(userId) {
    let that = this;
    Network.get(`/users/${userId}/devices?count=100&includeProperties=false&includeShareInfo=false`, (responseJson) => {
      let devices = JSON.parse(responseJson._bodyInit).data.devices;
      that.setState({ devices: devices });
    })
  }

  render() {
    return (
      <View>
        <Button
          onPress={
            this._onPressButton
          }
          title="Login"
        />
        <Button
          onPress={
            this._onPressButton
          }
          title="Login"
        />
        <Button
          onPress={
            this._onPressButton
          }
          title="Login"
        />
        <FlatList data={this.state.devices} renderItem={({ item }) => <Text key={item.id}>{item.id}</Text>}>
        </FlatList>
      </View>
    );
  }

  componentDidMount(){
      console.log('componentDidMount login')
      console.log(this.props)
  }
}

