const CantidadGB = require("./tipoCantidadGB");
const MinutosLlamadas = require("./tipoMinutosLlamadas");
const ControlDatosRestantes = require("./controlDatosRestantes");
const ControlMinutosRestantes = require("./controlMinutosRestantes");
const ControlSinDatosRestantes = require("./controlSinDatosRestantes");
const ControlSinMinutosRestantes = require("./controlSinMinutosRestantes");

const RecursosPrestados = function(recursos){
    let datos = new CantidadGB(0);
    let minutos = new MinutosLlamadas(0);

    const validarRecursos = function(){
        if (recursos.length === 0){
            throw new Error("Debe prestar al menos un recurso")
        }
    }

    this.agregarDatos = function(datosAAgregar){
        datos = datos.sumar(datosAAgregar.aGB())
    }

    this.agregarMinutos = function(minutosAAgregar){
        minutos = minutos.sumar(minutosAAgregar)
    }

    this.descontarDe = function(paquete){
        recursos.forEach(recurso => recurso.descontarPrestamoDe(paquete))
    }

    this.obtenerControlDatos = function(){
        if (datos.esNulo()){
            return new ControlSinDatosRestantes()
        }
        return new ControlDatosRestantes(datos)
    }

    this.obtenerControlMinutos = function(){
        if (minutos.esNulo()){
            return new ControlSinMinutosRestantes()
        }
        return new ControlMinutosRestantes(minutos)
    }

    validarRecursos();
    recursos.forEach(recurso => recurso.agregarA(this))
}

module.exports = RecursosPrestados
