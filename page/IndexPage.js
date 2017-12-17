import { StackNavigator, TabNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableHighlight, ScrollView} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';


class IndexScreen extends React.Component{
  constructor(props) {
  super(props);
  this.state = {};
  }

  static navigationOptions = {
    tabBarLabel: '首页',
    tabBarIcon: ({tintColor}) => (<Image source={require('./../res/icon/home-icon.png')}
                                                     style={{tintColor: tintColor}}/>),
	
    headerTitle:'首页',
    headerLeft:<View style={{margin:10}}></View>,
    headerRight:<Image source={require('./../res/icon/search-icon.png')} style={{margin:10}}/>,
	headerTitleStyle:{
	    fontWeight:'normal',
		color:'#2196F7',
		alignSelf:'center'
	},
  };

  pressView = ()=>{
        //
    };
    
    pressDelete = ()=>{
        //
    };

    pressShare = ()=>{
        //
    };

    render() {
        var goalData = require('./goalData.json');
        var dailyGoals = goalData.dailyGoals;
        var allGoals = goalData.allGoals; 
        var dailyGoalRows = [];
        var allGoalRows = [];
        var day = goalData.day;
        var curDate = new Date();
        var weekday=new Array(7)
        weekday[0]="星期日";
        weekday[1]="星期一";
        weekday[2]="星期二";
        weekday[3]="星期三";
        weekday[4]="星期四";
        weekday[5]="星期五";
        weekday[6]="星期六";

        for (var i in dailyGoals){
          var dailyGoal = dailyGoals[i];
          var goalType = dailyGoal.goalType;
          var goalChecked = dailyGoal.goalChecked;

          if (goalChecked === true)
            {
              var checkedColor = "#2196F7";
            }
            else
            {
              var checkedColor = "#737373";
            }

          switch (goalType)
            {
            case "health":
              var goalIcon=require('./../res/icon/health-icon.png');
              break;
            case "game":
              var goalIcon=require('./../res/icon/game-icon.png');
              break;
            default:
              var goalIcon=require('./../res/icon/study-icon.png');
              break;
            }


            dailyGoalRows.push(
                <View style={{height:50,flexDirection: 'row',padding:5,paddingLeft:30,paddingRight:30,justifyContent: 'space-between'}}>
                <Image source={goalIcon} style={{margin:10,height:25,width:25,resizeMode:'contain'}}/>
                <View  style={{height:20,margin:10,borderWidth:1,borderColor:'#757575',width:200,alignItems:'center'}}><Text>{dailyGoal.goalContent}</Text></View>
                <Image source={require('./../res/icon/checked-icon.png')} style={{tintColor:checkedColor,margin:10}}/>
               </View>
              );
            }

        for (var i in allGoals){
          var allGoal = allGoals[i];
          var goalProgress = allGoal.goalProgress;
          //目标类型 内容 check否
          allGoalRows.push(
            <View style={{height:50,padding:10,paddingLeft:30,paddingRight:30}}>
              <Text>{allGoal.goalName}</Text>
              <View>
                <ProgressBar progress={goalProgress} indeterminate={false} width={null}/>
               </View>
            </View>
            );
        }


        return (<View style={styles.mainBody}>
          <ScrollView style={{flex:1}}>
            <View style={styles.dayBox}>
              <View style={styles.dayLabel}>
                <Text style={styles.dayText}>Day{day}</Text>
              </View>
                <Text style={styles.dateText}>{curDate.getFullYear()}.{curDate.getMonth()+1}.{curDate.getDate()} {weekday[curDate.getDay()]}</Text>
            </View>
            <View style={styles.buttonBox}>
              <View style={{flexDirection: 'row',justifyContent: 'flex-start',}}>
                  <MyButton text="新建目标"/>
                  <MyButton text="目标一览"/>
              </View>
              <View style={{flexDirection: 'row',justifyContent: 'flex-end',}}>
                  <IconButton OnPress = {this.pressView} icon={require('./../res/icon/view-icon.png')}/>
                  <IconButton OnPress = {this.pressDelete} icon={require('./../res/icon/delete-icon.png')}/>
                  <IconButton OnPress = {this.pressShare} icon={require('./../res/icon/share-icon.png')}/>
              </View>
            </View>
            <View style={styles.checkBox}>
              {dailyGoalRows}
            </View>
            <View style={styles.progressBox}>
              {allGoalRows}
            </View>
          </ScrollView>
      </View>)
    }
}

export default IndexScreen;

class MyButton extends React.Component {
    render() {
        const {text} = this.props;
        return (
            <TouchableHighlight style={styles.bigButton}>
          <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
        )
    }
}

class IconButton extends React.Component {
    customPressHandler =()=>{
      const {OnPressFun}= this.props;
      OnPressFun();
    }

    render() {
        const {icon} = this.props;
        return (
            <TouchableHighlight style={styles.smallButton} OnPress={this.customPressHandler}>
          <Image source={this.props.icon} style={{tintColor: "#737373",height:25,width:25,resizeMode:'contain'}}/>
      </TouchableHighlight>
        )
    }
}


const styles = StyleSheet.create({
    mainBody:{
        flex:1,
    },
    dayBox: {
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2196F7',
    },
    dayLabel: {
        height: 70,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    dayText: {
        fontSize: 25,
        fontFamily: 'Arial',
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    dateText: {
        fontSize: 12,
        margin:20,
        alignSelf:'flex-end',
    },
    bigButton: {
        height: 25,
        width: 80,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#2196F7',
    },
    smallButton: {
        height: 25,
        width: 25,
        margin:5,
    },
    buttonBox: {
        paddingLeft:10,
        paddingRight:10,
        margin:10,
        height: 35,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontStyle: 'normal',
    },
    checkBox: {
        flex:1,
        backgroundColor: '#FFFFFF',
    },
    progressBox: {
        borderTopColor:'#F7F7F7',
        flex:1,
    },
});

