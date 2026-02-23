const ControlDatosInternet = require("./controlDatosRestantes");
const ControlMinutosRestantes = require("./controlMinutosRestantes");
const PaqueteAgotado = require("./paqueteAgotado");
const PaqueteOfertado = require("./paqueteOfertado");
const PaqueteVencido = require("./paqueteVencido");
const CantidadGB = require("./tipoCantidadGB");
const DineroPesos = require("./tipoDinero");
const duracionEnDias = require("./tipoDuracionEnDias");
const MinutosLlamadas = require("./tipoMinutosLlamadas");

const PaqueteActivo = function(datosEnGBComprados, minutosLlamadasComprados, 
    diasDeDuracion, fechaDeCompra = new Date(), precio){

    this.datosEnGBComprados = new CantidadGB(datosEnGBComprados);
    this.minutosLlamadasComprados = new MinutosLlamadas(minutosLlamadasComprados);
    this.diasDeDuracion = new duracionEnDias(diasDeDuracion);
    this.fechaDeCompra = fechaDeCompra;
    this.controlDatos = new ControlDatosInternet(this.datosEnGBComprados, this);
    this.controlMinutos = new ControlMinutosRestantes(this.minutosLlamadasComprados, this);
    this.precioDeCompra = new DineroPesos(precio)
    
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

    this.informarEstado = function(){
        return "Activo"
    }

    this.validarCompraDe = function(paquete){
        throw new Error("El cliente ya dispone de un paquete activo")  
    }

    
    this.validarAgotamiento = function(){
        if(this.controlDatos.estaAgotado() && this.controlMinutos.estaAgotado()){
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

    this.renovarCon = function(otroPaquete){
        throw new Error("El cliente ya dispone de un paquete activo") 
    }

    this.calcularFechaDeVencimiento = function(){
        const fecha = new Date(this.fechaDeCompra);
        fecha.setDate(fecha.getDate() + this.diasDeDuracion.cantidad());
        return fecha
    }

    this.comoPaqueteOfertado = function(){
        return new PaqueteOfertado(this.datosEnGBComprados, this.minutosLlamadasComprados, this.diasDeDuracion, this.precio)
    }

}

module.exports = PaqueteActivo