const PaqueteAgotado = function(datosOriginales, minutosOriginales, diasDeDuracion, precio, appDatosIlimitados){

    this.descontarDatos = function(){
        throw new Error("El paquete actual del cliente se encuentra agotado. No puede consumir datos de Internet")
    }

    this.descontarMinutos = function(){
        throw new Error("El paquete actual del cliente se encuentra agotado. No puede realizar llamadas")
    }

    this.calcularDatosRestantes = function(){
       throw new Error("El paquete actual del cliente se encuentra agotado. No puede consumir datos de Internet")
    }

    this.calcularMinutosRestantes = function(){
        throw new Error("El paquete actual del cliente se encuentra agotado. No puede realizar llamadas")
    }

    this.estaActivo = function(){
        return false
    }

    this.validarCompraDe = function(paquete){
        return this
    }

    this.calcularPrecio = function(){
        return precio.cantidad()
    }

    this.activarAlMomentoDe = function(fecha = new Date()){
        const PaqueteActivo = require("./paqueteActivo");
        return new PaqueteActivo(datosOriginales, minutosOriginales, diasDeDuracion, fecha, precio, appDatosIlimitados)
    }

    this.validarVencimiento = function(){
        return this
    }

    this.validarAgotamiento = function(){
        return this
    }

    this.comoPaqueteOfertado = function(){
        const PaqueteOfertado = require("./paqueteOfertado");
        return new PaqueteOfertado(datosOriginales, minutosOriginales, diasDeDuracion, precio, appDatosIlimitados)
    }

    this.validarRenovacion = function(){
        return this
    }

    this.renovarse = function(){
        return this.validarRenovacion()
    }

    this.aplicarRenovacionAutomaticaCon = function(cliente, fecha){
        try {
            return cliente.renovarPaquete(fecha)
        } catch (error) {
            if (error.message === "No hay saldo de dinero suficiente"){
                throw new Error("El paquete actual del cliente se encuentra agotado y no tiene saldo suficiente para renovar.")
            }
        }
    }

    this.generarPrestamoCon = function(){
        throw new Error("El paquete actual del cliente se encuentra agotado. No puede prestar recursos")
    }

    this.validarRecepcionDePrestamo = function(){
        return this
    }
}

module.exports = PaqueteAgotado
