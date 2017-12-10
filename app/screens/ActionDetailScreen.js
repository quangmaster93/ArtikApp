import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    TextInput
} from 'react-native';
import Network from '../api/Network';

export default class ActionDetailScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Detail',
        headerLeft: <Button title="Menu" onPress={() => { navigation.navigate('DrawerToggle') }}>
        </Button>
    });

    params = {};

    renderParameterInput() {
        let params = this.props.navigation.state.params.data.parameters
        let inputItems = []
        for (let p in params) {
            let param = params[p];
            switch (param.type) {
                case 'String':
                    inputItems.push(<View key={p}>
                        <Text>{param.description}</Text>
                        <TextInput keyboardType="default" value={this.params[p] != null ? this.params[p] : ""} onChangeText={(value) => {this.params[p] = value, this.forceUpdate()}}></TextInput>
                    </View>)
                    break;
                case 'Boolean':
                    inputItems.push(<View>
                        <Text>{param.description}</Text>
                        <CheckBox />
                    </View>)
                    break;
                case 'Double':
                case 'Float':
                case 'Integer':
                case 'Long':
                    break;
            }
        }
        // console.log(inputItems)
        return inputItems
    }

    sendAction = () => {
        
        let data = {
            actions: [{
                name: this.props.navigation.state.params.name,
                parameters: this.params
            }]
        };

        let postData = {
            data: data,
            ddid: this.props.navigation.state.params.ddid,
            type: 'action'
        }
        // console.log(JSON.stringify(data));

        Network.post('/actions', postData, (res) =>{
            console.log(res);
        })
    }


    render() {
        let parameters
        return (
            <View>
                <Text>dkm</Text>
                <Text>{JSON.stringify(this.props.navigation.state)}</Text>
                {this.renderParameterInput()}
                <Button title="Send" onPress={this.sendAction}></Button>
            </View>
        );
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // console.log(this.props.navigation.state)
    }

    componentWillMount() {

    }
}

