const CuentaPrepago = function(saldoInicial){
    this.saldo = saldoInicial;

    this.cargarSaldoCon = function(montoACargar){
        this.saldo = this.saldo.sumar(montoACargar)
    }

    this.debitarUnMontoDe = function(montoADebitar){
        this.saldo = this.saldo.restar(montoADebitar)
    }

    this.pagarUn = function(paqueteAComprar){
        this.debitarUnMontoDe(paqueteAComprar.calcularPrecio())
    }

    this.calcularSaldo = function(){
        return this.saldo.cantidad()
    }

    this.puedePagarUn = function(paquete){
        return this.saldo.cantidad() >= paquete.calcularPrecio();
    }

}

module.exports = CuentaPrepago