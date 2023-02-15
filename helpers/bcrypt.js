const bcrypt = require('bcrypt');



class Bcrypt {

    constructor(){
    }
    static hashUser(password){
        return  bcrypt.hashSync(password, 12);
    
    }

    static anHash(newPassword, oldPassword){
        return  bcrypt.compare(newPassword, oldPassword);
    }
}

// const hashUser = (password) => hash = bcrypt.hashSync(password, 12);
    
// const checkUser =  (newPassword, oldPassword) =>  match =  bcrypt.compare(newPassword, oldPassword);


module.exports = Bcrypt;