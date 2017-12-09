import React, { Component } from 'react';
import Network from '../../api/Network'
import {
    View,
    Text,
    FlatList,
    AsyncStorage
} from 'react-native';

export default class DeviceComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            devices: []
        }
    }
    componentDidMount() {
        try {
            AsyncStorage.getItem('@token:key').then((access_token) => {
                
                if (access_token !== null) {
                    console.log(access_token);
                    console.log("token got");
                    this.getUserInfo(access_token);
                }
            });
        } catch (error) {
            console.log("cannot get token");
        }
    }

    getUserInfo() {
        let that = this;
        Network.get('/users/self', (responseJson) => {
            console.log('/users/self')
            console.log(responseJson)
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
                <FlatList data={this.state.devices} renderItem={({ item }) => <Text>{item.id}</Text>}></FlatList>
            </View>
        );
    }
}

