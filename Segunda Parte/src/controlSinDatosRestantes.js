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

    this.validarPuedeDescontar = function(){
        return this.descontar()
    }

    this.validarDescuentoEn = function(){
        return this
    }

    this.descontarDe = function(){
        return this
    }

}

module.exports = ControlSinDatosRestantes
