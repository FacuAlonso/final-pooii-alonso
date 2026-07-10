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
        return new ControlMinutosRestantes(this.minutosRestantes.restar(minutosADescontar))
    }

    this.estaAgotado = function(){
        return this.minutosRestantes.esNulo()
    }

    this.validarPuedeDescontar = function(minutosADescontar){
        this.minutosRestantes.restar(minutosADescontar)
    }

    this.validarDescuentoEn = function(paquete){
        paquete.validarPuedeConsumirMinutos(this.minutosRestantes)
    }

    this.descontarDe = function(paquete){
        paquete.consumirMinutos(this.minutosRestantes)
    }
}

module.exports = ControlMinutosRestantes
