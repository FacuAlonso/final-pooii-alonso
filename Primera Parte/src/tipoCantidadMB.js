const Recurso = require("./tipoRecursoPrototipo");

function CantidadMB(cantidadDatosEnMB) {
  Recurso.call(this, cantidadDatosEnMB, "datos de Internet en MB");
  this.validarCeroOPositivo()
}

CantidadMB.prototype = Object.create(Recurso.prototype);
CantidadMB.prototype.constructor = CantidadMB;

CantidadMB.prototype.aGB = function() {
  const CantidadGB = require("./tipoCantidadGB");
  return new CantidadGB(this.cantidad() / 1000)
}

CantidadMB.prototype.aMB = function() {
  return this
}

CantidadMB.prototype.aplicarConsumoEn = function(paquete, fechaHoraInicio, fechaHoraFin){
  paquete.descontarDatos(this, fechaHoraInicio, fechaHoraFin)
}

module.exports = CantidadMB;