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

    this.estaActivo = function(){
        return false;
    }

    this.validarRenovacion = function(){
        throw Error("Debe adquirir un paquete disponible")
    }

    this.renovarse = function(){
        return this.validarRenovacion()
    }

    this.validarVencimiento = function(){
        return this
    }

    this.aplicarRenovacionAutomaticaCon = function(cliente, fecha){
        return this;
    }
}

module.exports = PaqueteNulo