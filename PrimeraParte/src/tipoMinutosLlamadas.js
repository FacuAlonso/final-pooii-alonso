const Recurso = require("./recursoPrototipo");

function MinutosLlamadas(cantidadMinutosDeLlamadas) {
  Recurso.call(this, cantidadMinutosDeLlamadas, "minutos de llamada");
  this.validarCeroOPositivo(cantidadMinutosDeLlamadas)
}
MinutosLlamadas.prototype = Object.create(Recurso.prototype);

MinutosLlamadas.prototype.constructor = MinutosLlamadas;

MinutosLlamadas.prototype.aplicarConsumoEn = function(paquete, fechaHoraInicio, fechaHoraFin){
  paquete.descontarMinutos(this, fechaHoraInicio, fechaHoraFin)
}

module.exports = MinutosLlamadas