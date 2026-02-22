const CuentaPrepago = require("../src/cuentaPrepago");

const Cliente = function(nombreCompleto, numeroDeLinea){
    this.nombreCompleto = nombreCompleto;
    this.numeroDeLinea = numeroDeLinea;
    this.paqueteActivo = null;
    this.cuentaDePago = new CuentaPrepago();
    this.historialDeConsumos = null;

    this.tieneUnPaqueteActivo = function(){
        return false
    }

    this.puedePagarUnMontoDe = function(montoAPagar){
        return (this.cuentaDePago.puedeDebitarUnMontoDe(montoAPagar))
    }

    this.cargarSaldoCon = function(montoACargar){
        this.cuentaDePago.cargarSaldoCon(montoACargar)
    }

    //OJO REVISAR SI ES NECESARIO, O ES UN POTENCIAL RESTO DE TDD
    this.pagarUnMontoDe = function(montoAPagar){
        this.cuentaDePago.debitarUnMontoDe(montoAPagar)
    }

    this.comprarUn = function(paquete){
        //FALTA RDN DE NO SOBREESCRIBIR PAQUETE ACTIVO
        this.cuentaDePago.pagarUn(paqueteAComprar)
    }
}

module.exports = Cliente