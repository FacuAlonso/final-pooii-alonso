const ControlMinutosRestantes = require("./controlMinutosRestantes");
const MinutosLlamadas = require("./tipoMinutosLlamadas");

const ControlSinMinutosRestantes = function(){

    this.calcularMinutosRestantes = function(){
        return (new MinutosLlamadas(0)).cantidad()
    }

    this.descontar = function(){
        throw new Error("El cliente no tiene minutos de llamada disponible en su paquete actual")
    }

    this.estaAgotado = function(){return true}

    this.renovarCon = function(minutos){
        return new ControlMinutosRestantes(minutos)
    }


}

module.exports = ControlSinMinutosRestantes