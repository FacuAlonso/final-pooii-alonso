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

}

module.exports = ControlMinutosRestantes
