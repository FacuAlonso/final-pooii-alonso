const ControlPrototipo = require("./controlPrototipo");

const ControlMinutosRestantes = function(minutos){
    
    ControlPrototipo.call(this, minutos)
}

ControlMinutosRestantes.prototype = Object.create(ControlPrototipo.prototype);
ControlMinutosRestantes.prototype.constructor = ControlMinutosRestantes;

ControlMinutosRestantes.prototype.descontar = function(minutosADescontar){
    return new ControlMinutosRestantes(this.recursoRestante.restar(minutosADescontar))
}

ControlMinutosRestantes.prototype.validarPuedeDescontar = function(minutosADescontar){
    this.recursoRestante.restar(minutosADescontar)
}

ControlMinutosRestantes.prototype.validarDescuentoEn = function(paquete){
    paquete.validarPuedeConsumirMinutos(this.recursoRestante)
}

ControlMinutosRestantes.prototype.descontarDe = function(paquete){
    paquete.aplicarConsumoMinutos(this.recursoRestante)
}

module.exports = ControlMinutosRestantes
