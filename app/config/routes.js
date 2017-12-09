import React from 'react';
import { StackNavigator } from 'react-navigation';
import { TabNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import LoginScreen from '../screens/LoginScreen';
import MenuScreen from '../screens/MenuScreen';

//Stack
export const HomeStack=StackNavigator({
    Home:{
        screen: HomeScreen,
        navigationOptions: {
            headerTitle: 'Home',
          }
    }
});
export const DetailStack=StackNavigator({
    Detail:{
        screen: DetailScreen,
        navigationOptions: {
            headerTitle: 'Detail',
          },
    }
});


//Tab
export const RootTabs = TabNavigator(
    {
    Home: {
      screen: HomeStack,
    },
    Detail:{
        screen: DetailStack,
    }
  },
  {
    tabBarPosition:'bottom'
  }
);
  