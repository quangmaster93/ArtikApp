import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';

export default class DetailScreen extends Component {
    static navigationOptions = ({navigation})=>({
        title: 'Detail',
        headerRight :<Button title="Menu" onPress={()=>{navigation.navigate('DrawerToggle')}}>
        </Button>
      })
    render() {
        console.log("Detail");
        console.log(this.props.navigation);
        return (
            <View>
                <Text>Detail</Text>
            </View>
        );
    }
}

