const ControlSinDatosRestantes = require("./controlSinDatosRestantes");
const CantidadGB = require("./tipoCantidadGB");

const ControlDatosRestantes = function(datosRestantes){
    this.datosRestantes = datosRestantes;

    this.calcularDatosRestantes = function(){
        return this.datosRestantes.cantidad()
    }

    this.descontar = function(datos){
        let datosADescontar = new CantidadGB(datos.aGB().cantidad())

        if (this.datosRestantes.esIgualEnValorA(datosADescontar)){
            return new ControlSinDatosRestantes()
        }

        return new ControlDatosRestantes(this.datosRestantes.restar(datosADescontar))
    }

    this.estaAgotado = function(){
        return this.datosRestantes.esNulo()
    }

    this.validarPuedeDescontar = function(datos){
        let datosADescontar = new CantidadGB(datos.aGB().cantidad())
        this.datosRestantes.restar(datosADescontar)
    }

    this.validarDescuentoEn = function(paquete){
        paquete.validarPuedeConsumirDatos(this.datosRestantes)
    }

    this.descontarDe = function(paquete){
        paquete.consumirDatos(this.datosRestantes)
    }

}

module.exports = ControlDatosRestantes
