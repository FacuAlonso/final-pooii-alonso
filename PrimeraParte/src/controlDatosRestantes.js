const ControlSinDatosRestantes = require("./ControlSinDatosRestantes");

const ControlDatosRestantes = function(datosRestantes, paqueteControlado){
    this.datosRestantes = datosRestantes;
    this.paqueteControlado = paqueteControlado;

    this.calcularDatosDisponibles = function(){
        return this.datosRestantes
    }

    this.descontar = function(datos){
        const datosADescontar = datos.aGB()

        if(this.datosRestantes.esIgualEnValorA(datosADescontar)){
            return new ControlSinDatosRestantes()
        }

        return new ControlDatosRestantes(this.datosRestantes.restar(datosADescontar.cantidad()), paqueteControlado)
    }

    this.renovarCon = function(){
        throw new Error("El paquete activo del cliente aún tiene datos disponibles, por lo que no se puede renovar")
    }
}

module.exports = ControlDatosRestantes