const PaquetePrestamoAgotado = require("./paquetePrestamoAgotado");
const PaquetePrestamoVencido = require("./paquetePrestamoVencido");

const PaquetePrestamoActivo = function(recursosPrestados, fechaDeVencimiento){
    let controlDatos = recursosPrestados.obtenerControlDatos();
    let controlMinutos = recursosPrestados.obtenerControlMinutos();
    const vencimiento = fechaDeVencimiento;

    this.descontarDatos = function(datos){
        controlDatos = controlDatos.descontar(datos)
    }

    this.descontarMinutos = function(minutos){
        controlMinutos = controlMinutos.descontar(minutos)
    }

    this.calcularDatosRestantes = function(){
        return controlDatos.calcularRestante()
    }

    this.calcularMinutosRestantes = function(){
        return controlMinutos.calcularRestante()
    }

    this.estaActivo = function(){
        return !(controlDatos.estaAgotado() && controlMinutos.estaAgotado())
    }

    this.validarCompraDeOtro = function(){
        throw new Error("El cliente ya tiene un préstamo activo")
    }

    this.validarAgotamiento = function(){
        if (controlDatos.estaAgotado() && controlMinutos.estaAgotado()){
            return new PaquetePrestamoAgotado()
        }
        return this
    }

    this.validarVencimiento = function(fecha = new Date()){
        if (vencimiento <= fecha){
            return new PaquetePrestamoVencido()
        }
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
        throw new Error("El cliente ya tiene un préstamo activo")
    }
}

module.exports = PaquetePrestamoActivo
