const PaquetePrestamoVencido = function(){

    this.consumirDatos = function(){
        throw Error("El préstamo actual del cliente se encuentra vencido. No puede consumir datos de Internet")
    }

    this.consumirMinutos = function(){
        throw Error("El préstamo actual del cliente se encuentra vencido. No puede realizar llamadas")
    }

    this.calcularDatosRestantes = function(){
        throw Error("El préstamo actual del cliente se encuentra vencido. No puede consumir datos de Internet")
    }

    this.calcularMinutosRestantes = function(){
        throw Error("El préstamo actual del cliente se encuentra vencido. No puede realizar llamadas")
    }

    this.estaActivo = function(){
        return false
    }

    this.validarCompraDe = function(){
        return this
    }

    this.validarAgotamiento = function(){
        return this
    }

    this.validarVencimiento = function(){
        return this
    }

    this.comoPaqueteOfertado = function(){
        throw new Error("Los préstamos no pueden renovarse")
    }

    this.renovarse = function(){
        return this.validarRenovacion()
    }

    this.validarRenovacion = function(){
        throw new Error("Los préstamos no pueden renovarse")
    }

    this.aplicarRenovacionAutomaticaCon = function(){
        return this
    }

    this.generarPrestamoCon = function(){
        throw new Error("No se puede prestar desde un préstamo")
    }

    this.validarRecepcionDePrestamo = function(){
        return this
    }
}

module.exports = PaquetePrestamoVencido
