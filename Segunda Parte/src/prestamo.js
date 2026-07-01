const PaquetePrestamoActivo = require("./paquetePrestamoActivo");
const RecursosPrestados = require("./recursosPrestados");

const Prestamo = function(recursos, fechaDePrestamo, fechaDeVencimiento){
    const recursosPrestados = new RecursosPrestados(recursos);
    const fechaInicio = fechaDePrestamo;
    const fechaFin = fechaDePrestamo;
    const vencimiento = fechaDeVencimiento;

    this.calcularInicio = function(){
        return fechaInicio
    }

    this.calcularFin = function(){
        return fechaFin
    }

    this.descontarDe = function(paquete){
        recursosPrestados.descontarDe(paquete)
    }

    this.activar = function(){
        return new PaquetePrestamoActivo(recursosPrestados, vencimiento)
    }
}

module.exports = Prestamo
