const Model = require('../../modules/class/fatherModel');



class User extends Model{
    constructor({nombre, apellido, email, contraseña}){
        super();
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.contraseña = contraseña

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