const PaqueteOfertado = require("../src/paqueteOfertado");
const CantidadGB = require("../src/tipoCantidadGB");
const DineroPesos = require("../src/tipoDinero");
const DuracionEnDias = require("../src/tipoDuracionEnDias");
const MinutosLlamadas = require("../src/tipoMinutosLlamadas");

function crearPaqueteOfertado(cantidadGB, cantidadMinutos, cantidadDias, valorPrecio) {
  return new PaqueteOfertado(new CantidadGB(cantidadGB), new MinutosLlamadas(cantidadMinutos), new DuracionEnDias(cantidadDias), new DineroPesos(valorPrecio));
};

module.exports = crearPaqueteOfertado;