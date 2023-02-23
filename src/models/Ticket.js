const FatherModel = require('./../../modules/class/fatherModel');



class Ticket extends FatherModel{

    constructor({titulo, descripcion, idUser, idColum}){
        super();
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.idUser = idUser;
        this.idColum = idColum;
    }

    static get collection(){
        return 'tickets'
    }

    get collection(){
        return 'tickets'
    }
}

module.exports = Ticket;