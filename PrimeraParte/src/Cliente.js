const CuentaPrepago = require("./cuentaPrepago");
const PaqueteNulo = require("./paqueteNulo");
const RenovacionAutomaticaOff = require("./renovacionAutomaticaOff");
const RenovacionAutomaticaOn = require("./renovacionAutomaticaOn");
const Dinero = require("./tipoDinero")

const Cliente = function(nombreCompleto, numeroDeLinea){
    this.nombreCompleto = nombreCompleto;
    this.numeroDeLinea = numeroDeLinea;
    this.paqueteActivo = new PaqueteNulo();
    this.cuentaDePago = new CuentaPrepago(new Dinero(0));
    this.renovacionAutomatica = new RenovacionAutomaticaOff();

    this.tieneUnPaqueteActivo = function(){
        const tieneDatosRestantes = this.paqueteActivo.calcularDatosRestantes() > 0;
        const tieneMinutosRestantes = this.paqueteActivo.calcularMinutosRestantes() > 0;
        return (tieneDatosRestantes || tieneMinutosRestantes)
    }

    this.calcularSaldo = function(){
        return this.cuentaDePago.calcularSaldo()
    }

    this.cargarSaldoCon = function(montoACargar){
        this.cuentaDePago.cargarSaldoCon(montoACargar)
    }

    this.comprarUn = function(paquete, fechaDeLaCompra = new Date()){
        this.paqueteActivo.validarCompraDe(paquete);
        this.cuentaDePago.pagarUn(paquete);
        this.paqueteActivo = paquete.activarAlMomentoDe(fechaDeLaCompra)
    }

    this.realizarUn = function(consumo, fechaDelConsumo = new Date()){
        this.paqueteActivo = this.paqueteActivo.validarVencimiento(fechaDelConsumo, this.renovacionAutomatica);
        consumo.aplicarEn(this.paqueteActivo);
        this.paqueteActivo = this.paqueteActivo.validarAgotamiento(this.renovacionAutomatica)
        //REGISTRAR EL CONSUMO
    }

    this.calcularDatosInternetDisponibles = function(){
        return this.paqueteActivo.calcularDatosRestantes()
    }

    this.calcularMinutosLlamadaDisponibles = function(){
        return this.paqueteActivo.calcularMinutosRestantes()
    }

    this.recordarUltimoPaqueteComprado = function(){
        return this.paqueteActivo.comoPaqueteOfertado()
    }

    this.activarRenovacionAutomatica = function(){
        this.renovacionAutomatica = new RenovacionAutomaticaOn()
    }

    this.desactivarRenovacionAutomatica = function(){
        this.renovacionAutomatica = new RenovacionAutomaticaOff()
    }

    this.renovarPaqueteAlMomentoDe = function(fechaDeRenovacion){
        this.paqueteActivo = this.paqueteActivo.renovarse(fechaDeRenovacion);
        this.comprarUn(this.recordarUltimoPaqueteComprado())
    }
}

module.exports = Cliente