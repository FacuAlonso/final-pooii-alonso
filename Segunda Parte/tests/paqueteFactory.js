const AppSinIdentificar = require("../src/appSinIdentificar");
const AppUsoIlimitado = require("../src/appUsoIlimitado");
const PaqueteOfertado = require("../src/paqueteOfertado");
const CantidadGB = require("../src/tipoCantidadGB");
const DineroPesos = require("../src/tipoDineroPesos");
const DuracionEnDias = require("../src/tipoDuracionEnDias");
const MinutosLlamadas = require("../src/tipoMinutosLlamadas");

function crearPaqueteOfertado(cantidadGB, cantidadMinutos, cantidadDias, valorPrecio, appUsoIlimitado) {
  return new PaqueteOfertado(new CantidadGB(cantidadGB), new MinutosLlamadas(cantidadMinutos), new DuracionEnDias(cantidadDias), new DineroPesos(valorPrecio), appUsoIlimitado);
};

function paqueteDe10GBy20HsUnaSemana(precio = 5000) {
  return crearPaqueteOfertado(10, 1200, 7, precio);
}

function paqueteDe10GBUnaSemana(precio = 5000) {
  return crearPaqueteOfertado(10, 0, 7, precio);
}

function paqueteDe10GBy20HsUnDia(precio = 5000) {
  return crearPaqueteOfertado(10, 1200, 1, precio);
}

function paqueteDe10GBUnDia(precio = 5000) {
  return crearPaqueteOfertado(10, 0, 1, precio);
}

function paqueteDe50GBUnMes(precio = 10000) {
  return crearPaqueteOfertado(50, 0, 30, precio);
}

function paqueteDe1GBUnaSemana(precio = 600) {
  return crearPaqueteOfertado(1, 0, 7, precio);
}

function paqueteDe10GBUnaSemanaWhatsAppIlimitado(precio = 5000) {
  return crearPaqueteOfertado(10, 0, 7, precio, new AppUsoIlimitado("WhatsApp"));
}

module.exports = {
  paqueteDe10GBy20HsUnaSemana,
  paqueteDe10GBUnaSemana,
  paqueteDe10GBy20HsUnDia,
  paqueteDe10GBUnDia,
  paqueteDe50GBUnMes,
  paqueteDe1GBUnaSemana,
  paqueteDe10GBUnaSemanaWhatsAppIlimitado,
};
