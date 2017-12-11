import React from 'react';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import LoginScreen from '../screens/LoginScreen';
import MenuScreen from '../screens/MenuScreen';
import SlideMenuScreen from '../screens/SlideMenuScreen';
import ActionDetailScreen from '../screens/ActionDetailScreen';

//Stack
export const HomeStack = StackNavigator({
    Home: {
        screen: HomeScreen,
    },
    ActionDetail: {
        screen: ActionDetailScreen
    }
});
export const DetailStack = StackNavigator({
    Detail: {
        screen: DetailScreen,
    }
});


//Tab
export const RootTabs = TabNavigator(
    {
        Home: {
            screen: HomeStack,
        },
        Detail: {
            screen: DetailStack,
        }
    },
    {
        tabBarPosition: 'bottom'
    }
);

//Slide Menu
export const SlideMenu = DrawerNavigator(
    {
        Home: {
            screen: RootTabs
        }
    }, {
        contentComponent: props => <SlideMenuScreen {...props}></SlideMenuScreen>
    }
);
