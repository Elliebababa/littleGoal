import { StackNavigator, TabNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { Alert,FlatList,SectionList,Platform, StyleSheet, Text, View, Image, TouchableHighlight, ScrollView } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import NetUtils from './NetUtils';
var uid ='test';
var curDate = new Date();
var weekday = new Array(7)
weekday[0] = "星期日";
weekday[1] = "星期一";
weekday[2] = "星期二";
weekday[3] = "星期三";
weekday[4] = "星期四";
weekday[5] = "星期五";
weekday[6] = "星期六";


class IndexScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            day:0,
            //goalData:'',
            delCondition:false,
        }

    }

    componentWillMount() {
       //var goalData = this.fetchData();
        var goalData = require('./goalData.json');       
        var day = goalData.day;
        var dailyGoalRows = [];
        var allGoalRows = [];
         for (var i in goalData.dailyGoals) {
            dailyGoalRows.push({
                key:i,
                goalContent:goalData.dailyGoals[i].goalContent,
                goalType:goalData.dailyGoals[i].goalType,
                goalChecked:goalData.dailyGoals[i].goalChecked,
                taskId:goalData.dailyGoals[i].taskId,
            });

        };
        for (var i in goalData.allGoals) {
            allGoalRows.push({
                key:i,
                goalName:goalData.allGoals[i].goalName,
                goalProgress:goalData.allGoals[i].goalProgress,
                taskId:goalData.allGoals[i].taskId,
            })
        };
        this.setState({
                    day:day,
                    //goalData:goalData,
                    dailyGoalRows:dailyGoalRows,
                    allGoalRows:allGoalRows,
                });
    }

    fetchData = () =>{
        var service = 'new_day';
        NetUtils.post(url,service,opts,(jsonData) => {
                    return jsonData;
                });
    }

    static navigationOptions = {
        headerTitle: '首页',
        tabBarLabel: '首页',
        tabBarIcon: ({tintColor}) => (<Image source={require('./../res/icon/home-icon.png')}
            style={{
                tintColor: tintColor
            }}/>),
        headerRight: <Image source={require('./../res/icon/search-icon.png')} style={{
            margin: 10,
            width: 25,
            height: 25
        }}/>,
    };

    renderDailyGoals= ({item}) => {
        var condition = this.state.delCondition;
        if (item.goalChecked === true) {
            var checkedColor = "#2196F7";
        } else {
            var checkedColor = "#737373";
        };
        switch (item.goalType) {
        case "health":
            var goalIcon = require('./../res/icon/health-icon.png');
            break;
        case "game":
            var goalIcon = require('./../res/icon/game-icon.png');
            break;
        default:
            var goalIcon = require('./../res/icon/study-icon.png');
            break;
        }

        return(
                <View key = {item.key} style={{
                height: 50,
                flexDirection: 'row',
                padding: 5,
                paddingLeft: 30,
                paddingRight: 30,
                justifyContent: 'space-between'
            }}>
                    <Image source={goalIcon} style={{
                margin: 10,
                height: 25,
                width: 25,
                resizeMode: 'contain'
            }}/>
                    <View  style={{
                height: 20,
                margin: 10,
                borderWidth: 1,
                borderColor: '#757575',
                width: 200,
                alignItems: 'center'
            }}><Text>{item.goalContent}</Text></View>
            <TouchableHighlight underlayColor="#eee" onPress={this.checkRow.bind(this,item.key)}>
                 <Image source={require('./../res/icon/checked-icon.png')} style={{
                tintColor: checkedColor,
                margin: 10
            }}/>
            </TouchableHighlight>
                {condition===true? <TouchableHighlight style={styles.smallButton} underlayColor="#eee" onPress={this.deleteRow.bind(this,item.key)}>
                 <Image source={require('./../res/icon/delete-icon.png')} style={{
                tintColor: "#737373",
                resizeMode: 'contain',
                margin: 5
            }}/>
            </TouchableHighlight>:null}
            </View>
        )
    }

    renderAllGoalRows= ({item}) =>{
     return(
        <View key = {item.key} style={{
            height: 50,
            padding: 10,
            paddingLeft: 30,
            paddingRight: 30
        }}>
              <Text>{item.goalName}</Text>
              <View>
                <ProgressBar progress={item.goalProgress} indeterminate={false} width={null}/>
               </View>
            </View>
        );
    };

    

    checkRow = (key) => {
        dailyGoalRows = this.state.dailyGoalRows;
        dailyGoalRows[key].goalChecked = !dailyGoalRows[key].goalChecked;
        this.setState({
            dailyGoalRows:dailyGoalRows
        });
    };

    pressView = () => {
        const {navigate} = this.props.navigation;
        navigate('TimeAxis');
    };

    deleteRow =(key) =>{
         Alert.alert(
            '删除当日任务',
            '删除该任务极可能造成目标的失败！！',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
              {text: 'OK', onPress: () => {

                dailyGoalRows = this.state.dailyGoalRows;
                TID = dailyGoalRows[key].taskId;
                for (var i = key; i < dailyGoalRows.length-1; i++)
                {
                      var ii = parseInt(i)+1;
                      dailyGoalRows[i].goalContent = dailyGoalRows[ii].goalContent;
                      dailyGoalRows[i].key = ''+i;
                      dailyGoalRows[i].goalType = dailyGoalRows[ii].goalType;
                      dailyGoalRows[i].goalChecked = dailyGoalRows[ii].goalChecked;
                      dailyGoalRows[i].taskId = dailyGoalRows[ii].taskId;
                    
                }
                dailyGoalRows.length = dailyGoalRows.length-1;
                this.setState({
                    dailyGoalRows:dailyGoalRows
                });
                //var opts ={taskId:TID};
                //NetUtils.post(url,'del_task',opts,(data)=>console.log(data));

              }},
            ]
          )
    };

    pressDelete = () => {
        var c= !this.state.delCondition;
        this.setState({delCondition:c})
    };

    pressShare = () => {
        alert('share');
    };

    pressNewGoal = () => {
        const {navigate} = this.props.navigation;
        navigate('NewGoal');
    };

    pressViewGoal = () => {
        const {navigate} = this.props.navigation;
        navigate('ViewGoal');
    };

   

    render() {
        return (<View style={styles.mainBody}>
            <View style={styles.dayBox}>
              <View style={styles.dayLabel}>
                <Text style={styles.dayText}>Day{this.state.day}</Text>
              </View>
                <Text style={styles.dateText}>{curDate.getFullYear()}.{curDate.getMonth() + 1}.{curDate.getDate()} {weekday[curDate.getDay()]}</Text>
            </View>
            <View style={styles.buttonBox}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
            }}>
                  <MyButton OnPressFun = {this.pressNewGoal} text="新建目标"/>
                  <MyButton OnPressFun = {this.pressViewGoal} text="目标一览"/>                 
              </View>
              
              <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
            }}>
                  <IconButton OnPressFun = {this.pressView} icon={require('./../res/icon/view-icon.png')}/>
                  <IconButton OnPressFun = {this.pressDelete} icon={require('./../res/icon/delete-icon.png')}/>
                  <IconButton OnPressFun = {this.pressShare} icon={require('./../res/icon/share-icon.png')}/>
              </View>
            </View>
            <SectionList
                extraData={this.state}
                sections = {[ // 不同section渲染不同类型的子组件
                    {key:'dailyGoals', data:this.state.dailyGoalRows, renderItem: this.renderDailyGoals},
                    {key:'allGoals', data:this.state.allGoalRows, renderItem: this.renderAllGoalRows},
                 ]}
            />

      </View>)
    }
}

