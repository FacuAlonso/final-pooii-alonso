const RecursoDeCuenta = require("./recursoPrototipo");

function DuracionEnDias(numeroDias) {
  RecursoDeCuenta.call(this, numeroDias, "días");
}
DuracionEnDias.prototype = Object.create(RecursoDeCuenta.prototype);
DuracionEnDias.prototype.constructor = DuracionEnDias;

DuracionEnDias.prototype.mensajeErrorDeSoloPositivo = function(){
  return "La duración del paquete debe ser de al menos 1 día"
};

DuracionEnDias.prototype.mensajeErrorDeCeroOPositivo = function(){
  return "La duración del paquete debe ser de al menos 1 día"
}; 

module.exports = DuracionEnDias