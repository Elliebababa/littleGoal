import { StackNavigator, TabNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { SectionList, Dimensions, Platform, StyleSheet, Text, View, Image, Button, FlatList, TouchableHighlight } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

var {width, height} = Dimensions.get('window');
var dataAry = [];
var day = new Date();
var missionColor = new Array("red","blue","yellow","purple","gray");
var missionIndex = 0;
class TimeAxisScreen extends React.Component {
    backLatest=() => {
        this.props.navigation.goBack();
    }
    static navigationOptions = {
        headerTitle: '时间轴',
        headerRight: <TouchableHighlight activeOpacity={1} underlayColor="#eee" onPress={() => alert('Hello')}><Image source={require('./../res/icon/reminder-icon.png')} style={{
            margin: 10
        }}/></TouchableHighlight>,
        headerTitleStyle: {
            fontWeight: 'normal',
            color: '#2196F7',
            alignSelf: 'center'
        },
    };
    constructor(props) {
        super(props);
        this.state = {
            dataAry: dataAry,
        }
    }
    _renderItem = (info) => {
		txt = info.item.content;
        return (
		  <View style={{flexDirection:"row",height:50}}>
		    <View style={{flex:1,backgroundColor:missionColor[info.item.key % 5]}}/>
		    <View style={{flex:1,alignItems:'center',justifyContent: 'center'}}>
	          <Text>{txt}</Text>
			</View>
			<View style={{flex:2,alignItems:'center',justifyContent: 'center'}}>
			  <Text>456</Text>
			</View>
		  </View>
		)
    }

    _sectionComp = (info) => {
        var txt = info.section.key;
        return <Text
            style={{ height: 50, textAlign: 'right', textAlignVertical: 'center', backgroundColor: 'rgb(233,233,239)', color: '#2196F7', fontSize: 30 }}>{txt}</Text>
    }

  render() {
	var datas = [];
	for(var i = 0; i < 36; ++ i) {
		let txt;
	    if(i < 12)
			txt = (day.getFullYear() - 1) + '年' + ((i + 1) % 13) + '月';
		else if (i < 24)
			txt = day.getFullYear() + '年' + ((i - 11) % 13) + '月';
		else
			txt = (day.getFullYear() + 1) + '年' + ((i - 23) % 13) + '月';
		let content = [];

        datas.push({
			key: txt,
			data: [{
				key: i,
				content: "123"
			}]
        });
	    
	}
    return (
      <View style={{ flex: 1 }}>
        <SectionList
          renderSectionHeader={this._sectionComp}
          renderItem={this._renderItem}
          sections={datas}
          ItemSeparatorComponent={() => <View><Text></Text></View>}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
    
});

export default TimeAxisScreen;