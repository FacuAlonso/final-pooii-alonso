const ControlDatosInternet = require("./controlDatosRestantes");
const ControlMinutosRestantes = require("./controlMinutosRestantes");
const PaqueteAgotado = require("./paqueteAgotado");
const PaqueteOfertado = require("./paqueteOfertado");
const PaqueteVencido = require("./paqueteVencido");

const PaqueteActivo = function(datosEnGBComprados, minutosLlamadasComprados, 
    diasDeDuracion, fechaDeCompra = new Date(), precio){

    this.datosEnGBComprados = datosEnGBComprados;
    this.minutosLlamadasComprados = minutosLlamadasComprados;
    this.diasDeDuracion = diasDeDuracion;
    this.fechaDeCompra = fechaDeCompra;
    this.controlDatosNavegacion = new ControlDatosInternet(datosEnGBComprados);
    this.controlMinutosLlamadas = new ControlMinutosRestantes(minutosLlamadasComprados);
    this.precioDeCompra = precio;

    this.descontarDatos = function(datos){
        this.controlDatosNavegacion = this.controlDatosNavegacion.descontar(datos);
    }

    this.descontarMinutos = function(minutos){
        this.controlMinutosLlamadas = this.controlMinutosLlamadas.descontar(minutos);
    }

    this.calcularDatosRestantes = function(){
        return this.controlDatosNavegacion.calcularDatosRestantes()
    }

    this.calcularMinutosRestantes = function(){
        return this.controlMinutosLlamadas.calcularMinutosRestantes()
    }

    this.validarCompraDe = function(){
        throw new Error("El cliente ya dispone de un paquete activo")  
    }

    
    this.validarAgotamiento = function(){
        if (this.controlDatosNavegacion.estaAgotado() && this.controlMinutosLlamadas.estaAgotado()){
            return new PaqueteAgotado(datosEnGBComprados, minutosLlamadasComprados, diasDeDuracion, precio)
        }
        return this
    }

    this.validarVencimiento = function(fecha = new Date()){
        if (this.calcularFechaDeVencimiento() <= fecha){
            return new PaqueteVencido(datosEnGBComprados, minutosLlamadasComprados, diasDeDuracion, precio)
        }
        return this
    }

    this.validarRenovacion = function(){
        throw new Error("El cliente ya dispone de un paquete activo") 
    }

    this.calcularFechaDeVencimiento = function(){
        const fecha = new Date(this.fechaDeCompra);
        fecha.setDate(fecha.getDate() + this.diasDeDuracion.cantidad());
        return fecha
    }

    this.comoPaqueteOfertado = function(){
        return new PaqueteOfertado(this.datosEnGBComprados, this.minutosLlamadasComprados, this.diasDeDuracion, this.precioDeCompra)
    }

    this.renovarse = function(fecha){
        let paquete = this;
        paquete = paquete.validarAgotamiento();
        paquete = paquete.validarVencimiento(fecha);
        return paquete.validarRenovacion()
    }

}

module.exports = PaqueteActivo