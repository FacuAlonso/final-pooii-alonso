const Recurso = require("./tipoRecursoPrototipo");
const CantidadGB = require("./tipoCantidadGB");

function CantidadMB(cantidadDatosEnMB) {
  Recurso.call(this, cantidadDatosEnMB, "datos de Internet");
  this.validarCeroOPositivo(cantidadDatosEnMB);
}

CantidadMB.prototype = Object.create(Recurso.prototype);

CantidadMB.prototype.constructor = CantidadMB;

CantidadMB.prototype.aGB = function() {
  return new CantidadGB(this.monto / 1000);
};

CantidadMB.prototype.aMB = function() {
  return this;
};

CantidadMB.prototype.aplicarConsumoEn = function(paquete, fechaHoraInicio, fechaHoraFin, appConsumida){
  paquete.consumirDatos(this, appConsumida)
};

CantidadMB.prototype.agregarA = function(recursosPrestados) {
  recursosPrestados.agregarDatos(this);
};

CantidadMB.prototype.descontarPrestamoDe = function(paquete) {
  paquete.consumirDatos(this);
};

module.exports = CantidadMB;
