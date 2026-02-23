const ConsumoDeMinutos = function(cantidadDeMinutos, fechaHoraInicio, fechaHoraFin){
    this.cantidadDeMinutos = cantidadDeMinutos;
    this.fechaHoraInicio = fechaHoraInicio;
    this.fechaHoraFin = fechaHoraFin;

    this.aplicarEn = function(paquete){
        this.validarFechasDeConsumo();
        this.validarCantidadDeConsumo();
        paquete.descontarMinutos(this.cantidadDeMinutos, this.fechaHoraInicio, this.fechaHoraFin)
    }

    this.validarFechasDeConsumo = function(){
        if(this.fechaHoraInicio <= this.fechaHoraFin){
            throw Error("La fecha de finalización de consumo debe ser posterior a la del comienzo")
        }
    }

    this.validarCantidadDeMinutos = function(){
        if(this.cantidadDeMinutos <= 0){
            throw Error("La cantidad de minutos a consumir debe ser positiva")
        }
    }
}

module.exports = ConsumoDeMinutos