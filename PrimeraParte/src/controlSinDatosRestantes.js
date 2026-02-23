const ControlDatosRestantes = require("./controlDatosRestantes");
const CantidadGB = require("./tipoCantidadGB");

const ControlSinDatosRestantes = function(paqueteControlado){
    this.paqueteControlado = paqueteControlado;

    this.calcularDatosDisponibles = function(){
        return new CantidadGB(0)
    }

    this.descontar = function(){
        throw new Error("El cliente no tiene datos de Internet disponible en su paquete actual")
    }

    this.renovarCon = function(cantidadDeDatos){
        return new ControlDatosRestantes(cantidadDeDatos, paqueteControlado)
    }
}

module.exports = ControlSinDatosRestantes