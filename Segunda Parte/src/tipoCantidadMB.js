const Recurso = require("./tipoRecursoPrototipo");

function CantidadMB(cantidadDatosEnMB) {
  Recurso.call(this, cantidadDatosEnMB, "datos de Internet en MB");
  this.validarCeroOPositivo();
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

CantidadMB.prototype.aplicarConsumoEn = function(paquete, appConsumida){
  paquete.descontarDatos(this, appConsumida)
}

CantidadMB.prototype.agregarA = function(recursosPrestados) {
  recursosPrestados.agregarDatos(this)
}

module.exports = CantidadMB;
