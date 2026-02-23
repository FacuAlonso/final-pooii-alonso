const ControlDatosInternet = require("./controlDatosRestantes");
const ControlMinutosRestantes = require("./controlMinutosRestantes");
const PaqueteNulo = require("./paqueteNulo");
const CantidadGB = require("./tipoCantidadGB");
const MinutosLlamadas = require("./tipoMinutosLlamadas");

const PaqueteActivo = function(datosEnGBComprados, minutosLlamadasComprados, diasDeDuracion, fechaDeCompra){

    this.datosEnGBComprados = new CantidadGB(datosEnGBComprados);
    this.minutosLlamadasComprados = new MinutosLlamadas(minutosLlamadasComprados);
    this.diasDeDuracion = diasDeDuracion;
    this.fechaDeCompra = fechaDeCompra;
    this.controlDatos = new ControlDatosInternet(this.datosEnGBComprados, this);
    this.controlMinutos = new ControlMinutosRestantes(this.minutosLlamadasComprados, this);
    
    this.descontarDatos = function(datos){
        this.controlDatos = this.controlDatos.descontar(datos)
    }

    this.descontarMinutos = function(minutos){
        this.controlMinutos = this.controlMinutos.descontar(minutos)
    }

    this.calcularDatosRestantes = function(){
        return this.controlDatos.calcularDatosRestantes()
    }

    this.calcularMinutosRestantes = function(){
        return this.controlMinutos.calcularMinutosRestantes()
    }

    this.estaActivo = function(){
        return true
    }

    this.validarCompraDe = function(paquete){
        throw new Error("El cliente ya dispone de un paquete activo")  
    }
    
    this.validarAgotamiento = function(){
        if(this.controlDatos.estaAgotado() && this.controlMinutos.estaAgotado()){
            return new PaqueteNulo()
        }
        return this
    }

}

module.exports = PaqueteActivo