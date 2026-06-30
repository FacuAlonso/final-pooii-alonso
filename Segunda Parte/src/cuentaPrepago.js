const CuentaPrepago = function(saldoInicial){
    let saldo = saldoInicial;

    this.cargarSaldoCon = function(montoACargar){
        saldo = saldo.sumar(montoACargar)
    }

    this.pagarUn = function(paqueteAComprar){
        saldo = saldo.restar(paqueteAComprar.calcularPrecio())
    }

    this.calcularSaldo = function(){
        return saldo.cantidad()
    }

    this.puedePagarUn = function(paquete){
        return saldo.cantidad() >= paquete.calcularPrecio();
    }

}

module.exports = CuentaPrepago
