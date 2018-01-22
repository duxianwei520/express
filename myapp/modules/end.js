
function end(res, data, result){
  let resTemplate = {
    data: {},
    msg: '',
    status: 1,
  }
  resTemplate.data = data
  resTemplate.status = result.status
  resTemplate.msg = result.msg
  res.json(resTemplate);
}

module.exports = end