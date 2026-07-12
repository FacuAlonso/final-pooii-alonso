const ControlPrototipo = require("./controlPrototipo");

const ControlDatosRestantes = function(datosRestantes){
    ControlPrototipo.call(this, datosRestantes)
}

ControlDatosRestantes.prototype = Object.create(ControlPrototipo.prototype);
ControlDatosRestantes.prototype.constructor = ControlDatosRestantes;

ControlDatosRestantes.prototype.descontar = function(datos){
    return new ControlDatosRestantes(this.recursoRestante.restar(datos.aGB()))
}

ControlDatosRestantes.prototype.validarPuedeDescontar = function(datos){
    this.recursoRestante.restar(datos.aGB())
}

ControlDatosRestantes.prototype.validarDescuentoEn = function(paquete){
    paquete.validarPuedeConsumirDatos(this.recursoRestante)
}

ControlDatosRestantes.prototype.descontarDe = function(paquete){
    paquete.aplicarConsumoDatos(this.recursoRestante)
}

module.exports = ControlDatosRestantes
