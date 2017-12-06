import React, { Component } from 'react';
import {
  Button,
  View,
  Linking,
  Alert
} from 'react-native';

export default class App extends Component {
  _onPressButton() {
    var challenge = "ZmI4NzFmZjhjY2U4ZmVhODNkZmFlYWI0MTc4NDMwNWExNDYxZTAwOGRjMDJhMzcxZWQyNmQ4NTZj%0ANzY2YzkwMw%3D%3D"
    let url = `https://accounts.artik.cloud/authorize?prompt=login&client_id=0c2cefcfe2f245f58e053c31fa2241cb&response_type=code&code_challenge=${challenge}&code_challenge_method=S256&redirect_uri=cloud.artik.example.hellocloud://oauth2callback&state=abcdefgh`
    Linking.openURL(url)
    Linking.addEventListener('url', (event) => {
      var code = event.url.split("code=")[1].split('&')[0];
      let dkm = {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "cloud.artik.example.hellocloud://oauth2callback",
        state: "abcdefgh",
        code_verifier: "f1a2",
        client_id: "0c2cefcfe2f245f58e053c31fa2241cb"
      };
      console.log(code);
      fetch("https://accounts.artik.cloud/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic 33810faea6224a1fbfb711fd2220c03f"
        },
        body: JSON.stringify({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: "cloud.artik.example.hellocloud://oauth2callback",
          state: "abcdefgh",
          code_verifier: "f1a2",
          client_id: "0c2cefcfe2f245f58e053c31fa2241cb"
        })
      })
        // .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson)
          // return responseJson.movies;
        })
        .catch(error => {
          console.error(error);
        });
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
      </View>
    );
  }
}

