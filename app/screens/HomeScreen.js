import React, { Component } from 'react';
import DeviceComponent from '../components/DeviceComponent/DeviceComponent';
import {Text,View,Button} from 'react-native'


export default class HomeScreen extends Component {
    static navigationOptions = ({navigation})=>({
        title: 'Home',
        headerRight :<Button title="Menu" onPress={()=>{navigation.navigate('DrawerToggle')}}>
        </Button>
      })
    render() {
        console.log("Home");
        console.log(this.props.navigation);
        return (
            <DeviceComponent nav={this.props.navigation}></DeviceComponent>
        );
    }
}

