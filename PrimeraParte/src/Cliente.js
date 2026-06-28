const CuentaPrepago = require("./cuentaPrepago");
const PaqueteNulo = require("./paqueteNulo");
const RenovacionAutomaticaOff = require("./renovacionAutomaticaOff");
const RenovacionAutomaticaOn = require("./renovacionAutomaticaOn");
const Dinero = require("./tipoDinero")

const Cliente = function(nombreCompleto, numeroDeLinea){
    this.nombreCompleto = nombreCompleto;
    this.numeroDeLinea = numeroDeLinea;
    this.paqueteActual = new PaqueteNulo();
    this.cuentaDePago = new CuentaPrepago(new Dinero(0));
    this.renovacionAutomatica = new RenovacionAutomaticaOff();

    this.tieneUnPaqueteActivo = function(){
        return this.paqueteActual.estaActivo();
    }

    this.calcularSaldo = function(){
        return this.cuentaDePago.calcularSaldo()
    }

    this.cargarSaldoCon = function(montoACargar){
        this.cuentaDePago.cargarSaldoCon(montoACargar)
    }

    this.comprarUn = function(paquete, fechaDeLaCompra = new Date()){
        this.paqueteActual.validarCompraDe(paquete);
        this.cuentaDePago.pagarUn(paquete);
        this.paqueteActual = paquete.activarAlMomentoDe(fechaDeLaCompra)
    }

    this.realizarUn = function(consumo){
        const fechaDelConsumo = consumo.calcularInicio();
        this.validarVencimientoDelPaqueteAlMomentoDe(fechaDelConsumo);
        this.validarAgotamientoDelPaqueteAlMomentoDe(fechaDelConsumo);
        consumo.aplicarEn(this.paqueteActual);
        
        //REGISTRAR EL CONSUMO - TO DO
    }

    this.calcularDatosInternetDisponibles = function(){
        return this.paqueteActual.calcularDatosRestantes()
    }

    this.calcularMinutosLlamadaDisponibles = function(){
        return this.paqueteActual.calcularMinutosRestantes()
    }

    this.recordarUltimoPaqueteComprado = function(){
        return this.paqueteActual.comoPaqueteOfertado()
    }

    this.activarRenovacionAutomatica = function(){
        this.renovacionAutomatica = new RenovacionAutomaticaOn()
    }

    this.desactivarRenovacionAutomatica = function(){
        this.renovacionAutomatica = new RenovacionAutomaticaOff()
    }

    this.renovarPaquete = function(fechaDeRenovacion = new Date()){
        this.paqueteActual = this.paqueteActual.renovarse(fechaDeRenovacion);
        this.comprarUn(this.recordarUltimoPaqueteComprado(), fechaDeRenovacion);
        return this.paqueteActual;
    }

    this.validarVencimientoDelPaqueteAlMomentoDe = function(fecha){
        this.paqueteActual = this.paqueteActual.validarVencimiento(fecha);
        this.paqueteActual = this.renovacionAutomatica.aplicarSobreUnCon(this, this.paqueteActual, fecha);
    }

    this.validarAgotamientoDelPaqueteAlMomentoDe = function(fecha){
        this.paqueteActual = this.paqueteActual.validarAgotamiento();
        this.paqueteActual = this.renovacionAutomatica.aplicarSobreUnCon(this, this.paqueteActual, fecha);
    }

    this.puedeRenovarPaquete = function(){
        return this.cuentaDePago.puedePagarUn(this.recordarUltimoPaqueteComprado());
    }

}

module.exports = Cliente