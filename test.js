var async = require('async');
var http = require('https');
var task = [];
task.push(function(callback){
  console.time('访问3个网站时间统计');
  https.get({
        host: (process.env.SITE),
        port: 443
  },function(res) { 
      console.log("①访问结果: " + res.statusCode);
      setTimeout(function() {
            callback(null);
          }, 5000);
    }).on('error', function(e) { 
        console.log("①访问结果: " + e.message);
        callback(e);
      });
})
 
task.push(function(callback){
  https.get({
        host: (process.env.SITE2),
        prot: 443
  },function(res) { 
      console.log("②访问结果: " + res.statusCode);
      setTimeout(function() {
            callback(null);
          }, 10000);
    }).on('error', function(e) {
        console.log("②访问结果: " + e.message);
        callback(e);
      });
})
 
task.push(function(callback){
  https.get({
        host: (process.env.SITE3),
        prot: 443
  },function(res) { 
      console.log("③访问结果: " + res.statusCode);
      callback(null);
    }).on('error', function(e) { 
        console.log("③访问结果: " + e.message);
        callback(e);
      });
})
 
async.waterfall(task, function(err,result){
  console.timeEnd('访问3个网站时间统计');
  if(err) return console.log(err);
  console.log('全部访问成功');
})
