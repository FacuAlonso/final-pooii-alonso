const RecursoDeCuenta = require("./recursoDeCuentaPrototipo");
const CantidadGB = require("./tipoCantidadGB");

function CantidadMB(cantidadDatosEnMB) {
  RecursoDeCuenta.call(this, cantidadDatosEnMB, "datos de Internet");
}
CantidadMB.prototype = Object.create(RecursoDeCuenta.prototype);

CantidadMB.prototype.constructor = CantidadMB;

CantidadMB.prototype.aGB = function() {
  return new CantidadGB(this.monto / 1000);
};

CantidadMB.prototype.aMB = function() {
  return this;
};

module.exports= CantidadMB