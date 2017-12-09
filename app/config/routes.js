import React from 'react';
import { StackNavigator } from 'react-navigation';
import { TabNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import LoginScreen from '../screens/LoginScreen';
import MenuScreen from '../screens/MenuScreen';

//not yet used
export const HomeStack=StackNavigator({
    Home:{
        screen: HomeScreen,
        navigationOptions: {
            headerTitle: 'Home',
          }
    },
    Detail:{
        screen: DetailScreen,
        navigationOptions: {
            headerTitle: 'Detail',
          },
    }
});

//used
export const RootTabs = TabNavigator({
    Home: {
      screen: HomeScreen,
    },
    Detail:{
        screen: DetailScreen,
    }
  });
  