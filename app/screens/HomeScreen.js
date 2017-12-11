import React, { Component } from 'react';
import DeviceComponent from '../components/DeviceComponent/DeviceComponent';
import {Text,View,Button} from 'react-native'


export default class HomeScreen extends Component {
    static navigationOptions = ({navigation})=>({
        title: 'Home',
        headerLeft :<Button title="Menu" onPress={()=>{navigation.navigate('DrawerToggle')}}>
        </Button>
      })
    render() {
        return (
            <DeviceComponent nav={this.props.navigation}></DeviceComponent>
        );
    }
}

