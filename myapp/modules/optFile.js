const fs = require('fs')

function resHead(res, type){
  if (type === 'image'){
    res.writeHead(200, {
      'Content-Type': 'image/jpeg',
    })
  } else {
    res.writeHead(200, {
      'Content-Type': 'text/html; chartset=utf-8',
    })
    res.write('<head><meta charset="utf-8"/></head>')
  }
}

module.exports = {
  readfileSync: (path, res, recall) => {
    if(res){
      resHead(res, 'text')
    }
    const data = fs.readFileSync(path, 'utf-8')
    recall(data)
  },
  readfile: (path, res, recall) => {
    if(res){
      resHead(res, 'text')
    }
    fs.readFile(path, 'utf8', (err, data) => {
      if(err) {
        console.log(err)
        // throw(err)
      }
      else {
        // console.log(data.toString())
        recall(data)
      }
    })
  },
  writeFile: (path, data, res, recall) => {
    if(res){
      resHead(res, 'text')
    }
    fs.writeFile(path, data, res, err => {
      if(err) {
        throw(err)        
      }
      else {
        recall(data)
      }
    })
  },
  readImg: (path, res) => {
    if(res){
      resHead(res, 'image')
    }
    fs.readFile(path, 'binary', (err, data) => {
      if(err) {
        throw(err)        
      }
      else {
        res.write(data, 'binary')
        res.end()
      }
    })
  }
}