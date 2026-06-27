const Recurso = require("./tipoRecursoPrototipo");
const CantidadMB = require("./tipoCantidadMB");

function CantidadGB(cantidadDatosEnGB) {
  Recurso.call(this, cantidadDatosEnGB, "datos de Internet");
  this.validarCeroOPositivo(cantidadDatosEnGB);
}
CantidadGB.prototype = Object.create(Recurso.prototype);

CantidadGB.prototype.constructor = CantidadGB;

CantidadGB.prototype.aGB = function() {
  return this;
};

CantidadGB.prototype.aMB = function() {
  return new CantidadMB(this.monto * 1000); 
};


module.exports = CantidadGB;
