const mysql  = require('mysql');  //调用MySQL模块 

function OptPool(){ 
  this.flag = true; //是否连接过 
  this.pool = mysql.createPool({     
    host: 'localhost',       //主机 
    user: 'root',            //MySQL认证用户名 
    password: 'root',        //MySQL认证用户密码 
    database: 'test', 
    port: '3306'             //端口号 
  }); 
  
  this.getPool = function(){ 
    if(this.flag){ 
      //监听connection事件 
      this.pool.on('connection', function(connection) {  
        console.log('建立连接')
        // connection.query('SET SESSION auto_increment_increment=1'); 
        this.flag = false; 
      }); 
    } 
    return this.pool; 
  } 
}; 
module.exports = OptPool;