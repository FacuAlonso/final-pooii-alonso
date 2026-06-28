const ControlSinMinutosRestantes = require("./controlSinMinutosRestantes");

const ControlMinutosRestantes = function(minutos){
    
    const minutosRestantes = minutos;

    this.calcularMinutosRestantes = function(){
        return minutosRestantes.cantidad()
    }

    this.descontar = function(minutosADescontar){
        if (minutosRestantes.esIgualEnValorA(minutosADescontar)){
            return new ControlSinMinutosRestantes() 
        }
        return new ControlMinutosRestantes(minutosRestantes.restar(minutosADescontar.cantidad()))
    }

    this.estaAgotado = function(){
        return minutosRestantes.esNulo()
    }

}

module.exports = ControlMinutosRestantes
