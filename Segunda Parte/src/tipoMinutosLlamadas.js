const Recurso = require("./tipoRecursoPrototipo");

function MinutosLlamadas(cantidadMinutosDeLlamadas) {
  Recurso.call(this, cantidadMinutosDeLlamadas, "minutos de llamada");
  this.validarCeroOPositivo()
}

MinutosLlamadas.prototype = Object.create(Recurso.prototype);
MinutosLlamadas.prototype.constructor = MinutosLlamadas;

MinutosLlamadas.prototype.aplicarConsumoEn = function(paquete){
  paquete.descontarMinutos(this)
}

MinutosLlamadas.prototype.agregarA = function(recursosPrestados) {
  recursosPrestados.agregarMinutos(this)
}

module.exports = MinutosLlamadas