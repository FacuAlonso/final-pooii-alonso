const PaqueteOfertado = function(montoGBDatos, montoMinutosLlamadas, numeroDias, montoPrecio){

    this.calcularPrecio = function(){
        return montoPrecio.cantidad()
    }

    this.activarAlMomentoDe = function(fechaActivacion = new Date()){
        const PaqueteActivo = require("./paqueteActivo");
        return new PaqueteActivo(montoGBDatos, montoMinutosLlamadas, numeroDias, fechaActivacion, montoPrecio)
    }

    this.descontarDatos = function(){
        throw new Error("El paquete ofertado primero debe ser adquirido para su activación y consumo de datos de Internet")
    }

    this.descontarMinutos = function(){
        throw new Error("El paquete ofertado primero debe ser adquirido para su activación y consumo de minutos de llamada")
    }

    this.validarVencimiento = function(){
        return this
    }

    this.comoPaqueteOfertado = function(){
        return this
    }
}

module.exports = PaqueteOfertado