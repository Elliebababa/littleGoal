import {StackNavigator, TabNavigator } from 'react-navigation';
import React, { Component} from 'react';
import { Platform, ActivityIndicator, Dimensions, StyleSheet, Text, View,Image,Button,ListView,ScrollView, Modal, Alert,TouchableHighlight, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CalendarList, Calendar, Agenda} from 'react-native-calendars';

var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
var today = new Date();
var selectDay;

class DayScreen extends React.Component{
  static navigationOptions = {
    tabBarLabel: '日历',
    tabBarIcon: ({tintColor}) => (<Image source={require('./../res/icon/day-icon.png')}
                                                     style={{tintColor: tintColor}}/>),
	headerTitle:'日历',
    headerLeft:<View style={{margin:10}}></View>,
    headerRight:<Image source={require('./../res/icon/reminder-icon.png')} style={{margin:10}}/>,
	headerTitleStyle:{
	    fontWeight:'normal',
		color:'#2196F7',
		alignSelf:'center'
	},
  };
  constructor(props) {
	super(props);
	this.state = {
      modalVisible: false,
    };
	this.onDayPress = this.onDayPress.bind(this);
  }

  render() {
	const { navigate } = this.props.navigation;
    return(
	  <ScrollView>
		<Calendar 
		   onDayPress={this.onDayPress}
		   style={styles.calendar}
		   markedDates = {{[this.state.selected]:{selected:true}}}
		/> 
		

		<View>
		  <Modal 
		    animationType='fade'
            transparent={true}
            visible={this.state.modalVisible}
			onRequestClose={() => {this.onRequestClose()}}
          >
		    <View style={styles.container}>
			  <View style={styles.innerContainer}>
			    <View>
                  <Text style={styles.sharetxt}>分享到:</Text>
				</View>
				<View style={styles.imgShareArea}>
				  <View style={styles.imgShare}>
				    <Image source={require('./../res/calendar/WeChat.png')} />
				  </View>
				  <View style={styles.imgShare}>
				    <Image source={require('./../res/calendar/WeChatFriend.png')} />
				  </View>
				  <View style={styles.imgShare}>
				    <Image source={require('./../res/calendar/QQ.png')} />
				  </View>
				  <View style={styles.imgShare}>
				    <Image source={require('./../res/calendar/Weibo.png')} />
				  </View>
				</View>
				<TouchableHighlight underlayColor="black" onPress={()=>this.onRequestClose()}>
				  <View style={styles.cancel}>
					<Text style={styles.cancelTxt}>取消</Text>
				  </View>
				</TouchableHighlight>
			  </View>
			</View>
		  </Modal>
		  
        <View>
		  <TouchableHighlight style={styles.addBtn} underlayColor="#eee" onPress={()=>this.newAct()}>
		    <View style={styles.bView}>
		      <Image style={styles.addImg} source={require('./../res/calendar/tianjia.png')}/>
              <View style={styles.textBorder}>
                 <Text style={styles.btnText}>新建目标</Text>
		      </View>
            </View>
		  </TouchableHighlight>
		</View>
		
		<View style={styles.lastRow}>
		  <TouchableHighlight underlayColor="#eee" onPress={()=>this.showModal()}>
		    <Image style={styles.shares} source={require('./../res/icon/share-icon.png')} />
		  </TouchableHighlight>
			<TouchableHighlight underlayColor="#eee" onPress={()=>navigate('TimeAxis')}>
		      <View style={styles.timeLine}>
		        <Text style={styles.timeLineTxt}>时间轴</Text>
		      </View>
		    </TouchableHighlight>
		</View>
		</View>
      </ScrollView>
	);
  }
    onDayPress(day) {
        this.setState({
            selected: day.dateString
        });	
		selectDay = day.dateString;
    };
	
    newAct() {
	    if(!selectDay)
		    alert('你应该选择一个日期');
        else
	        alert(selectDay);
    };
	
    timeAxis() {

	};
	
    showModal() {
        this.setState({
            modalVisible:true
        })
    };
	
	onRequestClose() {
        this.setState({
            modalVisible:false
        });
    };
}

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 0,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 370,
  },
  addBtn: {
    width: ScreenWidth,
    height: 60,
  },
  bView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#ea8010',
    fontWeight: 'bold',
  },
  textBorder: {
    height: 60,
    width: ScreenWidth - 50,
    justifyContent: 'center',
    borderBottomWidth: .5,
    borderColor: '#eee'
  },
  addImg: {
    marginLeft: 3,
    width: 42,
    height: 42,
  },
  timeLine: {
	width: 150,  
    height: 45,
    backgroundColor: '#1e90ff',
	borderBottomLeftRadius: 10,
	borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
	borderTopRightRadius: 10,
	alignSelf: 'flex-end',
	marginRight: 3,
	justifyContent: 'center',
	alignItems: 'center',
  },
  timeLineTxt: {
	fontSize: 18,
    color: 'white',
  },
  lastRow: {
	flexDirection: 'row',
    height: 45,
    alignSelf: 'flex-end',
  },
  shares: {
	marginTop: 5,
	marginRight: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
	padding: 40,
	backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  innerContainer: {
    borderRadius: 10,
	backgroundColor: '#fff',
	height: 150,
  },
  sharetxt: {
	marginLeft: 20,
	marginTop: 10,
	textAlign: 'left',
	fontSize: 18,
  },
  imgShareArea: {
	paddingLeft: 20,
	paddingRight: 20,
	flexDirection: 'row',
	height: 80,
	borderBottomWidth: 1,
	borderColor: '#eee',
	justifyContent: 'center',
	alignSelf: 'center',
  },
  imgShare: {
	flex: 1,
	marginLeft: 20,
	marginTop: 10,
  },
  cancel: {
    paddingTop: 5,
	flexDirection: 'row',
	justifyContent: 'center',
	alignSelf: 'center',
  },
  cancelTxt: {
	color: 'red',
	fontSize: 18,
  },
});
export default DayScreen;

