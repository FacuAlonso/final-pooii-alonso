const ControlSinMinutosRestantes = require("./controlSinMinutosRestantes");


const ControlMinutosRestantes = function(minutos, paqueteControlado){
    this.minutosRestantes = minutos;
    this.paqueteControlado = paqueteControlado;

    this.calcularMinutosRestantes = function(){
        return this.minutosRestantes.cantidad()
    }

    this.descontar = function(minutosADescontar){
        if (this.minutosRestantes.esIgualEnValorA(minutosADescontar)){
            return new ControlSinMinutosRestantes() 
        }
        return new ControlMinutosRestantes(this.minutosRestantes.restar(minutosADescontar.cantidad()), paqueteControlado)
    }

    this.estaAgotado = function(){return false}

    this.renovarCon = function(){
        throw new Error("El paquete activo del cliente aún tiene minutos de llamada disponibles, por lo que no se puede renovar")
    }

}

module.exports = ControlMinutosRestantes
