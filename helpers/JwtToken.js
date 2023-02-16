const jwt = require('jsonwebtoken');

class Token {

    static sing(data){
       return jwt.sign(JSON.stringify(data), process.env.KEY_PRELOGIN);
    }

    static  decode(token){
        return  jwt.verify(token, process.env.KEY_PRELOGIN);
    }
}


module.exports = Token

