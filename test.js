var async = require('async');
var http = require('http');
var task = [];
task.push(function(callback){
  console.time('访问3个网站时间统计');
  http.get('(process.env.SITE)', function(res) { 
      console.log("百度访问结果: " + res.statusCode);
      setTimeout(function() {
            callback(null);
          }, 5000);
    }).on('error', function(e) { 
        console.log("百度访问结果: " + e.message);
        callback(e);
      });
})
 
task.push(function(callback){
  http.get('http://www.youku.com/', function(res) { 
      console.log("优酷访问结果: " + res.statusCode);
      setTimeout(function() {
            callback(null);
          }, 10000);
    }).on('error', function(e) {
        console.log("优酷访问结果: " + e.message);
        callback(e);
      });
})
 
task.push(function(callback){
  http.get('http://www.qq.com/', function(res) { 
      console.log("腾讯访问结果: " + res.statusCode);
      callback(null);
    }).on('error', function(e) { 
        console.log("腾讯访问结果: " + e.message);
        callback(e);
      });
})
 
async.waterfall(task, function(err,result){
  console.timeEnd('访问3个网站时间统计');
  if(err) return console.log(err);
  console.log('全部访问成功');
})
