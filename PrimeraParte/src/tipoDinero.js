const RecursoConsumiblePositivo = require("./recursoPositivoPrototipo");

function Dinero(montoDinero) {
  RecursoConsumiblePositivo.call(this, montoDinero, "dinero");
}
Dinero.prototype = Object.create(RecursoConsumiblePositivo.prototype);
Dinero.prototype.constructor = Dinero;

Dinero.prototype.mensajeErrorDeSoloPositivo = function(){
  return "El monto de dinero debe ser positivo"
}; 

module.exports = Dinero