const RecursoDeCuenta = require("./recursoDeCuentaPrototipo");
const CantidadMB = require("./tipoCantidadMB");

function CantidadGB(cantidadDatosEnGB) {
  RecursoDeCuenta.call(this, cantidadDatosEnGB, "datos de Internet");
}

CantidadGB.prototype = Object.create(RecursoDeCuenta.prototype);

CantidadGB.prototype.constructor = CantidadGB;

CantidadGB.prototype.aGB = function() {
  return this;
};

CantidadGB.prototype.aMB = function() {
  return new CantidadMB(this.monto * 1000); 
};

module.exports = CantidadGB