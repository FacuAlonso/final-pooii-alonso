const DineroPesos = require("./tipoDineroPesos");

const CuentaPrepago = function(saldoInicial){
    let saldo = saldoInicial;

    this.cargarSaldoCon = function(montoACargar){
        const dinero = new DineroPesos(montoACargar);
        dinero.validarSoloPositivo()
        saldo = saldo.sumar(dinero)
    }

    this.pagarUn = function(paqueteAComprar){
        saldo = saldo.restar(new DineroPesos(paqueteAComprar.calcularPrecio()))
    }

    this.calcularSaldo = function(){
        return saldo.cantidad()
    }

    this.puedePagarUn = function(paquete){
        return saldo.cantidad() >= paquete.calcularPrecio();
    }

}

module.exports = CuentaPrepago
