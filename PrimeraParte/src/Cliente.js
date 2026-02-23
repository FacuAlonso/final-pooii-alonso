const CuentaPrepago = require("./cuentaPrepago");
const PaqueteNulo = require("./paqueteNulo");
const Dinero = require("./tipoDinero")

const Cliente = function(nombreCompleto, numeroDeLinea){
    this.nombreCompleto = nombreCompleto;
    this.numeroDeLinea = numeroDeLinea;
    this.paqueteActivo = new PaqueteNulo();
    this.cuentaDePago = new CuentaPrepago(new Dinero(0));
    this.historialDeConsumos = null;

    this.tieneUnPaqueteActivo = function(){
        return this.paqueteActivo.estaActivo()
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
}

module.exports = Cliente