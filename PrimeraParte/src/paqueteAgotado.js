const PaqueteAgotado = function(){

    this.estaActivo = function(){
        return false
    }

    this.validarCompraDe = function(paquete){}

    this.descontarDatos = function(){
        throw Error("El paquete actual del cliente se encuentra agotado. No puede consumir datos de Internet")
    }

    this.descontarMinutos = function(){
        throw Error("El paquete actual del cliente se encuentra agotado. No puede realizar llamadas")
    }

    this.calcularDatosRestantes = function(){
        return 0
    }

    this.calcularMinutosRestantes = function(){
        return 0
    }



}

module.exports = PaqueteAgotado