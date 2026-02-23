const RecursoDeCuenta = require("./recursoDeCuentaPrototipo");

function MinutosLlamadas(cantidadMinutosDeLlamadas) {
  RecursoDeCuenta.call(this, cantidadMinutosDeLlamadas, "minutos de llamada");
}
MinutosLlamadas.prototype = Object.create(RecursoDeCuenta.prototype);
MinutosLlamadas.prototype.constructor = MinutosLlamadas;

module.exports = MinutosLlamadas