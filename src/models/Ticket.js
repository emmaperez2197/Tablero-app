const FatherModel = require('./../../modules/class/fatherModel');



class Ticket extends FatherModel{

    constructor({titulo, descripcion, idUser}){
        super();
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.idUser = idUser;
    }

    static get collection(){
        return 'tickets'
    }

    get collection(){
        return 'tickets'
    }
}

module.exports = Ticket;