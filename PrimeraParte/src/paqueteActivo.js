const ControlDatosInternet = require("./controlDatosRestantes");
const ControlMinutosRestantes = require("./controlMinutosRestantes")

const PaqueteActivo = function(datosEnGBComprados, minutosLlamadasComprados, diasDeDuracion, fechaDeCompra){

    this.datosEnGBComprados = datosEnGBComprados;
    this.minutosLlamadasComprados = minutosLlamadasComprados;
    this.diasDeDuracion = diasDeDuracion;
    this.fechaDeCompra = fechaDeCompra;
    this.controlDatos = new ControlDatosInternet(this.datosEnGBComprados, this);
    this.controlMinutos = new ControlMinutosRestantes(this.minutosLlamadasComprados, this);
    
    this.descontarDatos = function(datos){
        this.controlDatos = this.controlDatos.descontar(datos)
    }

    this.descontarMinutos = function(minutos){
        this.controlDatos = this.controlMinutos.descontar(minutos)
    }

    this.calcualarDatosRestantes = function(){
        return this.controlDatos.calcualarDatosRestantes()
    }

    this.calcualarMinutosRestantes = function(){
        return this.controlMinutos.calcualarMinutosRestantes()
    }

    this.estaActivo = function(){
        return true
    }

    this.validarCompraDe = function(paquete){
        throw new Error("El cliente ya dispone de un paquete activo")  
    }


}

module.exports = PaqueteActivo