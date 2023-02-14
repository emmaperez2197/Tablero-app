const Model = require('../../modules/class/fatherModel');



class User extends Model{
    constructor({nombre, apellido, email}){
        super();
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;

    }


    static get collection(){
        return 'users';
    }

    get collection(){
        return 'users';
    }


    static get statuses(){
        return {
            active: 'active',
            inactuve: 'inactive'
        }
    }

}


module.exports = User;