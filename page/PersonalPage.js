import {StackNavigator, TabNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { Dimensions,Platform, StyleSheet, Text, View,Image,Button,ScrollView, TouchableHighlight } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;

class PersonalScreen extends React.Component{
  static navigationOptions = {
	headerTitle:'个人中心',
    headerLeft:<View style={{margin:10}}></View>,
    headerRight:<Image source={require('./../res/icon/set-icon.png')} style={{margin:10,width:25,height:25}}/>,
	headerTitleStyle:{
	    fontWeight:'normal',
		color:'#2196F7',
		alignSelf:'center'
	},
    tabBarLabel: '我的',
    tabBarIcon: ({tintColor}) => (<Image source={require('./../res/icon/personal-icon.png')}
                                                     style={{tintColor: tintColor}}/>),
  };
  render()
  {
	const { navigate } = this.props.navigation;
    return(
	  <ScrollView>
	    <View style={styles.first}>
          <View style={styles.img}>
		    
		  </View>
		  <View style={styles.idArea}>
		    <Text style={styles.idName}>爸爸疼你</Text>
		  </View>
		</View>
		
		<TouchableHighlight activeOpacity={1} underlayColor="#eee" onPress={()=>navigate('MyMoment')}>
		  <View style={styles.second}>
		    <Text style={styles.idName}>我的动态</Text>
		  </View>
		</TouchableHighlight>
		
		<TouchableHighlight activeOpacity={1} underlayColor="#eee" onPress={()=>this.store()}>
		  <View style={styles.third}>
		    <Text style={styles.idName}>积分商城</Text>
		  </View>
		</TouchableHighlight>
      </ScrollView>
	);
  }
  
  store() {
	  
  };
}

const styles = StyleSheet.create({
  first: {
	flexDirection: 'row',
	height: 250,
  },
  img: {
	width: 150,  
    height: 150,
    marginTop: 20,
	marginLeft: 20,
	backgroundColor: 'white',
	borderRadius: 150,
	justifyContent: 'center',
	alignItems: 'center', 
  },
  addImg: {
    fontSize: 50,	
	color: 'black',
  },
  idArea: {
	width: ScreenWidth - 170,  
    height: 150,
	marginLeft: 80,
	marginTop: 20,
	justifyContent: 'center',
  },
  idName: {
	fontSize: 20,	
	color: 'black',
  },
  second: {
	flexDirection: 'row',
	height: 85,
	backgroundColor: 'white',
	marginTop: 10,
	justifyContent: 'center',
	alignItems: 'center', 
  },
  third: {
	flexDirection: 'row',
	height: 85,
	backgroundColor: 'white',
	marginTop: 15,
	justifyContent: 'center',
	alignItems: 'center', 
  }
});

export default PersonalScreen;
