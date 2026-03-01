const PaqueteAgotado = function(datosOriginales, minutosOriginales, diasDeDuracion, precio){

    this.descontarDatos = function(){
        throw Error("El paquete actual del cliente se encuentra agotado. No puede consumir datos de Internet")
    }

    this.descontarMinutos = function(){
        throw Error("El paquete actual del cliente se encuentra agotado. No puede realizar llamadas")
    }

    this.calcularDatosRestantes = function(){
       throw Error("El paquete actual del cliente se encuentra agotado. No puede consumir datos de Internet")
    }

    this.calcularMinutosRestantes = function(){
        throw Error("El paquete actual del cliente se encuentra agotado. No puede realizar llamadas")
    }

    this.validarCompraDe = function(paquete){}

    this.calcularPrecio = function(){
        return this.precio.cantidad();
    }

    this.activarAlMomentoDe = function(fecha = new Date()){
        const PaqueteActivo = require("../src/paqueteActivo");
        return new PaqueteActivo(datosOriginales, minutosOriginales, diasDeDuracion, fecha, precio);
    }

    this.validarVencimiento = function(){
        return this
    }

    this.validarAgotamiento = function(){
        return this
    }

    this.comoPaqueteOfertado = function(){
        const PaqueteOfertado = require("./paqueteOfertado");
        return new PaqueteOfertado(datosOriginales, minutosOriginales, diasDeDuracion, precio)
    }

}

module.exports = PaqueteAgotado