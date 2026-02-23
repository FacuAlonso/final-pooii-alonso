const RecursoDeCuenta = require("./recursoPrototipo");

function MinutosLlamadas(cantidadMinutosDeLlamadas) {
  RecursoDeCuenta.call(this, cantidadMinutosDeLlamadas, "minutos de llamada");
}
MinutosLlamadas.prototype = Object.create(RecursoDeCuenta.prototype);
MinutosLlamadas.prototype.constructor = MinutosLlamadas;

MinutosLlamadas.prototype.aplicarConsumoEn = function(paquete, fechaHoraInicio, fechaHoraFin){
  paquete.descontarMinutos(this, fechaHoraInicio, fechaHoraFin)
}

MinutosLlamadas.prototype.mensajeErrorDeSoloPositivo = function(){
  return "La cantidad de minutos de llamada no puede ser negativa"
};

module.exports = MinutosLlamadas