const FatherModel = require('./../../modules/class/fatherModel');



class Colum extends FatherModel{

    constructor({nombre}){
        super();
        this.nombre = nombre;
        this.idTicket = [];

    }

    static get collection(){
        return 'colums'
    }

    get collection(){
        return 'colums'
    }
}

module.exports = Ticket;