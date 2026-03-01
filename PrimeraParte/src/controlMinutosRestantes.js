const ControlSinMinutosRestantes = require("./controlSinMinutosRestantes");


const ControlMinutosRestantes = function(minutos){
    
    this.minutosRestantes = minutos;

    this.calcularMinutosRestantes = function(){
        return this.minutosRestantes.cantidad()
    }

    this.descontar = function(minutosADescontar){
        if (this.minutosRestantes.esIgualEnValorA(minutosADescontar)){
            return new ControlSinMinutosRestantes() 
        }
        return new ControlMinutosRestantes(this.minutosRestantes.restar(minutosADescontar.cantidad()))
    }

    this.estaAgotado = function(){
        return this.minutosRestantes.esNulo()
    }

    this.renovarCon = function(){
        throw new Error("El paquete activo del cliente aún tiene minutos de llamada disponibles, por lo que no se puede renovar")
    }

}

module.exports = ControlMinutosRestantes
