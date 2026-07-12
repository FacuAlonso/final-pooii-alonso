const ControlPrototipo = require("./controlPrototipo");

const ControlMinutosRestantes = function(minutos){
    ControlPrototipo.call(this, minutos)
}

ControlMinutosRestantes.prototype = Object.create(ControlPrototipo.prototype);
ControlMinutosRestantes.prototype.constructor = ControlMinutosRestantes;

ControlMinutosRestantes.prototype.descontar = function(minutosADescontar){
    return new ControlMinutosRestantes(this.recursoRestante.restar(minutosADescontar))
}

module.exports = ControlMinutosRestantes