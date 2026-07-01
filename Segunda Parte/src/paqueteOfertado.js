const PaqueteOfertado = function(montoGBDatos, montoMinutosLlamadas, numeroDias, montoPrecio, appIlimitada){

    this.calcularPrecio = function(){
        return montoPrecio.cantidad();
    }

    this.activarAlMomentoDe = function(fechaActivacion = new Date()){
        const PaqueteActivo = require("./paqueteActivo");
        return new PaqueteActivo(montoGBDatos, montoMinutosLlamadas, numeroDias, fechaActivacion, montoPrecio, appIlimitada);
    }

    this.consumirDatos = function(){
        throw Error("El paquete ofertado primero debe ser adquirido para su activación y consumo de datos de Internet")
    }

    this.consumirMinutos = function(){
        throw Error("El paquete ofertado primero debe ser adquirido para su activación y consumo de minutos de llamada")
    }

    this.validarVencimiento = function(){
        return this
    }

    this.comoPaqueteOfertado = function(){
        return this
    }

    this.validarRecepcionDePrestamo = function(){
        throw Error("El paquete ofertado primero debe ser adquirido")
    }
}

module.exports = PaqueteOfertado
