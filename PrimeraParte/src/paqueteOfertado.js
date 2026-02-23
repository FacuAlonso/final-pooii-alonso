const PaqueteActivo = require("./paqueteActivo");
const CantidadGB = require("./tipoCantidadGB");
const DineroPesos = require("./tipoDinero");
const duracionEnDias = require("./tipoDuracionEnDias");
const MinutosLlamadas = require("./tipoMinutosLlamadas");

const PaqueteOfertado = function(montoGBDatos, montoMinutosLlamadas, diasDeDuracion, costoEnPesos){

    this.montoGBDatos = new CantidadGB(montoGBDatos);
    this.montoMinutosLlamadas = new MinutosLlamadas(montoMinutosLlamadas);
    this.diasDeDuracion = new duracionEnDias(diasDeDuracion);
    this.precio = new DineroPesos(costoEnPesos);

    this.calcularPrecio = function(){
        return this.precio.cantidad();
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