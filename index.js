import { AppRegistry } from 'react-native';
import App from './App';
import Login from './Login';
import Devices from './Devices';
import { StackNavigator } from 'react-navigation'

export const AwesomeProject = StackNavigator({
    Home: { screen: Login },
    Devices: {screen: Devices}
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
