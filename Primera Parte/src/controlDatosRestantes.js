const ControlPrototipo = require("./controlPrototipo");

const ControlDatosRestantes = function(datos){
    ControlPrototipo.call(this, datos)
}

ControlDatosRestantes.prototype = Object.create(ControlPrototipo.prototype);
ControlDatosRestantes.prototype.constructor = ControlDatosRestantes;

ControlDatosRestantes.prototype.descontar = function(datos){
    return new ControlDatosRestantes(this.recursoRestante.restar(datos.aGB()))
}

module.exports = ControlDatosRestantes