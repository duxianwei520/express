
const resEnd = require('../modules/end')

// 检测token是否合法
const checkToken = (req, res) => (resolve, reject) => {
  if(req && req.token && req.token.user){
    resolve()
  } else {
    const msg = '登录超时'
    resEnd(res, {}, {status: -1, msg: msg})
    reject(msg)
  }
}
module.exports = checkToken