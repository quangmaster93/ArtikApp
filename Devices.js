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

export default class Devices extends Component {
    constructor(props) {
        super(props)
        this.state = { devices: [] }
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
                <FlatList data={this.state.devices} renderItem={({ item }) => <Text key={item.id}>{item.name}</Text>}>
                </FlatList>
            </View>
        );
    }

    componentDidMount() {
        this.getUserInfo();
        console.log('componentDidMount login')
    }
}

