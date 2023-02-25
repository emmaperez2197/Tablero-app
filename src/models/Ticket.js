const FatherModel = require('./../../modules/class/fatherModel');



class Ticket extends FatherModel{

    constructor({titulo, descripcion,  informer,assigned, idColum}){
        super();
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.informer = FatherModel.parseId(informer);
        this.assigned = FatherModel.parseId(assigned);
        this.idColum =  FatherModel.parseId(idColum);
    }

    static get collection(){
        return 'tickets'
    }

    get collection(){
        return 'tickets'
    }
}

module.exports = Ticket;