const CuentaPrepago = function(){
    this.saldo = 0;

    this.puedeDebitarUnMontoDe = function(montoACobrar){
        return (montoACobrar <= this.saldo)
    }

    this.cargarSaldoCon = function(montoACargar){
        this.validarMontoPositivo(montoACargar);
        this.saldo += montoACargar
    }

    this.debitarUnMontoDe = function(montoADebitar){
        this.validarMontoPositivo(montoADebitar);
        if(! this.puedeDebitarUnMontoDe(montoADebitar)){
            throw new Error("La cuenta del cliente no tiene suficiente saldo")
        }
        this.saldo -= montoADebitar
    }

    this.validarMontoPositivo = function(monto){
        if(!(monto > 0)){
            throw new Error("El monto de dinero debe ser positivo")
        }
    }
}

module.exports = CuentaPrepago