var express = require('express');
var router = express.Router();

const resEnd = require('../modules/end')
const OptPool = require('../modules/optPool')

const optPool = new OptPool()
const pool = optPool.getPool()

/* GET users listing. */
router.post('/', function(req, res, next) {
  let post = ''
  req.on('data', chunk => { // 获取post收到的数据
    post += chunk
  })
  req.on('end', () => {
    post = JSON.parse(post)
    //执行SQL语句 
    pool.getConnection((err, conn) => {
      //查询数据库
      const sql = 'SELECT * from user where uname=?'
      conn.query(sql, [post.username], (err, rs) => { 
        if (err) { 
          console.log('[query] - :' + err)
          return
        }
        if(rs.length){ // 匹配结果
          resEnd(res, {}, {status: 0, msg: '用户名已存在'})
        } else {
          const insert = 'insert into user (uname, pwd) values(?, ?)'
          const param = [post.username, post.password];
          conn.query(insert, param, (err, rs) => {
            if (err) {
              console.log('[insert] - :' + err)
              return
            }
            resEnd(res, {}, {status: 1, msg: '注册成功'})
          })
        }
        conn.release(); //放回连接池
      })
    })
  })
});

module.exports = router;
