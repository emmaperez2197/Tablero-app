const jwt = require('jsonwebtoken');



class Token {

    static sing(data){
       return jwt.sign(data, process.env.KEY_PRELOGIN, { algorithm: 'RS256' });
    }

    static decode(token){
        return jwt.verify(token, process.env.KEY_PRELOGIN);
    }
}


module.exports = Token

// const decodeToken = (token)=>{
    
//     let token = jwt.verify(token, process.env.KEY_PRELOGIN);
//     return token
// }

// const jwtToken = (data)=>{

//    let token = jwt.sign(data, process.env.KEY_PRELOGIN, { algorithm: 'RS256' });
//     return token
// }
