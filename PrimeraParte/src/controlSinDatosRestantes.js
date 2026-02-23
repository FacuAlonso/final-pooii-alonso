const ControlDatosRestantes = require("./controlDatosRestantes");

const ControlSinDatosRestantes = function(paqueteControlado){
    this.paqueteControlado = paqueteControlado;

    this.calcularDatosDisponibles = function(){
        return 0
    }

    this.descontar = function(){
        throw new Error("El cliente no tiene datos de Internet disponible en su paquete actual")
    }

    this.renovarCon = function(cantidadDeDatos){
        return new ControlDatosRestantes(cantidadDeDatos.aGB(), paqueteControlado)
    }
}

module.exports = ControlSinDatosRestantes