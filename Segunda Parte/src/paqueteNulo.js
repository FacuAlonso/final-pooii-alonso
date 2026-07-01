const PaqueteNulo = function(){

    this.validarCompraDe = function(paquete){
        return this
    }

    this.consumirDatos = function(){
        throw Error("El cliente no tiene un paquete activo para consumir datos de Internet")
    }

    this.consumirMinutos = function(){
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

    this.validarAgotamiento = function(){
        return this
    }

    this.comoPaqueteOfertado = function(){
        throw Error("Debe adquirir un paquete disponible")
    }

    this.aplicarRenovacionAutomaticaCon = function(cliente, fecha){
        return this;
    }

    this.generarPrestamoCon = function(){
        throw Error("Debe adquirir un paquete disponible")
    }

    this.validarRecepcionDePrestamo = function(){
        throw Error("El cliente debe tener un plan o préstamo vencido o agotado para recibir un préstamo")
    }
}

module.exports = PaqueteNulo
