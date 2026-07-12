const CantidadGB = require("./tipoCantidadGB");
const MinutosLlamadas = require("./tipoMinutosLlamadas");
const ControlDatosRestantes = require("./controlDatosRestantes");
const ControlMinutosRestantes = require("./controlMinutosRestantes");

const RecursosPrestados = function(recursos){
    let datos = new CantidadGB(0);
    let minutos = new MinutosLlamadas(0);

    this.validaryAgregarRecursos = function(){
        if (recursos.length === 0){
            throw new Error("Debe prestar al menos un recurso")
        }
        recursos.forEach(recurso => recurso.agregarA(this))
    }

    this.agregarDatos = function(datosAAgregar){
        datos = datos.sumar(datosAAgregar.aGB())
    }

    this.agregarMinutos = function(minutosAAgregar){
        minutos = minutos.sumar(minutosAAgregar)
    }

    this.obtenerControlDatos = function(){
        return new ControlDatosRestantes(datos)
    }

    this.obtenerControlMinutos = function(){
        return new ControlMinutosRestantes(minutos)
    }

    this.descontarDe = function(paquete){
        const controlDatos = this.obtenerControlDatos();
        const controlMinutos = this.obtenerControlMinutos();
        controlDatos.validarDescuentoEn(paquete);
        controlMinutos.validarDescuentoEn(paquete);
        controlDatos.descontarDe(paquete);
        controlMinutos.descontarDe(paquete)
    }

    this.validaryAgregarRecursos();
}

module.exports = RecursosPrestados
