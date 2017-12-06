import React, { Component } from 'react';
import {
  Button,
  View,
  Linking,
  Alert,
  Text
} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state={devives:""}
  }
  _onPressButton () {
    let that=this;
    var challenge = "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM"
    let url = `https://accounts.artik.cloud/authorize?prompt=login&client_id=0c2cefcfe2f245f58e053c31fa2241cb&response_type=code&code_challenge=${challenge}&code_challenge_method=S256&redirect_uri=cloud.artik.example.hellocloud://oauth2callback&state=abcdefgh`
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
      console.log(code);
      var urlGetToken = `https://accounts.artik.cloud/token?grant_type=${dkm.grant_type}&code=${dkm.code}&redirect_uri=${dkm.redirect_uri}&state=${dkm.state}&code_verifier=${dkm.code_verifier}&client_id=${dkm.client_id}`;
      fetch(urlGetToken, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(responseJson => {
          that.getUserInfo(responseJson._bodyInit.access_token);
        })
        .catch(error => {
          console.error(error);
        });
    });
  }
  getUserInfo(token){
    let that=this;
    let url=`api.artik.cloud/v1.1/users/self`
    fetch(urlGetToken, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(responseJson => {
        that.getDevices(responseJson.data.id,token)
      })
      .catch(error => {
        console.error(error);
      });
  }
  getDevices(token,token){
    let that=this;
    let url=`https://api.artik.cloud/v1.1/users/${userId}/devices?count=100&includeProperties=false&includeShareInfo=false`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(responseJson => {
        that.setState({devives:responseJson})
      })
      .catch(error => {
        console.error(error);
      });
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
        <Text>{this.state.devives}</Text>
      </View>
    );
  }
}

