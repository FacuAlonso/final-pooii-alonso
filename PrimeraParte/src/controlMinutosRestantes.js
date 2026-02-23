const ControlSinMinutosRestantes = require("./controlSinMinutosRestantes");

const ControlMinutosRestantes = function(minutos, paqueteControlado){
    this.minutosRestantes = minutos;
    this.paqueteControlado = paqueteControlado;

    this.calcularDatosDisponibles = function(){
        return this.minutosRestantes
    }

    this.descontar = function(minutosADescontar){

        if(this.minutosRestantes === minutosADescontar){
            return new ControlSinMinutosRestantes() 
        }

        return new ControlMinutosRestantes(this.minutosRestantes-minutosADescontar, paqueteControlado)
    }

    this.renovarCon = function(){
        throw new Error("El paquete activo del cliente aún tiene minutos de llamada disponibles, por lo que no se puede renovar")
    }

    this.validarMinutosInsuficientes = function(minutosADescontar){
        if(this.minutosRestantes < minutosADescontar){
            throw new Error("El paquete activo del cliente no tiene minutos restantes para cubrir tal consumo")
        }
    }
}

module.exports = ControlMinutosRestantes
