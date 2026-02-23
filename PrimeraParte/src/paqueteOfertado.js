const PaqueteActivo = require("./paqueteActivo");

const PaqueteOfertado = function(montoGBDatos, montoMinutosLlamadas, diasDeDuracion, costoEnPesos){

    this.montoGBDatos = montoGBDatos;
    this.montoMinutosLlamadas = montoMinutosLlamadas;
    this.diasDeDuracion = diasDeDuracion;
    this.costoEnPesos = costoEnPesos;

    this.calcularPrecio = function(){
        return this.costoEnPesos;
    }

    this.activarAlMomentoDe = function(fecha){
        return new PaqueteActivo(montoGBDatos, montoMinutosLlamadas, diasDeDuracion, fecha);
    }

    this.descontarDatos = function(){
        throw Error("El paquete ofertado primero debe ser adquirido para su activación y consumo de datos de Internet")
    }

    this.descontarMinutos = function(){
        throw Error("El paquete ofertado primero debe ser adquirido para su activación y consumo de minutos de llamada")
    }
}

module.exports = PaqueteOfertado