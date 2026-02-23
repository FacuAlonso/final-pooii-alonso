const RecursoConsumiblePositivo = require("./recursoPositivoPrototipo");

function duracionEnDias(numeroDias) {
  RecursoConsumiblePositivo.call(this, numeroDias, "días");
}
duracionEnDias.prototype = Object.create(RecursoConsumiblePositivo.prototype);
duracionEnDias.prototype.constructor = duracionEnDias;

duracionEnDias.prototype.mensajeErrorDeSoloPositivo = function(){
  return "La duración del paquete debe ser de al menos 1 día"
};

duracionEnDias.prototype.mensajeErrorDeCeroOPositivo = function(){
  return "La duración del paquete debe ser de al menos 1 día"
}; 

module.exports = duracionEnDias