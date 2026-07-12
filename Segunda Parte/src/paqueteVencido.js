const PaqueteOfertado = require("./paqueteOfertado")

const PaqueteVencido = function(datosOriginales, minutosOriginales, diasDeDuracion, precio, appIlimitada){

    this.descontarDatos = function(){
        throw new Error("El paquete actual del cliente se encuentra vencido. No puede consumir datos de Internet")
    }

    this.descontarMinutos = function(){
        throw new Error("El paquete actual del cliente se encuentra vencido. No puede realizar llamadas")
    }

    this.calcularDatosRestantes = function(){
        throw new Error("El paquete actual del cliente se encuentra vencido. No puede consumir datos de Internet")
    }

    this.calcularMinutosRestantes = function(){
        throw new Error("El paquete actual del cliente se encuentra vencido. No puede realizar llamadas")
    }

    this.estaActivo = function(){
        return false
    }

    this.validarCompraDeOtro = function(){
        return this
    }

    this.calcularPrecio = function(){
        return precio.cantidad()
    }

    this.activarAlMomentoDe = function(fecha = new Date()){
        const PaqueteActivo = require("./paqueteActivo");
        return new PaqueteActivo(datosOriginales, minutosOriginales, diasDeDuracion, fecha, precio, appIlimitada)
    }

    this.validarVencimiento = function(){
        return this
    }

    this.validarAgotamiento = function(){
        return this
    }

    this.comoPaqueteOfertado = function(){
        return new PaqueteOfertado(datosOriginales, minutosOriginales, diasDeDuracion, precio, appIlimitada)
    }

    this.validarRenovacion = function(){
        return this
    }

    this.renovarse = function(){
        return this.validarRenovacion()
    }

    this.aplicarRenovacionAutomaticaCon = function(cliente, fecha){
        return cliente.renovarPaquete(fecha)
    }

    this.generarPrestamoCon = function(){
        throw new Error("El paquete actual del cliente se encuentra vencido. No puede prestar recursos")
    }

    this.validarRecepcionDePrestamo = function(){
        return this
    }

}

module.exports = PaqueteVencido
