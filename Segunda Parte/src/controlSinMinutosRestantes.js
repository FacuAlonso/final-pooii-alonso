const ControlMinutosRestantes = require("./controlMinutosRestantes");
const MinutosLlamadas = require("./tipoMinutosLlamadas");

const ControlSinMinutosRestantes = function(){

    this.calcularMinutosRestantes = function(){
        return (new MinutosLlamadas(0)).cantidad()
    }

    this.descontar = function(){
        throw new Error("El cliente no tiene minutos de llamada disponible en su paquete actual")
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

    this.estaAgotado = function(){
        return true
    }

}

module.exports = ControlSinMinutosRestantes
