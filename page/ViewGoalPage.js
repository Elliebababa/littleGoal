import { StackNavigator, TabNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { TextInput, Dimensions,Button, Picker, Platform, StyleSheet, Text, View, Image, TouchableHighlight, ScrollView, ViewPagerAndroid,FlatList } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

var goalData = require('./goalData.json');
var {width, height} = Dimensions.get('window');

class ViewGoalScreen extends React.Component {
    constructor(props) {
        super(props);
        var data = goalData.allGoals;
        for (var i in data){
        	data[i].key = i;
        }
        this.state = {
        	data:data
            };
            console.log(this.state.data);}

     static navigationOptions = {
        headerTitle: '目标一览',
        headerRight: <TouchableHighlight activeOpacity={1} underlayColor="#eee" onPress={() => alert('Hello')}><Image source={require('./../res/icon/reminder-icon.png')} style={{
            margin: 10
        }}/></TouchableHighlight>,
        headerTitleStyle: {
            fontWeight: 'normal',
            color: '#2196F7',
            alignSelf: 'center'
        },
    };

    


    render() {
        return (
        	<View style ={{flex:1}}>
        	<FlatList style={{marginTop:20}}
								  data ={this.state.data}
								  renderItem = {this.renderItem}
								  keyExtractor={this._keyExtractor}
                                  ItemSeparatorComponent = {this.renderItemSeparator}
						/>
			</View>);
    }

    _keyExtractor = (item,index) => item.key;

    //绘制列表的分割线
    renderItemSeparator(){
        return(
<View style={styles.line}>
<Text></Text>
</View>
            )
    }

    renderItem = ({item}) => {
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
    	<View style={styles.itemStyle}>
		      <Image source={goalIcon} style={styles.Icon}/>
		        <View style={{flex:8}}>
		        	<Text style={styles.goalText}>{item.goalName}</Text>
		        	<ProgressBar progress={item.goalProgress} indeterminate={false} width={null}/>
		        </View>

      	</View>
        ) }

    //点击列表点击每一行
    clickItem(item,index) {
        alert(index)
    }

}

export default ViewGoalScreen;

const gType = {
	"health":"健康",
	"money":"金钱",
	"study":"学习",
};

const styles = StyleSheet.create({
    line:{
        height:0.5,
        width:width*0.9,
        borderColor:"#7f7f7f",
        borderWidth:0.5,
        alignSelf:'center',
    },
	itemStyle:{
		flexDirection:'row',
		padding:10,
		margin:15
	},
    Icon: {
		flex:2,
		margin: 10,
		height: 30,
		width: 30,
		resizeMode:'contain'
	},
    goalText: {
    	alignSelf:"center",
        fontSize: 16,
        margin:5,
    },
    
});

