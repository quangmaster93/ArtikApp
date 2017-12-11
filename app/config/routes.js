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
    HomeScreen: {
        screen: HomeScreen,
    },
    ActionDetailScreen: {
        screen: ActionDetailScreen
    }
});
export const DetailStack = StackNavigator({
    DetailScreen: {
        screen: DetailScreen,
    }
});


//Tab
export const RootTabs = TabNavigator(
    {
        HomeStack: {
            screen: HomeStack,
            title :"Home"
        },
        DetailStack: {
            screen: DetailStack,
            title :"Detail"
        }
    },
    {
        tabBarPosition: 'bottom',
        scrollEnabled :true
    }
);

//Slide Menu
export const SlideMenu = DrawerNavigator(
    {
        RootTabs: {
            screen: RootTabs
        },
        LoginScreen:{
            screen: LoginScreen
        }
    }, {
        contentComponent: props => <SlideMenuScreen {...props}></SlideMenuScreen>
    }
);
