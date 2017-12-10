import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    AsyncStorage
} from 'react-native';

export default class SlideMenuScreen extends Component {
    removeToken() {
        console.log('remove token');
        AsyncStorage.removeItem('@token:key');
    }
    render() {
        {console.log(123)}
        return (
            <View style={styles.container}>
                <Text>SlideMenuScreen</Text>
                <Button title="Close Menu" onPress={() => { this.props.navigation.navigate('DrawerToggle') }}></Button>
                <Button title="Remove Token" onPress={ this.removeToken }></Button>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#00BCD4"
    }
})

