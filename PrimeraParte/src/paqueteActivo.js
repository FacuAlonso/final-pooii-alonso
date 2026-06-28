const ControlDatosInternet = require("./controlDatosRestantes");
const ControlMinutosRestantes = require("./controlMinutosRestantes");
const PaqueteAgotado = require("./paqueteAgotado");
const PaqueteOfertado = require("./paqueteOfertado");
const PaqueteVencido = require("./paqueteVencido");

const PaqueteActivo = function(datosEnGBComprados, minutosLlamadasComprados, 
    diasDeDuracion, fechaDeCompra = new Date(), precio){

    const datosComprados = datosEnGBComprados.aGB();
    const minutosComprados = minutosLlamadasComprados;
    const duracion = diasDeDuracion;
    const fechaCompra = fechaDeCompra;
    const precioDeCompra = precio;
    let controlDatos = new ControlDatosInternet(datosEnGBComprados);
    let controlMinutos = new ControlMinutosRestantes(minutosLlamadasComprados);

    this.descontarDatos = function(datos){
        controlDatos = controlDatos.descontar(datos);
    }

    this.descontarMinutos = function(minutos){
        controlMinutos = controlMinutos.descontar(minutos);
    }

    this.calcularDatosRestantes = function(){
        return controlDatos.calcularDatosRestantes()
    }

    this.calcularMinutosRestantes = function(){
        return controlMinutos.calcularMinutosRestantes()
    }

    this.estaActivo = function(){
        return this.calcularDatosRestantes() > 0 || this.calcularMinutosRestantes() > 0;
    }

    this.validarCompraDe = function(){
        throw new Error("El cliente ya dispone de un paquete activo")  
    }
    
    this.validarAgotamiento = function(){
        if (controlDatos.estaAgotado() && controlMinutos.estaAgotado()){
            return new PaqueteAgotado(datosComprados, minutosComprados, duracion, precioDeCompra)
        }
        return this
    }

    this.validarVencimiento = function(fecha = new Date()){
        if (calcularFechaDeVencimiento() <= fecha){
            return new PaqueteVencido(datosComprados, minutosComprados, duracion, precioDeCompra)
        }
        return this
    }

    this.comoPaqueteOfertado = function(){
        return new PaqueteOfertado(datosComprados, minutosComprados, duracion, precioDeCompra)
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

    const calcularFechaDeVencimiento = function(){
        const fecha = new Date(fechaCompra);
        fecha.setDate(fecha.getDate() + duracion.cantidad());
        return fecha
    }

}

module.exports = PaqueteActivo
