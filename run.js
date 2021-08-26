var async = require('async');
var https = require('https');
var task = [];
const dotenv = require('dotenv');
dotenv.config(); 
task.push(function(callback){
  console.time('访问网站时间统计');
  https.get({
	host: (process.env.SITE),
	port: 443
  }, function(res) { 
      console.log("①访问结果: " + res.statusCode); 
      callback(null);
    }).on('error', function(e) { 
        console.log("①访问结果: " + e.message);
        callback(e);
      });
})
 
task.push(function(callback){
  https.get({
	host: (process.env.SITE2),
	port: 443
  }, function(res) { 
      console.log("②访问结果: " + res.statusCode); 
      callback(null);
    }).on('error', function(e) { 
        console.log("②访问结果: " + e.message);
        callback(e);
      });
})

task.push(function(callback){
  https.get({
	host: (process.env.SITE3),
	port: 443
  }, function(res) { 
      console.log("③访问结果: " + res.statusCode); 
      callback(null);
    }).on('error', function(e) { 
        console.log("③访问结果: " + e.message);
        callback(e);
      });
})

async.waterfall(task, function(err,result){
  console.timeEnd('访问网站时间统计');
  if(err) return console.log(err);
  console.log('全部访问成功');
})
