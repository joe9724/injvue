const urlParser = document.createElement('a')

export function domain (url) {
  urlParser.href = url
  return urlParser.hostname
}

export function count (arr) {
  return arr.length
}

export function prettyDate (date) {
  var a = new Date(date)
  return a.toDateString()
}

export function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }

  return time + label + 's'
}

export function formatDateBtk (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

export function formatDATA (data, pos) {
  console.log('data is', data)
  console.log('pos is', pos)
  var value = ''
  // alert(status)
  var temp
  temp = data.split(',')
  console.log('temp is', temp)
  if (pos === 0) {
    value = temp[0]
  } else if (pos === 1) {
    value = temp[1]
  } else if (pos === 2) {
    value = temp[2]
  } else if (pos === 3) {
    value = temp[3]
  } else if (pos === 4) {
    value = temp[4]
  } else if (pos === 5) {
    value = temp[5]
  } else if (pos === 6) {
    value = temp[6]
  } else if (pos === 7) {
    value = temp[7]
  }
  return value
}

export function formatRealtimeStatus (status) {
  var value = ''
  // alert(status)
  if (status === 0) {
    value = '温度'
  } else if (status === 1) {
    value = '湿度'
  } else if (status === 2) {
    value = 'PM2.5'
  } else if (status === 3) {
    value = 'PM10'
  } else if (status === 4) {
    value = '臭氧'
  } else if (status === 5) {
    value = '二氧化硫'
  } else if (status === 6) {
    value = '二氧化氮'
  } else if (status === 7) {
    value = '一氧化碳'
  }
  return value
}

export function formatMsgStatus (status) {
  var value = ''
  // alert(status)
  if (status === 0) {
    value = 'Error'
  } else if (status === 1) {
    value = 'HeartBeat'
  } else if (status === 2) {
    value = 'Status'
  } else if (status === 3) {
    value = 'Config'
  } else if (status === 4) {
    value = 'Data'
  } else if (status === 5) {
    value = 'Warning'
  } else if (status === 6) {
    value = 'Request'
  } else {
    value = '未知'
  }
  return value
}

export function formatGender (status) {
  var value = ''
  // alert(status)
  if (status === 0) {
    value = '男'
  } else if (status === 1) {
    value = '女'
  } else {
    value = '保密'
  }
  return value
}

export function formatStatus (status) {
  var value = ''
  // alert(status)
  if (status === 0) {
    value = '正常'
  } else if (status === 1) {
    value = '锁定'
  } else if (status === -100) {
    value = '无效'
  } else if (status === 100) {
    value = '未分配'
  } else {
    value = '未知'
  }
  return value
}

export function formatOnline (status) {
  var value = ''
  // alert(status)
  if (status === 0) {
    value = '正常'
  } else if (status === 1) {
    value = '掉线'
  } else {
    value = '未知'
  }
  return value
}

export function OperationLogFilter (sb, action, target, id) {
  console.log('target is ', target)
  var finalstr = ''
  finalstr = finalstr + sb
  if (action === 1) {
    finalstr = finalstr + '添加'
  } else if (action === 2) {
    finalstr = finalstr + '删除'
  } else if (action === 3) {
    finalstr = finalstr + '修改'
  } else if (action === 4) {
    finalstr = finalstr + '查看'
  }
  finalstr = getAction(finalstr, target)
  return finalstr + ' [' + id + ']'
}

export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

function getAction (finalstr, target) {
  if (target === 1) {
    finalstr = finalstr + '用户'
  } else if (target === 2) {
    finalstr = finalstr + '组织机构'
  } else if (target === 3) {
    finalstr = finalstr + '设备'
  } else if (target === 4) {
    finalstr = finalstr + '密码'
  }
  return finalstr
}

/* function padLeftZero (str) {
  return ('00' + str).substr(str.length)
} */
