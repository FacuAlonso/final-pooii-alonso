const ControlSinDatosRestantes = require("./ControlSinDatosRestantes");
const CantidadGB = require("./tipoCantidadGB");

const ControlDatosRestantes = function(datosRestantes, paqueteControlado){
    this.datosRestantes = datosRestantes;
    this.paqueteControlado = paqueteControlado;

    this.calcularDatosRestantes = function(){
        return this.datosRestantes.cantidad()
    }

    this.descontar = function(datos){
        let datosADescontar = new CantidadGB(datos.aGB().cantidad())

        if(this.datosRestantes.esIgualEnValorA(datosADescontar)){
            return new ControlSinDatosRestantes()
        }

        return new ControlDatosRestantes(this.datosRestantes.restar(datosADescontar.cantidad()), paqueteControlado)
    }

    this.estaAgotado = function(){return false}

    this.renovarCon = function(){
        throw new Error("El paquete activo del cliente aún tiene datos disponibles, por lo que no se puede renovar")
    }

}

module.exports = ControlDatosRestantes