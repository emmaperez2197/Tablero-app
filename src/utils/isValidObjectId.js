
const Mongodb = require('mongodb')

module.exports = id => {
    
    try {
        new Mongodb.ObjectId(id);        
        return true
    } catch (err) {

        return false
    }
}