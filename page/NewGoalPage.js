import { StackNavigator, TabNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { TextInput, Button, Picker, Platform, StyleSheet, Text, View, Image, TouchableHighlight, ScrollView, ViewPagerAndroid,FlatList } from 'react-native';
import DatePicker from 'react-native-datepicker';


class NewGoalScreen extends React.Component {
    constructor(props) {
        super(props);
        var curDate = new Date();
        var endDate = new Date();
        endDate.setDate(curDate.getDate()+7);
        this.state = {
            goalSize: "small",
            goalType: "health",
            last: 7,
            stepCount:2,
            frequency:1,
            strTime: curDate,
            endTime:endDate,
            date:curDate.getFullYear().toString()+"-"+(curDate.getMonth()+1).toString()+"-"+curDate.getDate().toString(),
            goal: "",
            goalName: "",
            step:[{
            	no:1,
            	last:7,
            	goalName:'',
            	goalContent:'',
            	frequency:1,
            	strTime:curDate,
            	endTime:endDate,
            },{
            	no:2,
            	last:7,
            	goalName:'',
            	goalContent:'',
            	frequency:1,
            	strTime:curDate,
            	endTime:endDate,
            },],

        };
    }

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#2196F7',
        },
        headerTintColor: 'white',
    };


    onSummit() {
    	alert("建立新目标！");
    };


    render() {
    		var helpButton = (

            <TouchableHighlight style={styles.helpBtn} onPress={this.onSummit} underlayColor="#2965fc">
                <Text style={styles.strTimeBtnText}>
                       ?
                </Text>
            </TouchableHighlight>
    			)


    		//小目标阶段页面
	    	var smallGoalStepPage =(
	    		<View style={{
	                flex: 1
	            }}>
				<Text style ={styles.labelText}>时长</Text>
					<Picker
			            style={{
			                backgroundColor: "#eee",
			                color: "#7f7f7f",
			                width: 200
			            }}
			            mode="dropdown"
			            selectedValue={this.state.last}
			            onValueChange={(l) => {
			            					let ed = new Date();
		        							ed.setDate(this.state.strTime.getDate()+l);
			            					this.setState({
			            	                last: l,
			            	                endTime:ed,
			            	            })}}>
							  <Picker.Item label="一周" value={7} />
							  <Picker.Item label="21天" value={21} />
							  <Picker.Item label="一月" value={30} />
							  <Picker.Item label="三个月" value={90} />
							  <Picker.Item label="一年" value={365} />
							  <Picker.Item label="两年" value={730} />
							  <Picker.Item label="三年" value={1095} />
					</Picker>
					<Text style ={styles.labelText}>开始时间</Text>
					<DatePicker
				        style={{height:40,width: 200}}
				        date={this.state.date}
				        showIcon={false}
				        mode="date"
				        placeholder="select date"
				        format="YYYY-MM-DD"
				        minDate={this.state.date}
				        maxDate={(this.state.strTime.getFullYear()+1).toString()+"-"+(this.state.strTime.getMonth()+1).toString()+"-"+this.state.strTime.getDate().toString()}
				        confirmBtnText="Confirm"
				        cancelBtnText="Cancel"
				        customStyles={{
				          dateInput: {
				            backgroundColor:"white"
				          }
				        }}
				        onDateChange={(date) => {
				        	let d = date.split("-");
				        	let dd = new Date(parseInt(d[0]),parseInt(d[1])-1,parseInt(d[2])); 
				        	let ed = new Date();
        					ed.setDate(dd.getDate()+this.state.last);
				        	this.setState({date: date,
				        					strTime:dd,
				        					endTime:ed,
				        	});
				        }}
		      		/>
		      		<Text style ={styles.labelText}>预计结束时间</Text>
		      		<DatePicker
				        style={{height:40,width: 200}}
				        date={(this.state.endTime.getFullYear()).toString()+"-"+(this.state.endTime.getMonth()+1).toString()+"-"+this.state.endTime.getDate().toString()}
				        showIcon={false}
				        mode="date"
				        placeholder="select date"
				        format="YYYY-MM-DD"
				        minDate={(this.state.endTime.getFullYear()).toString()+"-"+(this.state.endTime.getMonth()+1).toString()+"-"+this.state.endTime.getDate().toString()}
				        maxDate={(this.state.endTime.getFullYear()+5).toString()+"-"+(this.state.endTime.getMonth()+1).toString()+"-"+this.state.endTime.getDate().toString()}
				        confirmBtnText="Confirm"
				        cancelBtnText="Cancel"
				        customStyles={{
				          dateInput: {
				            backgroundColor:"white"
				          }
			        	}}
				        onDateChange={(date) => {
				        	let d = date.split("-");
				        	let dd = new Date(parseInt(d[0]),parseInt(d[1])-1,parseInt(d[2])); 
				        	this.setState({endTime:dd
				        	});}}
		      		/>

						<Text style ={styles.labelText}>频率</Text>
						<Picker
		            style={{
		                backgroundColor: "#eee",
		                color: "#7f7f7f",
		                width: 200
		            }}
		            mode="dropdown"
		            selectedValue={this.state.frequency}
		            onValueChange={(fre) => this.setState({
		                frequency: fre
		            })}>
						  <Picker.Item label="每天" value="1" />
						  <Picker.Item label="两天一次" value="2" />
						  <Picker.Item label="三天一次" value="3" />
						  <Picker.Item label="五天一次" value="5" />
						  <Picker.Item label="每周一次" value="7" />
						  <Picker.Item label="半月一次" value="15" />
						  <Picker.Item label="每月一次" value="30" />
						</Picker>
					</View>
			)
	    	//大目标阶段页面
	    	var bigGoalStepPage =(
	    		<View style={{
	                flex: 1,alignItems:"center"
	            }}>
				<Text style ={styles.labelText}>阶段数</Text>
				<Picker
		            style={{
		                backgroundColor: "#eee",
		                color: "#7f7f7f",
		                width: 200
		            }}
		            mode="dropdown"
		            selectedValue={this.state.stepCount}
		            onValueChange={(s) => {if (this.state.stepCount < s)
		            							{
		            								var step =this.state.step;
				            						var curDate = new Date();
											        var endDate = new Date();
											        endDate.setDate(curDate.getDate()+7);
											    	for (var i = this.state.stepCount; i < s;i++)
											    	{
											    		step.push({
											    			no:i+1,
											            	last:7,
											            	goalName:'',
											            	goalContent:'',
											            	frequency:1,
											            	strTime:curDate,
											            	endTime:endDate,
											    		});
											    	}
		            							}
		            						else if (this.state.stepCount > s)
		            							{
		            								var step =this.state.step;
											    	step = step.slice(0,s);
		            							};
		            						
									    	this.setState({
									    		stepCount: s,
									    		step:step});
		            		            }}>
						  <Picker.Item label="一阶段" value={1} />
						  <Picker.Item label="二阶段" value={2} />
						  <Picker.Item label="三阶段" value={3} />
						  <Picker.Item label="四阶段" value={4} />
						  <Picker.Item label="五阶段" value={5} />
						  <Picker.Item label="六阶段" value={6} />
						  <Picker.Item label="七阶段" value={7} />
						</Picker>
						<FlatList style={{marginTop:20}}
								  data ={this.state.step}
								  renderItem = {this.renderItem.bind(this)}
								  keyExtractor={this._keyExtractor}
						/>
					</View>
			)

			//小目标总结页
			var smallGoalSumPage = (
					<View style={{
		                flex: 1
		            }}>
					<Text style ={styles.sumText}>我的目标：{this.state.goalName}</Text>
					<Text style ={styles.sumText}>目标类型：{gType[this.state.goalType]}</Text>
					<Text style ={styles.sumText}>开始日期：{this.state.strTime.getFullYear()}年{this.state.strTime.getMonth()+1}月{this.state.strTime.getDate()}日</Text>
					<Text style ={styles.sumText}>结束日期：{this.state.endTime.getFullYear()}年{this.state.endTime.getMonth()+1}月{this.state.endTime.getDate()}日</Text>
					<Text style ={styles.sumText}>时长：{this.state.last}天</Text>
					<Text style ={styles.sumText}>频率：每{this.state.frequency}天一提醒</Text>
					<TouchableHighlight style={styles.strTimeBtn} onPress={this.onSummit} underlayColor="#2965fc">
		                <Text style={styles.strTimeBtnText}>
		                       完成
		                </Text>
		            </TouchableHighlight>
					</View>
			)



			var bigGoalSum = []

			for (var i in this.state.step) {
			    
			    bigGoalSum.push(
			    		<View key = {this.state.step[i].no} style={{margin:10}}>
			    		<Text style={styles.sumText2}>阶段{this.state.step[i].no}</Text>
			    		<Text style={styles.sumText2}>阶段目标 {this.state.step[i].goalName}</Text>
			    		<Text style={styles.sumText2}>阶段内容 {this.state.step[i].goalContent}</Text>
			    		<Text style={styles.sumText2}>预估时长 {this.state.step[i].last}</Text>
			    		<Text style={styles.sumText2}>开始日期 {this.state.step[i].strTime.getFullYear()}年{this.state.step[i].strTime.getMonth()+1}月{this.state.step[i].strTime.getDate()}日</Text>
						<Text style={styles.sumText2}>结束日期 {this.state.step[i].endTime.getFullYear()}年{this.state.step[i].endTime.getMonth()+1}月{this.state.step[i].endTime.getDate()}日</Text>
						<Text style={styles.sumText2}>频率 每{this.state.step[i].frequency}天一提醒</Text>
					</View>
			    	);

			};

			//大目标总结页
			var bigGoalSumPage = (
					<ScrollView style={{
		                flex: 1
		            }}>
					<Text style ={styles.sumText}>我的目标：{this.state.goalName}</Text>
					<Text style ={styles.sumText}>目标类型：{gType[this.state.goalType]}</Text>
					<Text style ={styles.sumText}>开始日期：{this.state.step[0].strTime.getFullYear()}年{this.state.step[0].strTime.getMonth()+1}月{this.state.step[0].strTime.getDate()}日</Text>
					<Text style ={styles.sumText}>结束日期：{this.state.step[this.state.step.length-1].endTime.getFullYear()}年{this.state.step[this.state.step.length-1].endTime.getMonth()+1}月{this.state.step[this.state.step.length-1].endTime.getDate()}日</Text>
					<TouchableHighlight style={styles.strTimeBtn} onPress={this.onSummit} underlayColor="#2965fc">
		                <Text style={styles.strTimeBtnText}>
		                       完成
		                </Text>
		            </TouchableHighlight>
					</ScrollView>
			)


        return (
            <ViewPagerAndroid style={{
                flex: 1
            }} initialPage={0}
            keyboardDismissMode = "on-drag"
            >
		<View style ={styles.newGoalBody}>
			<Text style ={styles.goalText}>新建目标</Text>
			<View style={{
                flex: 1
            }}>
			<Text style ={styles.labelText}>目标大小</Text>
				<Picker
            style={{
                backgroundColor: "#eee",
                color: "#7f7f7f",
                width: 200
            }}
            mode="dropdown"
            selectedValue={this.state.goalSize}
            onValueChange={(goalS) => {this.setState({
                            goalSize: goalS
                        });console.log(this.state.step);}}>
				  <Picker.Item label="小目标" value="small" />
				  <Picker.Item label="老大不小目标" value="big" />
				</Picker>
			<Text style ={styles.labelText}>目标分类</Text>
			<Picker
            style={{
                backgroundColor: "#eee",
                color: "#7f7f7f"
            }}
            mode="dropdown"
            selectedValue={this.state.goalType}
            onValueChange={(goalT) => this.setState({
                goalType: goalT
            })}>
				  <Picker.Item label="健康" value="health" />
				  <Picker.Item label="学习" value="study" />
				  <Picker.Item label="金钱" value="money" />
				</Picker>
			</View>
			<Text style ={styles.goalText}>1/4</Text>
		</View>



		<View style ={styles.newGoalBody}>
    		<Text style ={styles.goalText}>新建目标</Text>
				<View style = {{flex: 1}}>
			<Text style ={styles.labelText}>目标内容</Text>
			<TextInput
			keyboardType = "default"
			underlineColorAndroid="transparent"
            style={{
                height: 40,
                borderColor: '#ddd',
                borderWidth: 1,
                backgroundColor:'white',
                width:300,
            }}
            onChangeText={(text) => this.setState({
                goalName:text
            })}
            value={this.state.goalName}
            />
            {this.state.goalSize === "small"?helpButton:null}
			</View>
			<Text style ={styles.goalText}>2/4</Text>
		</View>

		<View style ={styles.newGoalBody}>
			<Text style ={styles.goalText}>新建目标</Text>
			{this.state.goalSize === "small"? smallGoalStepPage:bigGoalStepPage}
			<Text style ={styles.goalText}>3/4</Text>
		</View>

		<View style ={styles.newGoalBody}>
			<Text style ={styles.goalText}>新建目标</Text>
			{this.state.goalSize === "small"? smallGoalSumPage:bigGoalSumPage}
			<Text style ={styles.goalText}>4/4</Text>
		</View>

		</ViewPagerAndroid>
        )
    }


    _keyExtractor = (item,index) => item.no;

    ListHeaderComponent()
    {
    }

    renderItem({item,index}) {
    	console.log(item);
        return (
        	<View style={{margin:20,alignItems:"center"}}>
        		<Text style={styles.labelText}>阶段{item.no}</Text>
        		<Text style ={styles.labelText2}>阶段目标</Text>
					<TextInput
					keyboardType = "default"
					underlineColorAndroid="transparent"
		            style={{
		                height: 40,
		                borderColor: '#ddd',
		                borderWidth: 1,
		                backgroundColor:'white',
		                width:300,
		            }}
		            onChangeText={(text) => {
		            					step = this.state.step;
		            					step[index].goalName = text;
		            					this.setState({
		            		                step:step
		            		            })}}
		            value={this.state.step[index].goalName}
		            />
		        <Text style ={styles.labelText2}>阶段内容</Text>
					<TextInput
					keyboardType = "default"
					underlineColorAndroid="transparent"
		            style={{
		                height: 40,
		                borderColor: '#ddd',
		                borderWidth: 1,
		                backgroundColor:'white',
		                width:300,
		            }}
		            onChangeText={(text) => {
		            					step = this.state.step;
		            					step[index].goalContent = text;
		            					this.setState({
		            		                step:step
		            		            })}}
		            value={this.state.step[index].goalContent}
		            />
				<Text style={styles.labelText2}>持续时长</Text>
				<Picker
		            style={{
		                backgroundColor: "#eee",
		                color: "#7f7f7f",
		                width: 200
		            }}
		            mode="dropdown"
		            selectedValue={item.last}
		            onValueChange={(l) => {
		            					let step = this.state.step; 
		            					let ed = new Date();
	        							ed.setDate(step[index].strTime.getDate()+l);				 
										step[index].last = l;  
										step[index].endTime=ed,
										this.setState({
		            	                step:step
		            	            })}}>
						  <Picker.Item label="一周" value={7} />
						  <Picker.Item label="21天" value={21} />
						  <Picker.Item label="一月" value={30} />
						  <Picker.Item label="三个月" value={90} />
						  <Picker.Item label="一年" value={365} />
						  <Picker.Item label="两年" value={730} />
						  <Picker.Item label="三年" value={1095} />
					</Picker>
				<Text style ={styles.labelText2}>阶段开始时间</Text>
					<DatePicker
				        style={{height:40,width: 200}}
				        date={item.strTime.getFullYear().toString()+"-"+(item.strTime.getMonth()+1).toString()+"-"+item.strTime.getDate().toString()}
				        showIcon={false}
				        mode="date"
				        placeholder="select date"
				        format="YYYY-MM-DD"
				        minDate={this.state.date}
				        maxDate={(this.state.strTime.getFullYear()+1).toString()+"-"+(this.state.strTime.getMonth()+1).toString()+"-"+this.state.strTime.getDate().toString()}
				        confirmBtnText="Confirm"
				        cancelBtnText="Cancel"
				        customStyles={{
				          dateInput: {
				            backgroundColor:"white"
				          }
				        }}
				        onDateChange={(date) => {
				        	let d = date.split("-");
        					let step = this.state.step;
        					step[index].strTime=new Date(parseInt(d[0]),parseInt(d[1])-1,parseInt(d[2])); 
        					step[index].endTime=new Date(parseInt(d[0]),parseInt(d[1])-1,parseInt(d[2])); 
        					step[index].endTime.setDate(step[index].endTime.getDate()+step[index].last);
				        	this.setState({step:step
				        	});
				        }}
		      		/>
		      		<Text style ={styles.labelText2}>阶段结束时间</Text>
		      		<DatePicker
				        style={{height:40,width: 200}}
				        date={(item.endTime.getFullYear()).toString()+"-"+(item.endTime.getMonth()+1).toString()+"-"+item.endTime.getDate().toString()}
				        showIcon={false}
				        mode="date"
				        placeholder="select date"
				        format="YYYY-MM-DD"
				        minDate={(item.endTime.getFullYear()).toString()+"-"+(item.endTime.getMonth()+1).toString()+"-"+item.endTime.getDate().toString()}
				        maxDate={(item.endTime.getFullYear()+5).toString()+"-"+(item.endTime.getMonth()+1).toString()+"-"+item.endTime.getDate().toString()}
				        confirmBtnText="Confirm"
				        cancelBtnText="Cancel"
				        customStyles={{
				          dateInput: {
				            backgroundColor:"white"
				          }
			        	}}
				        onDateChange={(date) => {
				        	let d = date.split("-");
				        	let step = this.state.step;
        					step[index].endTime = new Date(parseInt(d[0]),parseInt(d[1])-1,parseInt(d[2])); 
				        	this.setState({step:step
				        	});}}
		      		/>
		      		<Text style ={styles.labelText2}>频率</Text>
						<Picker
		            style={{
		                backgroundColor: "#eee",
		                color: "#7f7f7f",
		                width: 200
		            }}
		            mode="dropdown"
		            selectedValue={item.frequency}
		            onValueChange={(fre)=>{
		            		let step = this.state.step;
        					step[index].frequency = fre;
				        	this.setState({step:step
				        	});}}>
						  <Picker.Item label="每天" value="1" />
						  <Picker.Item label="两天一次" value="2" />
						  <Picker.Item label="三天一次" value="3" />
						  <Picker.Item label="五天一次" value="5" />
						  <Picker.Item label="每周一次" value="7" />
						  <Picker.Item label="半月一次" value="15" />
						  <Picker.Item label="每月一次" value="30" />
						</Picker>
			</View>
        )
    }
    //绘制列表的分割线
    renderItemSeparator(){

    }

    //点击列表点击每一行
    clickItem(item,index) {
        alert(index)
    }

}

export default NewGoalScreen;

const gType = {
	"health":"健康",
	"money":"金钱",
	"study":"学习",
};

const styles = StyleSheet.create({
    newGoalBody: {
        alignItems: 'center',
        backgroundColor: '#2196F7',
    },
    goalText: {
        color: 'white',
        fontSize: 25,
        margin: 30,
    },
    strTimeBtn:{
    	height:40,
    	alignItems: 'center',
    	justifyContent:'center',
    	backgroundColor:'white'
    },
    helpBtn:{
    	margin:10,
    	height:40,
    	width:40,
    	borderRadius:20,
    	alignSelf: 'center',
    	alignItems: 'center',
    	justifyContent:'center',
    	backgroundColor:'white'
    },
    strTimeBtnText:{
    	color:'#7f7f7f',
    	fontSize:15,
    },
    labelText: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 20,
        marginTop: 35,
        marginBottom: 25,
    },
    labelText2: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 15,
        marginTop: 20,
        marginBottom: 15,
    },
    sumText: {
        alignSelf: 'flex-start',
        color: 'white',
        fontSize: 20,
        margin: 10,
    },
    sumText2: {
        alignSelf: 'flex-start',
        color: 'white',
        margin: 2,
    }
});

