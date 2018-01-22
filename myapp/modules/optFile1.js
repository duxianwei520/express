var  fs=  require('fs');
module.exports={
    readfile:function(path){          //异步执行
        fs.readFile(path,  function  (err,  data)  {
            if  (err)  {
              console.log(err);
            }else{
              console.log(data.toString());
            }
        });
        console.log("异步方法执行完毕");
    },
    readfileSync:function(path){      //同步读取
        var  data  =  fs.readFileSync(path,'utf-8');
        //console.log(data);
        console.log("同步方法执行完毕");
        return  data;                
    },
    writefile:function(path,data){    //异步方式
        fs.writeFile(path,  data,  function  (err)  {
            if  (err)  {
                throw  err;
            }
            console.log('It\'s  saved!');  //文件被保存
          });
    },
    writeFileSync:function(path,data){  //同步方式
        fs.writeFileSync(path,  data);
        console.log("同步写文件完成");
    }
}