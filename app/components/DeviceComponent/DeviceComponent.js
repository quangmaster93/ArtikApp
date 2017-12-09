import React, { Component } from 'react';
import Network from '../../api/Network'
import {
    View,
    Text,
    FlatList,
} from 'react-native';

export default class DeviceComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            devices: []
        }
    }
    componentDidMount() {
        this.getUserInfo(this.props.token);
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

