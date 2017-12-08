import React, { Component } from 'react';
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
    getUserInfo(token) {
        let that = this;
        let url = `https://api.artik.cloud/v1.1/users/self`
        fetch(url, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(responseJson => {
                let userId = JSON.parse(responseJson._bodyInit).data.id;
                that.getDevices(userId, token)
            })
            .catch(error => {
                console.error(error);
            });
    }
    getDevices(userId, token) {
        let that = this;
        let url = `https://api.artik.cloud/v1.1/users/${userId}/devices?count=100&includeProperties=false&includeShareInfo=false`;
        fetch(url, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(responseJson => {
                let devices = JSON.parse(responseJson._bodyInit).data.devices;
                that.setState({ devices: devices });
            })
            .catch(error => {
                console.error(error);
            });
    }
    render() {
        return (
            <View>
                <FlatList data={this.state.devices} renderItem={({ item }) => <Text>{item.id}</Text>}></FlatList>
            </View>
        );
    }
}

