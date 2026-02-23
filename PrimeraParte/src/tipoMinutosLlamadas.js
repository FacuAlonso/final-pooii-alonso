const RecursoConsumiblePositivo = require("./recursoPositivoPrototipo");

function MinutosLlamadas(cantidadMinutosDeLlamadas) {
  RecursoConsumiblePositivo.call(this, cantidadMinutosDeLlamadas, "minutos de llamada");
}
MinutosLlamadas.prototype = Object.create(RecursoConsumiblePositivo.prototype);
MinutosLlamadas.prototype.constructor = MinutosLlamadas;

module.exports = MinutosLlamadas