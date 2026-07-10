const Recurso = require("./tipoRecursoPrototipo");
const CantidadMB = require("./tipoCantidadMB");

function CantidadGB(cantidadDatosEnGB) {
  Recurso.call(this, cantidadDatosEnGB, "datos de Internet en GB");
  this.validarCeroOPositivo();
}

CantidadGB.prototype = Object.create(Recurso.prototype);
CantidadGB.prototype.constructor = CantidadGB;

CantidadGB.prototype.aGB = function() {
  return this;
};

CantidadGB.prototype.aMB = function() {
  return new CantidadMB(this.cantidad() * 1000); 
};

CantidadGB.prototype.agregarA = function(recursosPrestados) {
  recursosPrestados.agregarDatos(this);
};

CantidadGB.prototype.descontarPrestamoDe = function(paquete) {
  paquete.consumirDatos(this);
};

module.exports = CantidadGB;
