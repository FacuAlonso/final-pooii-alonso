const PaqueteOfertado = require("../src/paqueteOfertado");
const CantidadGB = require("../src/tipoCantidadGB");
const DineroPesos = require("../src/tipoDineroPesos");
const DuracionEnDias = require("../src/tipoDuracionEnDias");
const MinutosLlamadas = require("../src/tipoMinutosLlamadas");

function crearPaqueteOfertado(cantidadGB, cantidadMinutos, cantidadDias, valorPrecio) {
  return new PaqueteOfertado(new CantidadGB(cantidadGB), new MinutosLlamadas(cantidadMinutos), new DuracionEnDias(cantidadDias), new DineroPesos(valorPrecio));
};

function paqueteDe10GBUnaSemana(precio = 5000) {
  return crearPaqueteOfertado(10, 1200, 7, precio);
}

function paqueteDe10GBUnaSemanaSinMinutos(precio = 5000) {
  return crearPaqueteOfertado(10, 0, 7, precio);
}

function paqueteDe10GBUnDia(precio = 5000) {
  return crearPaqueteOfertado(10, 1200, 1, precio);
}

function paqueteDe10GBUnDiaSinMinutos(precio = 5000) {
  return crearPaqueteOfertado(10, 0, 1, precio);
}

function paqueteDe50GBUnMes(precio = 10000) {
  return crearPaqueteOfertado(50, 600, 30, precio);
}

function paqueteDe1GBUnaSemana(precio = 600) {
  return crearPaqueteOfertado(1, 120, 7, precio);
}

module.exports = {
  paqueteDe10GBUnaSemana,
  paqueteDe10GBUnaSemanaSinMinutos,
  paqueteDe10GBUnDia,
  paqueteDe10GBUnDiaSinMinutos,
  paqueteDe50GBUnMes,
  paqueteDe1GBUnaSemana,
};
