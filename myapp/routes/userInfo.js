var express = require('express');
var router = express.Router();

const resEnd = require('../modules/end')
const OptPool = require('../modules/optPool')

const optPool = new OptPool()
const pool = optPool.getPool()

const checkToken = require('../modules/checkToken')

/* GET users listing. */
router.post('/', function(req, res, next) {
  let post = ''
  req.on('data', chunk => { // 获取post收到的数据
    post += chunk
  })
  req.on('end', () => {
    post = JSON.parse(post)
    console.log(req.token)
    new Promise(checkToken(req, res))
      .then(
        //执行SQL语句 
        () => pool.getConnection((err, conn) => {
          //查询数据库
          const sql = 'SELECT * from user where uname=?'
          console.log(req.token.user)
          conn.query(sql, [req.token.user], (err, rs) => { 
            if (err) { 
              console.log('[query] - :' + err)
              return
            }
            // if(rs && rs[0]){
              let data = Object.assign(rs[0], {token: req.cookies.token})
              resEnd(res, {username:data.uname, token: data.token, id: data.uid}, {status: 1, msg: '获取用户信息成功'})
            // } else {
              // resEnd(res, {}, {status: -1, msg: '登录超时'})
            // }
            conn.release(); //放回连接池
          })
        })
      )
      .catch(e => {
        console.log(e)
      })
  })
});

module.exports = router;
