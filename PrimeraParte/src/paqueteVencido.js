const PaqueteVencido = function(datosOriginales, minutosOriginales, diasDeDuracion){

    this.descontarDatos = function(){
        throw Error("El paquete actual del cliente se encuentra vencido. No puede consumir datos de Internet")
    }

    this.descontarMinutos = function(){
        throw Error("El paquete actual del cliente se encuentra vencido. No puede realizar llamadas")
    }

    this.calcularDatosRestantes = function(){
        throw Error("El paquete actual del cliente se encuentra vencido. No puede consumir datos de Internet")
    }

    this.calcularMinutosRestantes = function(){
        throw Error("El paquete actual del cliente se encuentra vencido. No puede realizar llamadas")
    }

    this.validarCompraDe = function(paquete){}

    this.calcularPrecio = function(){
        return this.precio.cantidad();
    }

    this.activarAlMomentoDe = function(fecha = new Date()){
        return new PaqueteActivo(datosOriginales, minutosOriginales, diasDeDuracion, fecha);
    }

    this.validarVencimiento = function(){
        return this
    }
}

module.exports = PaqueteVencido