function RecursoDeCuenta(monto, nombreAMostrar = "recursos") {
  this.nombreAMostrar = nombreAMostrar;
  this.validarCeroOPositivo(monto);
  this.monto = monto;
}

RecursoDeCuenta.prototype.mensajeErrorDeCeroOPositivo = function(){
  return "La cantidad de "+ this.nombreAMostrar+ " no puede ser negativa"
};

RecursoDeCuenta.prototype.mensajeErrorDeSoloPositivo = function(){
  return "La cantidad a operar de "+ this.nombreAMostrar + " debe ser positiva"
};

RecursoDeCuenta.prototype.validarCeroOPositivo = function(monto) {
  if (monto < 0){
    throw new Error(this.mensajeErrorDeCeroOPositivo());
    }
};

RecursoDeCuenta.prototype.validarSoloPositivo = function(monto) {
  if (monto <= 0) {
    throw new Error(this.mensajeErrorDeSoloPositivo());
  }
};

RecursoDeCuenta.prototype.cantidad = function() {
  return this.monto;
};

RecursoDeCuenta.prototype.sumar = function(monto) {
  this.validarSoloPositivo(monto);
  return new this.constructor(this.monto + monto);
};

RecursoDeCuenta.prototype.restar = function(monto) {
  this.validarSoloPositivo(monto);
  if (monto > this.monto) {
    throw new Error("No hay saldo de "+ this.nombreAMostrar+ " suficiente");
    }
  return new this.constructor(this.monto - monto);
};

RecursoDeCuenta.prototype.esIgualEnValorA = function(otroRecurso){
  return this.monto === otroRecurso.cantidad()
};


module.exports = RecursoDeCuenta