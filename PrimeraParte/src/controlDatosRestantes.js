const ControlSinDatosRestantes = require("./ControlSinDatosRestantes");

const ControlDatosRestantes = function(datosRestantes, paqueteControlado){
    this.datosRestantes = datosRestantes.aGB();
    this.paqueteControlado = paqueteControlado;

    this.calcularDatosDisponibles = function(){
        return this.datosRestantes
    }

    this.descontar = function(datos){
        const datosADescontar = datos.aGB()

        this.validarDatosInsuficientes(datosADescontar)

        if(this.datosRestantes === datosADescontar){
            return new ControlSinDatosRestantes()
        }

        return new ControlDatosRestantes(this.datosRestantes - datosADescontar, paqueteControlado)
    }

    this.renovarCon = function(){
        throw new Error("El paquete activo del cliente aún tiene datos disponibles, por lo que no se puede renovar")
    }

    this.validarDatosInsuficientes = function(datosADescontar){
        if(this.datosRestantes < datosADescontar){
            throw new Error("El paquete activo del cliente no tiene datos restantes para cubrir tal consumo")
        }
    }
}

module.exports = ControlDatosRestantes