const PaqueteNulo = function(){

    this.estaActivo = function(){
        return false
    }

    this.validarCompraDe = function(paquete){}

    this.descontarDatos = function(){
        throw Error("El cliente no tiene un paquete activo para consumir datos de Internet")
    }

    this.descontarMinutos = function(){
        throw Error("El cliente no tiene un paquete activo para consumir minutos de llamadas")
    }

    this.calcualarDatosRestantes = function(){
        throw Error("Primero debe adquirir un paquete disponible")
    }

    this.calcualarMinutosRestantes = function(){
        throw Error("Primero debe adquirir un paquete disponible")
    }

}

module.exports = PaqueteNulo