const FatherModel = require('./../../modules/class/fatherModel');


class Tablero extends FatherModel {

    constructor({nombre}){
        super();
        this.nombre = nombre;
        this.idUser = [];
        this.idColum = [];

    }

    static get collection(){
        return 'tableros'
    }

    get collection(){
        return 'tableros'
    }
}


module.exports = Tablero;