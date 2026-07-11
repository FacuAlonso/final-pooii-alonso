const ControlDatosRestantes = require("./controlDatosRestantes");
const CantidadGB = require("./tipoCantidadGB");

const ControlSinDatosRestantes = function(){

    this.calcularDatosRestantes = function(){
        return (new CantidadGB(0)).cantidad()
    }

    this.descontar = function(){
        throw new Error("El cliente no tiene datos de Internet disponible en su paquete actual")
    }

    this.estaAgotado = function(){
        return true
    }

}

module.exports = ControlSinDatosRestantes