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
        return new PaqueteActivo(datosOriginales, minutosOriginales, diasDeDuracion, fecha, precio);
    }

    this.validarVencimiento = function(){
        return this
    }



}

module.exports = PaqueteAgotado