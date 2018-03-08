var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;


// create table user(  
//   uid int not null primary key auto_increment,  
//   uname varChar(100) not null,  
//   pwd varChar(100) not null   
// )ENGINE=InnoDB DEFAULT CHARSET=utf8;
