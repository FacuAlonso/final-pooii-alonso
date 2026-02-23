const PaqueteNulo = function(){

    this.validarCompraDe = function(paquete){}

    this.descontarDatos = function(){
        throw Error("El cliente no tiene un paquete activo para consumir datos de Internet")
    }

    this.descontarMinutos = function(){
        throw Error("El cliente no tiene un paquete activo para consumir minutos de llamadas")
    }

    this.calcularDatosRestantes = function(){
        throw Error("Debe adquirir un paquete disponible")
    }

    this.calcularMinutosRestantes = function(){
        throw Error("Debe adquirir un paquete disponible")
    }

    this.renovarCon = function(){
        throw Error("Debe adquirir un paquete disponible")
    }

    this.validarVencimiento = function(){
        return this
    }

}

module.exports = PaqueteNulo