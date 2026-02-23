const CuentaPrepago = function(){
    this.saldo = 0;

    this.cargarSaldoCon = function(montoACargar){
        this.validarMontoPositivo(montoACargar);
        this.saldo += montoACargar
    }

    this.debitarUnMontoDe = function(montoADebitar){
        this.validarMontoPositivo(montoADebitar);
        if(montoADebitar > this.saldo){
            throw new Error("La cuenta del cliente no tiene suficiente saldo")
        }
        this.saldo -= montoADebitar
    }

    this.validarMontoPositivo = function(monto){
        if(monto <= 0){
            throw new Error("El monto de dinero debe ser positivo")
        }
    }

    this.pagarUn = function(paqueteAComprar){
        this.debitarUnMontoDe(paqueteAComprar.calcularPrecio())
    }

    this.calcularSaldo = function(){
        return this.saldo
    }
}

module.exports = CuentaPrepago