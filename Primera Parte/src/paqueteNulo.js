const PaqueteNulo = function(){

    this.descontarDatos = function(){
        throw new Error("El cliente no tiene un paquete activo para consumir datos de Internet")
    }

    this.descontarMinutos = function(){
        throw new Error("El cliente no tiene un paquete activo para consumir minutos de llamadas")
    }

    this.calcularDatosRestantes = function(){
        throw new Error("Debe adquirir un paquete disponible")
    }

    this.calcularMinutosRestantes = function(){
        throw new Error("Debe adquirir un paquete disponible")
    }

    this.estaActivo = function(){
        return false
    }

    this.validarCompraDe = function(paquete){
        return this
    }

    this.validarRenovacion = function(){
        throw new Error("Debe adquirir un paquete disponible")
    }

    this.renovarse = function(){
        return this.validarRenovacion()
    }

    this.validarVencimiento = function(){
        return this
    }

    this.validarAgotamiento = function(){
        return this
    }

    this.aplicarRenovacionAutomaticaCon = function(cliente, fecha){
        return this
    }
}

module.exports = PaqueteNulo