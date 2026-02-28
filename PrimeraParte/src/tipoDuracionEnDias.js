const Recurso = require("./recursoPrototipo");

function DuracionEnDias(numeroDias) {
  Recurso.call(this, numeroDias, "días");
  this.validarSoloPositivo(numeroDias)
}
DuracionEnDias.prototype = Object.create(Recurso.prototype);

DuracionEnDias.prototype.constructor = DuracionEnDias;

DuracionEnDias.prototype.mensajeErrorDeSoloPositivo = function(){
  return "La duración del paquete debe ser de al menos 1 día"
};

module.exports = DuracionEnDias