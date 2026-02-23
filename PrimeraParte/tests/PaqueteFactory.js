// tests/factories/paqueteFactory.js (o arriba del test)
const PaqueteOfertado = require("../../src/paqueteOfertado");
const CantidadGB = require("../src/tipoCantidadGB");
const DineroPesos = require("../src/tipoDinero");
const DuracionEnDias = require("../src/tipoDuracionEnDias");
const MinutosLlamadas = require("../src/tipoMinutosLlamadas");

function crearPaqueteOfertado(cantidadGB, cantidadMinutos, cantidadDias, valorPrecio) {
  return new PaqueteOfertado(CantidadGB(cantidadGB), MinutosLlamadas(cantidadMinutos), DuracionEnDias(cantidadDias), DineroPesos(valorPrecio));
}

module.exports = crearPaqueteOfertado;