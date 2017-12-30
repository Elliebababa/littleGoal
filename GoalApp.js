/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { StackNavigator, TabNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { Alert, Platform, StyleSheet, Text, View, Image, Button, ScrollView, TouchableHighlight, PixelRatio, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IndexScreen from './page/IndexPage';
import DayScreen from './page/DayPage';
import MomentScreen from './page/MomentPage';
import PersonalScreen from './page/PersonalPage';
import NewGoalScreen from './page/NewGoalPage';
import ViewGoalScreen from './page/ViewGoalPage';
import TimeAxisScreen from './page/TimeAxisPage';
import MyMomentScreen from './page/MyMomentPage';
import WriteMomentScreen from './page/WriteMomentPage';

class LoginScreen extends React.Component {
	static navigationOptions = {
		header: null,
	};
	constructor(props) {
        super(props);
        this.state = {};
    }
	render() {
		const {navigate} = this.props.navigation;
	    return (
			<View style={styles.view}>
			  <View style={{alignItems:'center',marginTop:40,height:150,justifyContent:'center',alignItems:'center'}}>
				<View style={{width:120,height:120,borderRadius:120,backgroundColor:'white'}}>
				</View>
			  </View>
			  <View style={styles.editGroup}>
				<View style={styles.editView1}>
				  <TextInput
					style={styles.edit}
					underlineColorAndroid="transparent"
					placeholder="用户名"
					placeholderTextColor="#c4c4c4"/>
				</View>
				<View style={{height: 1/PixelRatio.get(), backgroundColor:'#c4c4c4'}}/>
				<View style={styles.editView2}>
				  <TextInput
					style={styles.edit}
					underlineColorAndroid="transparent"
					placeholder="密码"
					password={true}
					secureTextEntry={true}
					placeholderTextColor="#c4c4c4"/>
				</View>
				<View style={{marginTop:20, height:40}}>
				  <TouchableHighlight activeOpacity={1} underlayColor="#eee" onPress={() => navigate('Main')}>
				    <View style={styles.login}>
				      <Text style={{color:'white'}}> 登录 </Text>
					</View>
				  </TouchableHighlight>
				</View>
				<View style={styles.textButtonLine}>
				   <TouchableHighlight activeOpacity={1} underlayColor="#eee" onPress={()=>this.forget()}>
				     <View><Text>忘记密码?</Text></View>
				   </TouchableHighlight>
				   <TouchableHighlight activeOpacity={1} underlayColor="#eee" onPress={()=>navigate('SignUp')}>
                     <View><Text>注册账号</Text></View>
				   </TouchableHighlight>
				</View>
			  </View>
			</View>
		)
	}
	forget() {
		alert("我忘了密码");
	}
}

class SignUpScreen extends React.Component {
	static navigationOptions = {
		header: null,
	};
	constructor(props) {
        super(props);
        this.state = {};
    }
	render() {
		const {navigate} = this.props.navigation;
		var txt1 = '<';
		return (
			<View style={styles.view}>
			  <View style={{height:50,backgroundColor:'#2196F7',flexDirection:'row'}}>
			    <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
			      <TouchableHighlight activeOpacity={1} underlayColor="#eee" onPress={() => navigate('Login')}>
				    <View style={{backgroundColor:'#2196F7',borderTopLeftRadius:5,borderBottomLeftRadius:5}}>
				      <Text style={{fontSize:45,textAlign:'center',color:'white'}}> {txt1} </Text>
				    </View>
				  </TouchableHighlight>
				</View>
				<View style={{flex:10,justifyContent:'center',alignItems:'center'}}>
					<Text style={{color:'white',fontSize:20}}>创建用户</Text>
				</View>
				<View style={{flex:1}}/>
			  </View>
			  <View style={[styles.editGroup, {marginTop:50}]}>
                <View style={styles.editView1}>
                  <TextInput
                    style={styles.edit}
                    underlineColorAndroid="transparent"
                    placeholder="邮箱/手机号"
                    placeholderTextColor="#c4c4c4"/>
                </View>
                <View style={{height: 20/PixelRatio.get()}}/>
                <View style={styles.editView2}>
                  <TextInput
                    style={styles.edit}
                    underlineColorAndroid="transparent"
                    placeholder="用户名"
                    placeholderTextColor="#c4c4c4"/>
                </View>
                <View style={{height: 20/PixelRatio.get()}}/>
                <View style={styles.editView3}>
                  <TextInput
                    style={styles.edit}
                    underlineColorAndroid="transparent"
					password={true}
					secureTextEntry={true}
                    placeholder="密码"
                    placeholderTextColor="#c4c4c4"/>
                </View>
                <View style={{marginTop: 30, height: 40}}>
                  <TouchableHighlight activeOpacity={1} underlayColor="#eee" onPress={() => this.signUp()}>
					<View style={styles.login}>
						<Text style={{color:'white'}}> 注册 </Text>
					</View>
				  </TouchableHighlight>
                </View>
              </View>
			</View>
		)
	}
	signUp() {
			
	}
}

const MainScreenNavigator = TabNavigator({
    Index: {
        screen: IndexScreen
    },
    Day: {
        screen: DayScreen
    },
    Moment: {
        screen: MomentScreen
    },
    Personal: {
        screen: PersonalScreen
    },
},
    {

        navigationOptions: {
            headerStyle: {
                height: 45,
            },
            headerLeft: <View style={{
                margin: 10
            }}></View>,

            headerTitleStyle: {
                fontWeight: 'normal',
                color: '#2196F7',
                alignSelf: 'center',
            },

            animationEnabled: true,
        },

        tabBarPosition: 'bottom',

        tabBarOptions: {
            tabBarComponent: 'TabBarBottom',
            activeTintColor: '#FFFFFF',
            showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
            indicatorStyle: {
                height: 0,
            }, // 如TabBar下面显示有一条线，可以设高度为0后隐藏
            style: {
                height: 60,
            },
            labelStyle: {
                fontSize: 12, // 文字大小
            },
        },

    }
);

const SignNavigator = StackNavigator ({
	Login: {
		screen: LoginScreen
	},
	SignUp: {
		screen: SignUpScreen
	},
})

const GoalApp = StackNavigator({
	Sign: {
		screen: SignNavigator
	},
    Main: {
        screen: MainScreenNavigator
    },
    NewGoal: {
        screen: NewGoalScreen
    },
    ViewGoal: {
        screen: ViewGoalScreen
    },
    TimeAxis: {
        screen: TimeAxisScreen
    },
    WriteMoment: {
        screen: WriteMomentScreen
    },
    MyMoment: {
        screen: MyMomentScreen
    },
});


export default GoalApp;

const styles = StyleSheet.create({
	view: {
        flex: 1,
    },
	editGroup:{
        margin: 20,
    },
	editView1:{
        height: 48,
        backgroundColor:'white',
        justifyContent: 'center',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },
    editView2:{
        height: 48,
        backgroundColor:'white',
        justifyContent: 'center',
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
    },
	editView3:{
        height: 48,
        backgroundColor:'white',
        justifyContent: 'center',
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3
    },
	textButtonLine:{
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
	edit:{
        height: 40,
        fontSize: 13,
        backgroundColor: '#fff',
        paddingLeft: 15,
        paddingRight: 15,
    },
	login:{
		backgroundColor:'blue',
		height:35,
		borderRadius:5,
		marginLeft:5,
		marginRight:5,
		justifyContent:'center',
		alignItems: 'center',
	},
});
