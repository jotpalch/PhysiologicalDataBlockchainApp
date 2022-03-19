const jwt = require('jsonwebtoken')

Header = {
    "alg": "HS256", 
    "typ": "JWT"
}

user = {
    "_id": "123", 
    "name": "Mike",
    "exp": 1300819380
}

// 設定密鑰
const SECRET = 'thisismynewproject'
// 建立 Token
const token = jwt.sign({ _id: user._id.toString() }, SECRET, { expiresIn: '1 day' })
console.log(token);