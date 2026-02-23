const PaqueteActivo = require("./paqueteActivo");
const CantidadGB = require("./tipoCantidadGB");
const DineroPesos = require("./tipoDinero");
const duracionEnDias = require("./tipoDuracionEnDias");
const MinutosLlamadas = require("./tipoMinutosLlamadas");

const PaqueteOfertado = function(montoGBDatos, montoMinutosLlamadas, numeroDias, precio){

    this.montoGBDatos = montoGBDatos;
    this.montoMinutosLlamadas = montoMinutosLlamadas;
    this.diasDeDuracion = numeroDias;
    this.precio = precio;

    this.calcularPrecio = function(){
        return this.precio.cantidad();
    }

    this.activarAlMomentoDe = function(fechaActivacion = new Date()){
        return new PaqueteActivo(montoGBDatos, montoMinutosLlamadas, numeroDias, fechaActivacion);
    }

    this.descontarDatos = function(){
        throw Error("El paquete ofertado primero debe ser adquirido para su activación y consumo de datos de Internet")
    }

    this.descontarMinutos = function(){
        throw Error("El paquete ofertado primero debe ser adquirido para su activación y consumo de minutos de llamada")
    }

    this.validarVencimiento = function(){
        return this
    }
}

module.exports = PaqueteOfertado