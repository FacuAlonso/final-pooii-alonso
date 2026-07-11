const CuentaPrepago = require("./cuentaPrepago");
const GestorDeConsumos = require("./gestorDeConsumos");
const PaqueteNulo = require("./paqueteNulo");
const RenovacionAutomaticaOff = require("./renovacionAutomaticaOff");
const RenovacionAutomaticaOn = require("./renovacionAutomaticaOn");
const Dinero = require("./tipoDineroPesos")

const Cliente = function(nombreCompleto, numeroDeLinea){
    const nombreDelCliente = nombreCompleto;
    const numeroDeLineaDelCliente = numeroDeLinea;
    const cuentaDePago = new CuentaPrepago(new Dinero(0));
    const gestorDeConsumos = new GestorDeConsumos()
    let paqueteActual = new PaqueteNulo();
    let renovacionAutomatica = new RenovacionAutomaticaOff();

    this.tieneUnPaqueteActivo = function(){
        return paqueteActual.estaActivo();
    }

    this.calcularSaldo = function(){
        return cuentaDePago.calcularSaldo()
    }

    this.cargarSaldoCon = function(montoACargar){
        cuentaDePago.cargarSaldoCon(montoACargar)
    }

    this.comprarUn = function(paquete, fechaDeLaCompra = new Date()){
        paqueteActual.validarCompraDe(paquete);
        cuentaDePago.pagarUn(paquete);
        paqueteActual = paquete.activarAlMomentoDe(fechaDeLaCompra)
    }

    this.realizarUn = function(consumo){
        const fechaDelConsumo = consumo.calcularInicio();
        this.validarVencimientoDelPaqueteAlMomentoDe(fechaDelConsumo);
        this.validarAgotamientoDelPaqueteAlMomentoDe(fechaDelConsumo);
        consumo.aplicarEn(paqueteActual);
        gestorDeConsumos.registrar(consumo);
    }

    this.calcularDatosInternetDisponibles = function(){
        return paqueteActual.calcularDatosRestantes()
    }

    this.calcularMinutosLlamadaDisponibles = function(){
        return paqueteActual.calcularMinutosRestantes()
    }

    this.activarRenovacionAutomatica = function(){
        renovacionAutomatica = new RenovacionAutomaticaOn()
    }

    this.desactivarRenovacionAutomatica = function(){
        renovacionAutomatica = new RenovacionAutomaticaOff()
    }

    this.renovarPaquete = function(fechaDeRenovacion = new Date()){
        paqueteActual = paqueteActual.renovarse(fechaDeRenovacion);
        this.comprarUn(paqueteActual.comoPaqueteOfertado(), fechaDeRenovacion);
        return paqueteActual;
    }

    this.validarVencimientoDelPaqueteAlMomentoDe = function(fecha){
        paqueteActual = paqueteActual.validarVencimiento(fecha);
        paqueteActual = renovacionAutomatica.aplicarSobreUnCon(this, paqueteActual, fecha);
    }

    this.validarAgotamientoDelPaqueteAlMomentoDe = function(fecha){
        paqueteActual = paqueteActual.validarAgotamiento();
        paqueteActual = renovacionAutomatica.aplicarSobreUnCon(this, paqueteActual, fecha);
    }

    this.detallarConsumos = function(){
        return gestorDeConsumos.detallar();
    }

    this.detallarConsumosEntre = function(fechaDesde, fechaHasta){
        return gestorDeConsumos.detallarEntre(fechaDesde, fechaHasta);
    }

}

module.exports = Cliente
