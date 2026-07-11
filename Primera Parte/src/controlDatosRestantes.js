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

}

module.exports = ControlDatosRestantes