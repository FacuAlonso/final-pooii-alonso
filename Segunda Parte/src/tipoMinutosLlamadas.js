const Recurso = require("./tipoRecursoPrototipo");

function MinutosLlamadas(cantidadMinutosDeLlamadas) {
  Recurso.call(this, cantidadMinutosDeLlamadas, "minutos de llamada");
  this.validarCeroOPositivo()
}

MinutosLlamadas.prototype = Object.create(Recurso.prototype);
MinutosLlamadas.prototype.constructor = MinutosLlamadas;

MinutosLlamadas.prototype.aplicarConsumoEn = function(paquete, fechaHoraInicio, fechaHoraFin){
  paquete.consumirMinutos(this, fechaHoraInicio, fechaHoraFin)
}

MinutosLlamadas.prototype.agregarA = function(recursosPrestados) {
  recursosPrestados.agregarMinutos(this);
};

MinutosLlamadas.prototype.descontarPrestamoDe = function(paquete) {
  paquete.consumirMinutos(this);
};

module.exports = MinutosLlamadas