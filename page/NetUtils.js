import React,{Component} from 'react';

var username = 'test';
var password = 'test';

export default class NetUtils extends Component{
	constructor(props){
		super(props);
	}

	static genHeaders(service,opts)
	{
		switch (service) {
		case 'register':
			//username = opts.username;
			//password = opts.password;
            return({
            	'message-type': 'register',
            	'Content-Type': 'application/x-www-form-urlencoded',
            	'username': username, 
            	'password': password,
            })
            break;

        case 'login':
            //username = opts.username;
			//password = opts.password;
            return({
            	'message-type': 'register',
            	'Content-Type': 'application/x-www-form-urlencoded',
            	'username': username, 
            	'password': password,
            })
            break;

        case 'new_day':
            return({
            	'message-type': 'new_day',
            	'Content-Type': 'application/x-www-form-urlencoded',
            	'username': username, 
            })
            break;

        case 'new_card':
        	 var taskId = opts.taskId;
        	 var day = this.getCurrentDateFormat;
        	 var finishedCard = opts.finishedCard;
             return({
            	'message-type': 'new_card',
            	'Content-Type': 'application/x-www-form-urlencoded',
            	'username': username, 
            	'taskId':taskId,
            	'day':day,
            	'finishedCard':finishedCard,

            })
            break;

        case 'del_task':
        	 var taskId = opts.taskId;
        	 var day = this.getCurrentDateFormat;
             return({
            	'message-type': 'del_task',
            	'Content-Type': 'application/x-www-form-urlencoded',
            	'username': username, 
            	'taskId':taskId,
            	'day':day,
            })
            break;
        
        case 'query_index':
             return({
            	'message-type': 'query_index',
            	'Content-Type': 'application/x-www-form-urlencoded',
            	'username': username, 
            })
            break;
        
        case 'query_time_shaft':
             return({
            	'message-type': 'query_time_shaft',
            	'Content-Type': 'application/x-www-form-urlencoded',
            	'username': username, 
            })
            break;
        
        case 'query_moment':
            return({
            	'message-type': 'query_moment',
            	'Content-Type': 'application/x-www-form-urlencoded',
            	'username': username, 
            })
            break;
        
        }
		/*if (service == 'request_uploadSmall')
    	{
    		return ({
    		    			 'Content-Type': 'application/json;charset=UTF-8',
    		    			 'message-type':service,
    		    			 'goalSize':'small',
    		   				 'uid':uid,
    		    		})
    	}
    	else if (service == 'request_uploadBig')
    	{
    		return ({
    		    			 'Content-Type': 'application/json;charset=UTF-8',
    		    			 'message-type':service,
    		    			 'goalSize':'big',
    		   				 'uid':uid,
    		    		})
    	}*/

	}

	/**
     * 普通的get请求 
     * @param {*} url 地址
     * @param {*} opts  参数{method:'GET',body:params}
     * @param {*} callback  成功后的回调
     
    static get(url,opts,callback){
       fetch(url,opts)
        .then((response) => {
            if(response.ok){//如果相应码为200
                return response.json(); //将字符串转换为json对象
            }
        })
        .then((jsonData) => {
                callback(jsonData);
        }).catch((error) =>{
	//网络请求失败
			alert("network fail");
		});
    };
*/

    /**
     * post key-value 形式 header为'Content-Type': 'application/x-www-form-urlencoded'
     * @param {*} url 
     * @param {*} service对应的请求页面
     * @param {*} opts对应的选项
     * @param {*} callback 
     */
    static post(
        ){
    	var headers = this.genHeaders(service,opts);

        fetch(url,{
        	method:'POST',
        	headers:headers,
        })
        .then((response) => {
            if(response.ok){
               return response.json();
            }
        })
        .then((json) => {
        		console.log(json);
                callback(json);
        }).catch((error) => {
            console.log(error);
        });
    };

    /**
     * post json形式  header为'Content-Type': 'application/json'
     * @param {*} url 
     * @param {*} opts {method:'POST',headers:{'Content-Type': 'application/json;charset=UTF-8'},body:JSON.stringify(jsonObj),//json对象转换为string}
     * @param {*} jsonObj 
     * @param {*} callback 
     */
    static postJson(url,service,opts,jsonObj,callback){
    	var headers = this.genHeaders(service,opts);
    	
        fetch(url,{
        	method:'POST',
        	headers:headers,
        	body:JSON.stringify(jsonObj),
        })
        .then((response) => {
            if(response.ok){
                return response.json();
            }
        })
        .then((json) => {
                console.log(json);
        }).catch((error) => {
        	//console.log(json);
            console.log(error);
        });
    };

    /**
     * 获取当前系统时间 yyyyMMddHH
     */
    static getCurrentDateFormat(){
        var space = "-";
        var dates = new Date();
        var years = dates.getFullYear();
        var months = dates.getMonth()+1;
        if(months<10){
            months = "0"+months;
        }

        var days = dates.getDate();
        if(days<10){
            days = "0"+days;
        }
        var time = years+space+months+space+days;
        return time;
    };

}