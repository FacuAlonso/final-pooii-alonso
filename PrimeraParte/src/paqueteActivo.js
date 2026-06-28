const ControlDatosInternet = require("./controlDatosRestantes");
const ControlMinutosRestantes = require("./controlMinutosRestantes");
const PaqueteAgotado = require("./paqueteAgotado");
const PaqueteOfertado = require("./paqueteOfertado");
const PaqueteVencido = require("./paqueteVencido");

const PaqueteActivo = function(datosEnGBComprados, minutosLlamadasComprados, 
    diasDeDuracion, fechaDeCompra = new Date(), precio){

    this.datosEnGBComprados = datosEnGBComprados.aGB();
    this.minutosLlamadasComprados = minutosLlamadasComprados;
    this.diasDeDuracion = diasDeDuracion;
    this.fechaDeCompra = fechaDeCompra;
    this.controlDatos = new ControlDatosInternet(datosEnGBComprados);
    this.controlMinutos = new ControlMinutosRestantes(minutosLlamadasComprados);
    this.precioDeCompra = precio;

    this.descontarDatos = function(datos){
        this.controlDatos = this.controlDatos.descontar(datos);
    }

    this.descontarMinutos = function(minutos){
        this.controlMinutos = this.controlMinutos.descontar(minutos);
    }

    this.calcularDatosRestantes = function(){
        return this.controlDatos.calcularDatosRestantes()
    }

    this.calcularMinutosRestantes = function(){
        return this.controlMinutos.calcularMinutosRestantes()
    }

    this.estaActivo = function(){
        return this.calcularDatosRestantes() > 0 || this.calcularMinutosRestantes() > 0;
    }

    this.validarCompraDe = function(){
        throw new Error("El cliente ya dispone de un paquete activo")  
    }
    
    this.validarAgotamiento = function(){
        if (this.controlDatos.estaAgotado() && this.controlMinutos.estaAgotado()){
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

    this.validarRenovacion = function(){
        throw new Error("El cliente ya dispone de un paquete activo") 
    }

    this.aplicarRenovacionAutomaticaCon = function(cliente, fecha){
        return this;
    }

}

module.exports = PaqueteActivo