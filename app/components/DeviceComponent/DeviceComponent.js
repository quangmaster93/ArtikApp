import React, { Component } from 'react';
import Network from '../../api/Network'
import moment from 'moment';
import {
    ScrollView,
    Text,
    FlatList,
    AsyncStorage,
    View,
    TouchableHighlight,
    Alert
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
            <ScrollView>
                <FlatList data={this.state.devices}
                    style={{padding: 20}}
                    renderItem={({ item }) => <DeviceItem data={item} key={item.id}/>}>
                </FlatList>
            </ScrollView>
        );
    }
}

class DeviceItem extends Component {

    _handleNameTouch(name) {
        Alert.alert(`You touch on ${name}`);
    }
    render() {
        let {data} = this.props
        return <View style={stDeviceItem}>
            <TouchableHighlight onPress={() => this._handleNameTouch(data.name)}>
                <Text>{data.name}</Text>
            </TouchableHighlight>
            <Text>Connected: {data.connected + ""}</Text>
            <Text>{moment().fromNow(data.createdOn)}</Text>
        </View>
    }
}

var stDeviceItem = {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    padding: 20,
}

