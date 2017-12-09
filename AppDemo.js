import React, { Component } from 'react';
import {
    View,
    AsyncStorage,
    Text
} from 'react-native';
import LoginScreen from './app/screens/LoginScreen';
import HomeScreen from './app/screens/HomeScreen';
import {HomeStack,RootTabs} from './app/config/routes';

export default class AppDemo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token:null,
            isLogged: false
        }
    }
    componentDidMount() {
        console.log("component did mount");
        this.getToken();
    }
    RedirectToHomeScreen=(access_token)=>{
        console.log(access_token);
        this.setState({isLogged:true,token:access_token});
    }
    getToken() {
        try {
            AsyncStorage.getItem('@token:key').then((access_token) => {
                
                if (access_token !== null) {
                    console.log(access_token);
                    console.log("token got");
                   this.RedirectToHomeScreen(access_token);
                }
            });
        } catch (error) {
            console.log("cannot get token");
        }
    }

    render() {
        return (
                !this.state.isLogged ?<LoginScreen RedirectToHomeScreenProp={this.RedirectToHomeScreen}/> : <RootTabs/>
        );
    }
}

