const RecursoConsumiblePositivo = require("./recursoPositivoPrototipo");

function DineroPesos(montoDinero) {
  RecursoConsumiblePositivo.call(this, montoDinero, "dinero");
}
DineroPesos.prototype = Object.create(RecursoConsumiblePositivo.prototype);
DineroPesos.prototype.constructor = DineroPesos;

DineroPesos.prototype.mensajeErrorDeSoloPositivo = function(){
  return "El monto de dinero debe ser positivo"
}; 

module.exports = DineroPesos