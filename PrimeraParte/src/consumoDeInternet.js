const ConsumoDeInternet = function(cantidadDatos, fechaHoraInicio, fechaHoraFin){
    this.cantidadDatos = cantidadDatos;
    this.fechaHoraInicio = fechaHoraInicio;
    this.fechaHoraFin = fechaHoraFin;

    this.aplicarEn = function(paquete){
        this.validarFechasDeConsumo();
        paquete.descontarDatos(this.cantidadDatos, this.fechaHoraInicio, this.fechaHoraFin)
    }

    this.validarFechasDeConsumo = function(){
        if(this.fechaHoraInicio <= this.fechaHoraFin){
            throw Error("La fecha de finalización de consumo debe ser posterior a la del comienzo")
        }
    }

}

module.exports = ConsumoDeInternet