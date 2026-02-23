const ControlMinutosRestantes = require("./controlMinutosRestantes");
const MinutosLlamadas = require("./tipoMinutosLlamadas");

const ControlSinMinutosRestantes = function(paqueteControlado){
    this.paqueteControlado = paqueteControlado;

    this.calcularDatosDisponibles = function(){
        return new MinutosLlamadas(0)
    }

    this.descontar = function(){
        throw new Error("El cliente no tiene minutos de llamada disponible en su paquete actual")
    }

    this.renovarCon = function(minutos){
        return new ControlMinutosRestantes(minutos, paqueteControlado)
    }
}

module.exports = ControlSinMinutosRestantes