export default IndexScreen;

class DailyGoalsComponents extends React.Component {

    render() {
        const {item} = this.props;
        if (item.goalChecked === true) {
            var checkedColor = "#2196F7";
        } else {
            var checkedColor = "#737373";
        };
        switch (item.goalType) {
        case "health":
            var goalIcon = require('./../res/icon/health-icon.png');
            break;
        case "game":
            var goalIcon = require('./../res/icon/game-icon.png');
            break;
        default:
            var goalIcon = require('./../res/icon/study-icon.png');
            break;
        }

        return(
                <View key = {item.key} style={{
                height: 50,
                flexDirection: 'row',
                padding: 5,
                paddingLeft: 30,
                paddingRight: 30,
                justifyContent: 'space-between'
            }}>
                    <Image source={goalIcon} style={{
                margin: 10,
                height: 25,
                width: 25,
                resizeMode: 'contain'
            }}/>
                    <View  style={{
                height: 20,
                margin: 10,
                borderWidth: 1,
                borderColor: '#757575',
                width: 200,
                alignItems: 'center'
            }}><Text>{item.goalContent}</Text></View>
                    <Image source={require('./../res/icon/checked-icon.png')} style={{
                tintColor: checkedColor,
                margin: 10
            }}/>
                   </View>
        )
    }
}


class MyButton extends React.Component {
    customPressHandler =() => {
        const {OnPressFun} = this.props;
        OnPressFun();
    }


    render() {
        const {text} = this.props;
        return (
            <TouchableHighlight style={styles.bigButton} underlayColor="#eee" onPress={this.customPressHandler}>
                 <Text style={styles.buttonText}>{this.props.text}</Text>
          </TouchableHighlight>
         
        )
    }
}

class IconButton extends React.Component {
    customPressHandler =() => {
        const {OnPressFun} = this.props;
        OnPressFun();
    }

    render() {
        const {icon} = this.props;
        return (
            <TouchableHighlight style={styles.smallButton} underlayColor="#eee" onPress={this.customPressHandler}>
                 <Image source={this.props.icon} style={{
                tintColor: "#737373",
                height: 25,
                width: 25,
                resizeMode: 'contain'
            }}/>
            </TouchableHighlight> 
            
        )
    }
}


const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
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
        margin: 20,
        alignSelf: 'flex-end',
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
        margin: 5,
    },
    buttonBox: {
        paddingLeft: 10,
        paddingRight: 10,
        margin: 10,
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
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    progressBox: {
        borderTopColor: '#F7F7F7',
        flex: 1,
    },
});

