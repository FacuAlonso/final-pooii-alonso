const ControlSinDatosRestantes = require("./controlSinDatosRestantes");
const CantidadGB = require("./tipoCantidadGB");

const ControlDatosRestantes = function(datosRestantes){
    const datosRestantesDelPaquete = datosRestantes;

    this.calcularDatosRestantes = function(){
        return datosRestantesDelPaquete.cantidad()
    }

    this.descontar = function(datos){
        let datosADescontar = new CantidadGB(datos.aGB().cantidad())

        if (datosRestantesDelPaquete.esIgualEnValorA(datosADescontar)){
            return new ControlSinDatosRestantes()
        }

        return new ControlDatosRestantes(datosRestantesDelPaquete.restar(datosADescontar.cantidad()))
    }

    this.estaAgotado = function(){
        return datosRestantesDelPaquete.esNulo()
    }

}

module.exports = ControlDatosRestantes
