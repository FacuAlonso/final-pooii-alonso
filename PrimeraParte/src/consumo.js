const Consumo = function(recurso, fechaHoraInicio, fechaHoraFin){
    this.recurso = recurso;
    this.fechaHoraInicio = fechaHoraInicio;
    this.fechaHoraFin = fechaHoraFin;

    this.calcularInicio = function(){
        return this.fechaHoraInicio
    }

    this.aplicarEn = function(paquete){
        this.recurso.aplicarConsumoEn(paquete, this.fechaHoraInicio, this.fechaHoraFin)
    }

    this.validarFechasDeConsumo = function(){
        if (this.fechaHoraInicio >= this.fechaHoraFin){
            throw Error("La fecha de finalización de consumo debe ser posterior a la del comienzo")
        }
    }

    this.validarFechasDeConsumo();

}

module.exports = Consumo