import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';

export default class SlideMenuScreen extends Component {
    render() {
        {console.log(123)}
        return (
            <View style={styles.container}>
                <Text>SlideMenuScreen</Text>
                <Button title="Close Menu" onPress={() => { this.props.navigation.navigate('DrawerToggle') }}></Button>
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

