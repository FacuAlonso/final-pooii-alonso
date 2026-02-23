const RecursoConsumiblePositivo = require("./recursoPositivoPrototipo");
const CantidadGB = require("./tipoCantidadGB");

function CantidadMB(cantidadDatosEnMB) {
  RecursoConsumiblePositivo.call(this, cantidadDatosEnMB, "datos de Internet");
}
CantidadMB.prototype = Object.create(RecursoConsumiblePositivo.prototype);

CantidadMB.prototype.constructor = CantidadMB;

CantidadMB.prototype.aGB = function() {
  return new CantidadGB(this.monto / 1000);
};

CantidadMB.prototype.aMB = function() {
  return this;
};

module.exports= CantidadMB