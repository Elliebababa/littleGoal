import {StackNavigator, TabNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { Dimensions, Platform, StyleSheet, Text, View,Image,Button,FlatList,TouchableHighlight } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

var {width,height} = Dimensions.get('window');
var dataAry = [];
var day = new Date();

var test = [];
for (var j = 0; j < 5; j++) {
    test.push({key: j, title: j + ''});
}
var _offset;

if(j < 7)
	_offset=23;
else 
	_offset = 23+9*(j-6)+100*(j-7);
	

class TimeAxisScreen extends React.Component{
  backLatest=()=>{
    this.props.navigation.goBack();
  }
  static navigationOptions = {
	headerTitle:'时间轴',
headerRight:<TouchableHighlight activeOpacity={1} underlayColor="#eee" onPress={()=>alert('Hello')}><Image source={require('./../res/icon/reminder-icon.png')} style={{margin:10}}/></TouchableHighlight>,
	headerTitleStyle:{
	    fontWeight:'normal',
		color:'#2196F7',
		alignSelf:'center'
	},
  };
  constructor(props) {
	super(props);
	this.state = { dataAry: dataAry,}
  }
  
  render()
  {
	const { navigate } = this.props.navigation;
	  var data = [];
        for (var i = 0; i < 36; i++) {
			if(i < 12)
                data.push({key: i, year: day.getFullYear() - 1, month: (i + 1) % 13});
		    else if(i < 24)
				data.push({key: i, year: day.getFullYear(), month: (i - 11) % 13});
			else 
				data.push({key: i, year: day.getFullYear() + 1, month: (i - 23) % 13});
        }
    i = day.getMonth() + 12;
	
        return (
          <View style={{marginTop:5}}>
		    <View style={{width:80,left:0}}>
			  <TouchableHighlight underlayColor="#eee" onPress={()=>{
			  this._flatList.scrollToIndex({animated: true, viewPosition: 0, index: i})}}>
			    <View style={{borderRadius: 5, borderWidth: 1, alignItems: 'center', }}>
			      <Text style={styles.buttontxt}> 跳至本月 </Text>
				</View>
			  </TouchableHighlight>
			</View>
			
			
            <FlatList 
                ref={(flatList)=>this._flatList = flatList}
				ListHeaderComponent={this._header}
                getItemLayout={(data, index)=>(
                    {length: height, offset: (height+_offset) * index, index}
                )}
                ItemSeparatorComponent={this._separator}
                renderItem={this._renderItem}
                data={data}>
			</FlatList>
		    <View style={{width:14,height:height,backgroundColor:'#2196F7',position:'absolute',left:83}}></View>
		  
		  </View>
        );
  }

    _header = () => {
		return (
			<View style={{height:2,backgroundColor:'yellow'}}/>
		)
	}
	missionflatList(){};
	_renderItem = (item) => {
        var txt1 = item.item.year + '年';
		var txt2 = item.item.month + '月';
		var txt = txt1 + txt2;
		
        return (
		  <View style={{flexDirection:'row', marginBottom:10}}>
            <View style={{width:80,marginBottom:10,height:height}}/>
			
			<View style={{flexDirection:'column'}}>
			<View style={{width:width-90, marginLeft:8,marginTop:10,height:80, flex:1,}}>
			   <View style={{height:67,alignItems: 'flex-end', justifyContent: 'center', marginRight: 15}}>
			      <Text style={{color:'#2196F7',fontSize:40}}>{txt1}</Text>
			   </View>
			   <View style={{flexDirection: 'row',}}>
			     <View style={{flex:1, height:82, borderBottomWidth: 14, borderColor:'#2196F7',alignItems: 'center', justifyContent:'center'}}>
			       <Text style={{color:'#2196F7',fontSize:40}}>{txt2}</Text>
			     </View>
				 <View style={{flex:1}}/>
				 <View style={{flex:1}}/>
			   </View>
			</View>

			<View style={{flexDirection:'row', flex:4}}>
			  <View style={{marginLeft:5,flex:2}}/>
<View style={{flex:3}}>

</View>
			  <View style={{flex:1}}/>
			</View>
			<View style={{flex:1}}/>
			</View>
		  </View>
		)
    }

    _separator = () => {
        return <View style={{height:2,backgroundColor:'#eee'}}/>;
    }
}

const styles = StyleSheet.create({
    txt: {
        textAlign: 'left',
        textAlignVertical: 'bottom',
        color: 'black',
        fontSize: 30,
    },
	buttontxt: {
		color: 'black',
	},
});

export default TimeAxisScreen;