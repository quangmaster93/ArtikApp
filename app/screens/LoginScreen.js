import React, { Component } from 'react';
import LoginComponent from '../components/LoginComponent/LoginComponent'


export default class LoginScreen extends Component {
    render() {
        return (
            <LoginComponent RedirectToHomeScreenProp={this.props.RedirectToHomeScreenProp}></LoginComponent>
        );
    }
}

