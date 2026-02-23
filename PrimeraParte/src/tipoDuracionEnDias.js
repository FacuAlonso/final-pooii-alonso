const RecursoDeCuenta = require("./recursoDeCuentaPrototipo");

function duracionEnDias(numeroDias) {
  RecursoDeCuenta.call(this, numeroDias, "días");
}
duracionEnDias.prototype = Object.create(RecursoDeCuenta.prototype);
duracionEnDias.prototype.constructor = duracionEnDias;

duracionEnDias.prototype.mensajeErrorDeSoloPositivo = function(){
  return "La duración del paquete debe ser de al menos 1 día"
};

duracionEnDias.prototype.mensajeErrorDeCeroOPositivo = function(){
  return "La duración del paquete debe ser de al menos 1 día"
}; 

module.exports = duracionEnDias