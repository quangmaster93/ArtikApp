import React, { Component } from 'react';
import Network from '../../api/Network'
import {
    Button,
    View,
    Text,
    Linking,
    AsyncStorage
} from 'react-native';

export default class LoginComponent extends Component {
    constructor(props) {
        super(props)
    }
    saveToken(access_token) {
        try {
            AsyncStorage.setItem('@token:key', access_token).then(() => {
                console.log("token is saved!");
            });

        } catch (error) {
            console.log("token is not saved!")
        }
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
            })
                .then(responseJson => {
                    let access_token = JSON.parse(responseJson._bodyInit).access_token;
                    that.saveToken(access_token);
                    Network.token = access_token;
                    that.props.RedirectToHomeScreenProp(access_token);
                })
                .catch(error => {
                    console.error(error);
                });
        });
    }
    saveToken(access_token) {
        try {
            AsyncStorage.setItem('@token:key', access_token).then(() => {
                console.log("token is saved!");
                Network.token = access_token;
            });

        } catch (error) {
            console.log("token is not saved!")
        }
    }
    render() {
        return (
            <View>
                <Button onPress={this._onPressButton}title="Login"/>
            </View>
        );
    }
}

