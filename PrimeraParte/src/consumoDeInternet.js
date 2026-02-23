const ConsumoDeInternet = function(cantidadDeMB, fechaHoraInicio, fechaHoraFin){
    this.cantidadDeMB = cantidadDeMB;
    this.fechaHoraInicio = fechaHoraInicio;
    this.fechaHoraFin = fechaHoraFin;

    this.aplicarEn = function(paquete){
        this.validarFechasDeConsumo();
        this.validarCantidadDeMB();
        paquete.descontarDatos(this.cantidadDeMB, this.fechaHoraInicio, this.fechaHoraFin)
    }

    this.validarFechasDeConsumo = function(){
        if(this.fechaHoraInicio <= this.fechaHoraFin){
            throw Error("La fecha de finalización de consumo debe ser posterior a la del comienzo")
        }
    }

    this.validarCantidadDeMB = function(){
        if(this.cantidadDeMB <= 0){
            throw Error("El tráfico de datos a consumir debe ser positivo")
        }
    }
}

module.exports = ConsumoDeInternet