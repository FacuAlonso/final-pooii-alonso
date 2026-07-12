const AppSinIdentificar = require("./appSinIdentificar");

const Consumo = function(recurso, fechaHoraInicio, fechaHoraFin, app = new AppSinIdentificar()){
    const recursoConsumido = recurso;
    const inicioDelConsumo = fechaHoraInicio;
    const finDelConsumo = fechaHoraFin;
    const appConsumida = app;

    this.calcularInicio = function(){
        return inicioDelConsumo
    }

    this.calcularFin = function(){
        return finDelConsumo
    }

    this.aplicarEn = function(paquete){
        recursoConsumido.aplicarConsumoEn(paquete, appConsumida)
    }

    const validarFechasDeConsumo = function(){
        if (inicioDelConsumo >= finDelConsumo){
            throw new Error("La fecha de finalización de consumo debe ser posterior a la del comienzo")
        }
    }

    validarFechasDeConsumo();

}

module.exports = Consumo
