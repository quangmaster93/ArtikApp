import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    CheckBox
} from 'react-native';
import Network from '../api/Network';

export default class ActionDetailScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Action Detail',
    });

    params = {};

    renderParameterInput() {
        let params = this.props.navigation.state.params.data.parameters
        let inputItems = []
        for (let p in params) {
            let param = params[p];
            switch (param.type) {
                case 'String':
                    inputItems.push(<View>
                        <Text>{param.description}</Text>
                        <TextInput keyboardType="default" value={this.params[p] != null ? this.params[p] : ""} onChangeText={(value) => { this.params[p] = value, this.forceUpdate() }}></TextInput>
                    </View>)
                    break;
                case 'Boolean':
                    inputItems.push(<View>
                        <Text>{param.description}</Text>
                        <CheckBox value={this.params[p] != null ? this.params[p] : false} onValueChange={(value) => { this.params[p] = value, this.forceUpdate() }}/>
                    </View >)
                    break;
                case 'Double':
                case 'Float':
                case 'Integer':
                case 'Long':
                    inputItems.push(<View>
                        <Text>{param.description}</Text>
                        <TextInput keyboardType="numeric" value={this.params[p] != null ? this.params[p] : ""} onChangeText={(value) => { this.params[p] = value, this.forceUpdate() }}></TextInput>
                    </View>)
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
        console.log(postData);

        Network.post('/actions', JSON.stringify(postData), (res) => {
            console.log(res);
        })
    }

    render() {
        let parameters
        console.log("Action");
        console.log(this.props.navigation);
        return (
            <View>
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

