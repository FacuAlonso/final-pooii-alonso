const AppSinIdentificar = require("./appSinIdentificar");
const ControlDatosInternet = require("./controlDatosRestantes");
const ControlMinutosRestantes = require("./controlMinutosRestantes");
const PaqueteAgotado = require("./paqueteAgotado");
const PaqueteVencido = require("./paqueteVencido");
const Prestamo = require("./prestamo");

const PaqueteActivo = function(datosEnGBComprados, minutosLlamadasComprados, 
    diasDeDuracion, fechaDeCompra = new Date(), precio, appDatosIlimitados = new AppSinIdentificar()){

    const datosComprados = datosEnGBComprados.aGB();
    const minutosComprados = minutosLlamadasComprados;
    const duracion = diasDeDuracion;
    const fechaCompra = fechaDeCompra;
    const precioDeCompra = precio;
    const appAsociada = appDatosIlimitados;
    let controlDatos = new ControlDatosInternet(datosEnGBComprados);
    let controlMinutos = new ControlMinutosRestantes(minutosLlamadasComprados);

    this.descontarDatos = function(datos, appConsumida = new AppSinIdentificar()){
        appAsociada.consumirDatosEn(datos, this, appConsumida)
    }

    this.descontarMinutos = function(minutos){
        this.aplicarConsumoMinutos(minutos)
    }
    
    this.aplicarConsumoDatos = function(datos){
        controlDatos = controlDatos.descontar(datos)
    }

    this.aplicarConsumoMinutos = function(minutos){
        controlMinutos = controlMinutos.descontar(minutos)
    }

    this.calcularDatosRestantes = function(){
        return controlDatos.calcularRestante()
    }

    this.calcularMinutosRestantes = function(){
        return controlMinutos.calcularRestante()
    }

    this.estaActivo = function(){
        return !(controlDatos.estaAgotado() && controlMinutos.estaAgotado())
    }

    this.validarCompraDeOtro = function(){
        throw new Error("El cliente ya dispone de un paquete activo")  
    }
    
    this.validarAgotamiento = function(){
        if (controlDatos.estaAgotado() && controlMinutos.estaAgotado()){
            return new PaqueteAgotado(datosComprados, minutosComprados, duracion, precioDeCompra, appAsociada)
        }
        return this
    }

    this.validarVencimiento = function(fecha = new Date()){
        if (calcularFechaDeVencimiento() <= fecha){
            return new PaqueteVencido(datosComprados, minutosComprados, duracion, precioDeCompra, appAsociada)
        }
        return this
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

    this.validarRecepcionDePrestamo = function(){
        throw new Error("El cliente ya dispone de un paquete activo")
    }

    this.aplicarRenovacionAutomaticaCon = function(cliente, fecha){
        return this
    }

    this.generarPrestamoCon = function(recursos, fecha){
        return new Prestamo(recursos, fecha, calcularFechaDeVencimiento())
    }

    const calcularFechaDeVencimiento = function(){
        const fecha = new Date(fechaCompra);
        fecha.setDate(fecha.getDate() + duracion.cantidad());
        return fecha
    }

    this.validarPuedeConsumirDatos = function(datos){
        controlDatos.validarPuedeDescontar(datos)
    }

    this.validarPuedeConsumirMinutos = function(minutos){
        controlMinutos.validarPuedeDescontar(minutos)
    }
}

module.exports = PaqueteActivo