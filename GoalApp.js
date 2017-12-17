/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import {StackNavigator, TabNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View,Image,Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IndexScreen from './page/IndexPage';  
import DayScreen from './page/DayPage';  
import MomentScreen from './page/MomentPage';  
import PersonalScreen from './page/PersonalPage';  

import TimeAxisScreen from './page/TimeAxisPage';
import MyMomentScreen from './page/MyMomentPage';
import WriteMomentScreen from './page/WriteMomentPage';

class OtherScreen extends React.Component{
  
}

const MainScreenNavigator = TabNavigator({
  Index: { screen: IndexScreen },
  Day: { screen: DayScreen },
  Moment: { screen: MomentScreen },
  Personal: { screen: PersonalScreen },
},
  {

  navigationOptions: {
  animationEnabled: true,},

  tabBarPosition: 'bottom',
  
  tabBarOptions: {
  tabBarComponent: 'TabBarBottom',
  activeTintColor: '#FFFFFF',
  showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
  indicatorStyle: { height: 0,}, // 如TabBar下面显示有一条线，可以设高度为0后隐藏
  style: {
            height:60,
        },
  labelStyle: {
            fontSize: 12, // 文字大小
        },
  },
             
}
);

//HomeScreen上方为topMenu，下面为tabNavigator

  
//HomeScreen.router = MainScreenNavigator.router;

//HomeScreen嵌入到StackNavigator中，以便后续添加弹出页面
const GoalApp = StackNavigator({
    Main: {screen: MainScreenNavigator},
    TimeAxis: {screen: TimeAxisScreen},
	WriteMoment: {screen: WriteMomentScreen},
	MyMoment: {screen: MyMomentScreen},
});


export default GoalApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
