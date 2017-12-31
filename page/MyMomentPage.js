import { StackNavigator, TabNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { ScrollView, Dimensions, Platform, StyleSheet, Text, View, Image, Button, Modal, FlatList, TouchableHighlight, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
var dataAry = [];

var data = [];
for (var i = 0; i < 5; i++) {
    data.push({
        key: i,
        title: i + ''
    });
}


class MyMomentScreen extends React.Component {
    static navigationOptions = {
        headerTitle: '我的动态',
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
        };
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <ScrollView>
	  <View style={{
                flexDirection: 'column',
                flex: 1
            }}>
	      <View style={{
                flexDirection: 'row',
                flex: 2,
                backgroundColor: 'gray'
            }}>
	        <View style={{
                flex: 2
            }}/>
            <View style={styles.backgroundImg}>
	           <View style={styles.user}>
			     <View style={styles.userImg}>
				   <View style={styles.img}> 
				   </View>
				   <Text style={styles.txt}> 我想摸一下你的奖杯 </Text>
				 </View>
				 <View style={{
                flex: 1
            }}/>
			   </View>
	        </View>
		  </View>
		  
		  <View style={styles.act}>
		    <View style={{
                flexDirection: 'column',
                flex: 1
            }}>
		      <View style={{
                height: 80,
                flexDirection: 'row'
            }}>
			    <View style={{
                width: 80,
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1
            }}>
			      <Text style={{
                fontSize: 18,
                color: 'black'
            }}>今天</Text>
			    </View>
			    <View style={{
                alignItems: 'flex-start',
                justifyContent: 'center',
                flex: 4
            }}>
			      <TouchableHighlight onPress={() => navigate('WriteMoment')} underlayColor="#eee">
				    <View style={styles.newAct}>
				      <Text style={{
                color: 'white'
            }}>发布动态</Text>
				    </View>
				  </TouchableHighlight>
			    </View> 
			  </View>
			  <View style={{
                flex: 5
            }}>
				<FlatList
            renderItem={this._renderItem}
            data={data}/>
			  </View>
		    </View>
		  </View>
      </View>
	</ScrollView>
        )
    }
    writeAct() {}
    _renderItem = (item) => {
        var txt = '第' + item.index + '个';
        return (
            <View style={{
                flexDirection: 'row'
            }}>
		    <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-start',
                height: 120
            }}>
<Text style={styles.actDate}>日期</Text>
			</View>
			<View style={{
                flex: 4
            }}>
			  <TouchableHighlight underlayColor="#eee" onPress={() => this.myAct()}>
			    <View style={{
                flexDirection: 'row',
                height: 120
            }}>
			      <View style={{
                flex: 1,
                alignItems: 'flex-start',
                justifyContent: 'flex-start'
            }}>
			        <View style={{
                height: 80,
                width: 80,
                marginTop: 10,
                marginLeft: 5,
                backgroundColor: 'white'
            }}>
<Image></Image><Text>图片</Text>
				    </View>
			      </View>
			      <View style={{
                flex: 3,
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginLeft: 10
            }}>
<Text style={styles.moments}>{txt}</Text>
			      </View>
			  
			    </View>
			  </TouchableHighlight>
			</View>
		  </View>
        )

    }
    myAct() {}
}

const styles = StyleSheet.create({
    backgroundImg: {
        flex: 1,
    },
    act: {
        flex: 2,
    },
    user: {
        marginRight: 20,
        marginTop: 5,
        width: 180,
        flex: 1,
        flexDirection: 'column',
    },
    userImg: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        marginRight: 10,
    },
    img: {
        width: 130,
        height: 130,
        borderRadius: 130,
        backgroundColor: 'white',
    },
    txt: {
        color: 'black',
    },
    newAct: {
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 10,
        backgroundColor: '#2196F7',
    },
    actDate: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'black',
        fontSize: 18,
        marginTop: 12,
    },
    moments: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'black',
        fontSize: 15,
        marginTop: 10,
        marginLeft: 8,
    }
})

export default MyMomentScreen;