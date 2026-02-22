const CuentaPrepago = require("../src/cuentaPrepago");

const Cliente = function(nombreCompleto, numeroDeLinea){
    this.nombreCompleto = nombreCompleto;
    this.numeroDeLinea = numeroDeLinea;
    this.paqueteActivo = null;
    this.cuentaDePagoAsociada = new CuentaPrepago();

    this.tieneUnPaqueteActivo = function(){
        return false
    }

    this.puedePagarUnMontoDe = function(montoAPagar){
        return (this.cuentaDePagoAsociada.puedeDebitarUnMontoDe(montoAPagar))
    }

    this.cargarSaldoCon = function(montoACargar){
        this.cuentaDePagoAsociada.cargarSaldoCon(montoACargar)
    }

    this.pagarUnMontoDe = function(montoAPagar){
        this.cuentaDePagoAsociada.debitarUnMontoDe(montoAPagar)
    }
}

module.exports = Cliente