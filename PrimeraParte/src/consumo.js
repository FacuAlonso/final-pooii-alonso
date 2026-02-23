const CantidadMB = require("./tipoCantidadMB");

const Consumo = function(recurso, fechaHoraInicio, fechaHoraFin){
    this.recurso = recurso;
    this.fechaHoraInicio = fechaHoraInicio;
    this.fechaHoraFin = fechaHoraFin;

    this.aplicarEn = function(paquete){
        paquete.descontarDatos(this.recurso, this.fechaHoraInicio, this.fechaHoraFin)
    }

    this.validarFechasDeConsumo = function(){
        if(this.fechaHoraInicio >= this.fechaHoraFin){
            throw Error("La fecha de finalización de consumo debe ser posterior a la del comienzo")
        }
    }

    this.validarFechasDeConsumo();

}

module.exports = Consumo