const Recurso = require("./tipoRecursoPrototipo");

function MinutosLlamadas(cantidadMinutosDeLlamadas) {
  Recurso.call(this, cantidadMinutosDeLlamadas, "minutos de llamada");
  this.validarCeroOPositivo(cantidadMinutosDeLlamadas)
}
MinutosLlamadas.prototype = Object.create(Recurso.prototype);

MinutosLlamadas.prototype.constructor = MinutosLlamadas;

MinutosLlamadas.prototype.aplicarConsumoEn = function(paquete, fechaHoraInicio, fechaHoraFin){
  paquete.consumirMinutos(this, fechaHoraInicio, fechaHoraFin)
}

module.exports = MinutosLlamadas