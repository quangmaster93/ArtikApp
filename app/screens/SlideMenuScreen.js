import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    AsyncStorage
} from 'react-native';

export default class SlideMenuScreen extends Component {
    logOut=()=> {
        console.log('remove token');
        AsyncStorage.removeItem('@token:key')
        .then(() => {
            // this.props.navigation.navigate("LoginScreen");
        });;
        
    }
    render() {
        console.log("Menu");
        console.log(this.props.navigation);
        return (
            <View style={styles.container}>
                <Text>SlideMenuScreen</Text>
                <Button title="Close Menu" onPress={() => { this.props.navigation.navigate('DrawerClose') }}></Button>
                <Button title="Log out" onPress={ ()=>{this.logOut() }}></Button>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#00BCD4",
    }
})

