import {StackNavigator, TabNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, KeyboardAvoidingView, Dimensions, Platform, StyleSheet, Text, View,Image,Button,FlatList,TouchableHighlight,Keyboard,TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from '@remobile/react-native-toast';
var {width,height} = Dimensions.get('window');

class WriteMomentScreen extends React.Component{
  backLatest=()=>{
    this.props.navigation.goBack();
  }
  static navigationOptions = {
	headerTitle:'新动态',
    headerRight:(<TouchableHighlight activeOpacity={1} underlayColor="#eee" onPress={()=>alert('Hello')}>
	              <View style={{backgroundColor:'#2196F7',borderRadius:5,marginRight:3,padding:5}}>
				    <Text style={{color:'white'}}>发送</Text>
				  </View>
				</TouchableHighlight>),
	headerTitleStyle:{
	    fontWeight:'normal',
		color:'#2196F7',
		alignSelf:'center'
	},
  };
  constructor(props) {
	super(props);
	this.state={content: '',selectedImages: [],keyboardHeight:0,};
  }
  
  render()
  {
	const { navigate } = this.props.navigation;
        return (
		<View style={{flex:1,flexDirection:'column'}}>
		  <View style={{backgroundColor:'#FFFFFF',flexDirection:'column',paddingLeft:10,paddingRight:10}}>
            <TextInput 
			  placeholder="今天有什么开心事呢" 
			  multiline={true}
			  onChangeText={(text) => {this.setState({content:text})}}
			  style={[styles.input,{marginBottom:this.state.keyboardHeight}]}/>
			  {this.renderSelectedImages()}
			  <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 18, paddingBottom: 10}}>
			    <Image source={require('./../res/writeMoment/position.png')} style={{width: 25, height: 25,marginLeft:25,marginRight:20}} onPress={()=>{}}/>
				<Image source={require('./../res/writeMoment/emoji.png')} style={{width: 25, height: 25,marginLeft:10,marginRight:20}}/>
				<Image source={require('./../res/writeMoment/at.png')} style={{width: 25, height: 25,marginLeft:10,marginRight:20}}/>
			  </View>
		   </View>
		</View>
		)
  }
    renderSelectedImages() {
		let row1 = [];
		let row2 = [];
		let images = this.state.selectedImages;
		let len = images.length;
		if (len >= 0 && len <= 4)
			row1.push(this.renderImageRow(images, -1, len, false));
		else if (len > 4) {
			row1.push(this.renderImageRow(images, -1, 4, false));
			row2.push(this.renderImageRow(images, 4, len, true));
		}
		return (
		  <View style={styles.selectedImageContainer}>
			{row1}
			{row2}
		  </View>
		);
	}
	renderImageRow(arr, start, end, isSecondRow) {
		let images = [];
		for (let i = start; i < end; i++) {
			if (i == -1) 
				images.push(this.renderAddBtn());
			else 
				images.push(this.renderImageItem(arr[i], i));
		}
		let style = {};
		if (!isSecondRow) 
			style = {flexDirection: 'row'};
		else 
			style = {flexDirection: 'row', marginTop: 10};
		return (
			<View key={"imageRow" + end} style={style}>
			{images}
			</View>
		);
    }
	renderImageItem(item, index) {
		let imageURI = {uri: item};
		return (
			<TouchableOpacity key={"imageItem" + index} activeOpacity={0.6} onPress={() => {}}>
			  <Image source={imageURI} style={styles.addPicImgBtn}/>
			</TouchableOpacity>
		);
	}
	renderAddBtn() {
		return (
		  <TouchableOpacity key={"addBtn"} activeOpacity={0.6} onPress={() => {this.pickImage()}}>
			<Image source={require('./../res/writeMoment/plus.png')} style={styles.addPicImgBtn}/>
		  </TouchableOpacity>
		);
	}
	pickImage() {}
	componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }

    _keyboardDidShow(e){
        this.setState({
            keyboardHeight:e.startCoordinates.height
        })
	}
    _keyboardDidHide(e){
        this.setState({
            keyboardHeight:0
        })
    }
}

const styles = StyleSheet.create({
  input: {
	width:width-20,
	height:120,
	marginTop:2,
    textAlignVertical: 'top',
	fontSize:15,
  },
  content: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  },
  selectedImageContainer: {
    width: width,
    flexDirection: 'column',
  },
  addPicImgBtn: {
    width: 60,
    height: 60,
    marginLeft: 10,
  },
  bottomContent: {
    marginTop: 25,
    backgroundColor: '#FFFFFF',
    paddingLeft: 10,
    paddingRight: 10,
  },
  bottomItem: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'center'
  },
  bottomItemIcon: {
    width: 25,
    height: 25,
  }
});

export default WriteMomentScreen;