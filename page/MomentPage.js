import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Button, TouchableHighlight, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

var data = [];
for (var i = 0; i < 5; i++) {
    data.push({
        key: i,
        title: i + ''
    });
}

class MomentScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static navigationOptions =(navigation) = {
        tabBarLabel: '动态',
        tabBarIcon: ({tintColor}) => (<Image source={require('./../res/icon/moment-icon.png')}
            style={{
                tintColor: tintColor
            }}/>),
        headerTitle: '动态',
        headerLeft: <View style={{
            margin: 10
        }}></View>,
        headerRight: (
        <TouchableHighlight onPress={() => {
        }} underlayColor="#eee">
	  <Image source={require('./../res/Moment/newAct.png')} style={{
            margin: 10,
            width: 30,
            height: 30
        }}/>
	</TouchableHighlight>),
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: '#F8F8F8'
            }}>
        <FlatList
            renderItem={this.renderItem}
            data={data}
            />
      </View>
        )
    }

    renderItem = (item) => {
        var txt = '第' + item.index + '个';
        return (
            <View style={{
                flexDirection: 'row',
                flex: 1,
                height: 120
            }}>
		  <View style={styles.imgArea}>
		    <View style={{
                height: 95,
                width: 95,
                borderRadius: 95,
                backgroundColor: 'gray'
            }}>
			</View>
		  </View>
		  <View style={[styles.actArea, {
                borderBottomWidth: 1
            }]}>
		    <View style={styles.txt}>
		      <Text style={styles.act}>{txt}</Text>
		    </View>
			<View style={{
                flex: 1,
                flexDirection: 'row'
            }}>
			  <View style={{
                flex: 6
            }}/>
			  <View style={{
                flex: 1,
                flexDirection: 'row'
            }}>
			    <TouchableHighlight underlayColor="#eee" onPress={() => {
            }}>
				  <View>
				    <Image source={require('./../res/Moment/like.png')} style={{
                height: 20,
                width: 20
            }}/>
				  </View>
				</TouchableHighlight>
				<Text> 1 </Text>
			  </View>
			</View>
		  </View>
		</View>
        )
    }
}

const styles = StyleSheet.create({
    imgArea: {
        flex: 1,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',

    },
    actArea: {
        flexDirection: 'column',
        flex: 3,
        marginLeft: 5,
    },
    txt: {
        marginTop: 10,
        flex: 3,
    },
    act: {
        color: 'black',
        fontSize: 18,
    },
})

export default MomentScreen;
