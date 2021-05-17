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
      console.log("访问结果: " + res.statusCode); 
      callback(null);
    }).on('error', function(e) { 
        console.log("访问结果: " + e.message);
        callback(e);
      });
})
 
async.waterfall(task, function(err,result){
  console.timeEnd('访问网站时间统计');
  if(err) return console.log(err);
  console.log('访问成功');
})
