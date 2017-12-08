import React, { Component } from 'react';
import DeviceComponent from '../components/DeviceComponent/DeviceComponent'


export default class HomeScreen extends Component {

    render() {
        return (
            <DeviceComponent token={this.props.token}></DeviceComponent>
        );
    }
}

