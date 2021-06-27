import Mock from 'mockjs' // 引入mockjs
const Random = Mock.Random // Mock.Random 是一个工具类，用于生成各种随机数据

let data = [] // 用于接受生成数据的数组
for (let i = 0; i < 10; i++) { // 可自定义生成的个数
  let template = {
    'Boolean': Random.boolean(), // 可以生成基本数据类型
    'Natural': Random.natural(1, 10), // 生成1到100之间自然数
    'Integer': Random.integer(1, 100), // 生成1到100之间的整数
    'Float': Random.float(0, 100, 0, 5), // 生成0到100之间的浮点数,小数点后尾数为0到5位
    'Character': Random.character(), // 生成随机字符串,可加参数定义规则
    'String': Random.string(2, 10), // 生成2到10个字符之间的字符串
    'Range': Random.range(0, 10, 2), // 生成一个随机数组
    'Date': Random.date(), // 生成一个随机日期,可加参数定义日期格式
    'Image': Random.image(Random.size, '#02adea', 'Hello'), // Random.size表示将从size数据中任选一个数据
    'Color': Random.color(), // 生成一个颜色随机值
    'Paragraph': Random.paragraph(2, 5), // 生成2至5个句子的文本
    'Name': Random.name(), // 生成姓名
    'Url': Random.url(), // 生成web地址
    'Address': Random.province() // 生成地址
  }
  data.push(template)
}

let hotels = [
  {
    hid: 1,
    addr: '中国，上海，延安西路1303号',
    hname: '如家酒店·neo',
    star: 2,
    hpicture: '/static/hotel_img/1.jpg',
    longitude: 121.435224,
    latitude: 31.216201
  },
  {
    hid: 2,
    addr: '中国，上海，沪青平公路1209号',
    hname: '维也纳酒店(上海虹桥国家会展中心店)',
    star: 3,
    hpicture: '/static/hotel_img/2.jpg',
    longitude: 121.332638,
    latitude: 31.174264
  },
  {
    hid: 3,
    addr: '中国，四川，成都，滨江中路9号',
    hname: '成都万达瑞华酒店',
    star: 5,
    hpicture: '/static/hotel_img/3.jpg',
    longitude: 104.076177,
    latitude: 30.653319
  }
]
let rooms = [
  {
    rid: 1,
    hid: 1,
    roomtype: '单人间',
    breakfast: '无',
    people_lim: 1,
    price: 10.9,
    number: '1001',
    img: '/static/room_img/rm1.png'
  },
  {
    rid: 2,
    hid: 1,
    roomtype: '单人间',
    breakfast: '有',
    people_lim: 3,
    price: 11.9,
    number: '1002',
    img: '/static/room_img/rm2.png'
  },
  {
    rid: 3,
    hid: 2,
    roomtype: '单人间',
    breakfast: '有',
    people_lim: 1,
    price: 10.9,
    number: '3001',
    img: '/static/room_img/rm3.png'
  },
  {
    rid: 4,
    hid: 2,
    roomtype: '单人间',
    breakfast: '有',
    people_lim: 3,
    price: 11.9,
    number: '3002',
    img: '/static/room_img/rm4.png'
  },
  {
    rid: 5,
    hid: 1,
    roomtype: '单人间',
    breakfast: '有',
    people_lim: 3,
    price: 12.9,
    number: '1003',
    img: '/static/room_img/rm4.png'
  },
  {
    rid: 6,
    hid: 2,
    roomtype: '单人间',
    breakfast: '有',
    people_lim: 3,
    price: 12.9,
    number: '3003',
    img: '/static/room_img/rm5.webp'
  }
]
let comments = [
  {
    rid: 1,
    email: '10001@qq.com',
    nickname: '用户1',
    content: '1\n很舒服\n很舒服'
  },
  {
    rid: 2,
    email: '10002@qq.com',
    nickname: '用户2',
    content: '2\n不好'
  },
  {
    rid: 3,
    email: '10002@qq.com',
    nickname: '用户2',
    content: '3\n不好'
  },
  {
    rid: 4,
    email: '10002@qq.com',
    nickname: '用户2',
    content: '4\n不好'
  },
  {
    rid: 1,
    email: '10002@qq.com',
    nickname: '用户2',
    content: '5\n不好'
  }
]

function paramsURL (url) {
  let res = []
  if (url.indexOf('?') === -1 || url.indexOf('=') <= 0) {
    return res
  }
  let arr = url.split('?')[1].split('&')
  arr.forEach(function (currentValue) {
    res[currentValue.split('=')[0]] = currentValue.split('=')[1]
  })
  return res
}

Mock.mock(RegExp('/hotel/gethotel' + '.*'), 'get', (options) => {
  let hid = parseInt(paramsURL(options.url)['hid'])
  if (hid > hotels.length) return ''
  let res = []
  for (let x of rooms) {
    if (x.hid === hid) {
      res.push(x)
    }
  }
  return {
    hotel: hotels[hid - 1],
    rooms: res
  }
})

Mock.mock(RegExp('/room/getroom' + '.*'), 'get', (options) => {
  let rid = parseInt(paramsURL(options.url)['rid'])
  return Object.assign(rooms[rid - 1], {hotel: hotels[rooms[rid - 1].hid - 1]})
})

Mock.mock(RegExp('/rcomment/rcomment' + '.*'), 'get', (options) => {
  let rid = parseInt(paramsURL(options.url)['rid'])
  let res = []
  for (let c of comments) {
    if (c.rid === rid) {
      res.push(c)
    }
  }
  return res
})

Mock.mock(RegExp('/rcomment/new_comment' + '.*'), 'post', (options) => {
  if (Random.boolean()) return {code: 200, msg: '评论成功'}
  return {code: 301, msg: '请先登录'}
})

Mock.mock(RegExp('/dingdan/order' + '.*'), 'post', (options) => {
  let rid = parseInt(paramsURL(options.url)['rid'])
  let res = []
  for (let c of comments) {
    if (c.rid === rid) {
      res.push(c)
    }
  }
  return res
})
