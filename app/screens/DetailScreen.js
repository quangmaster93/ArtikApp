import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';

export default class DetailScreen extends Component {
    static navigationOptions = ({navigation})=>({
        title: 'Detail',
        headerLeft :<Button title="Menu" onPress={()=>{navigation.navigate('DrawerToggle')}}>
        </Button>
      })
    render() {
        return (
            <View>
                <Text>Detail</Text>
            </View>
        );
    }
}

