function Recurso(monto, nombreAMostrar = "recursos") {
  this.nombreAMostrar = nombreAMostrar;
  this.monto = monto;
}

Recurso.prototype.mensajeErrorDeCeroOPositivo = function(){
  return "La cantidad de "+ this.nombreAMostrar+ " no puede ser negativa"
};

Recurso.prototype.mensajeErrorDeSoloPositivo = function(){
  return "La cantidad de "+ this.nombreAMostrar + " debe ser positiva"
};

Recurso.prototype.validarCeroOPositivo = function(monto) {
  if (monto < 0){
    throw new Error(this.mensajeErrorDeCeroOPositivo());
    }
};

Recurso.prototype.validarSoloPositivo = function(monto) {
  if (monto <= 0) {
    throw new Error(this.mensajeErrorDeSoloPositivo());
  }
};

Recurso.prototype.cantidad = function() {
  return this.monto;
};

Recurso.prototype.sumar = function(monto) {
  this.validarSoloPositivo(monto);
  return new this.constructor(this.monto + monto);
};

Recurso.prototype.restar = function(monto) {
  this.validarSoloPositivo(monto);
  if (monto > this.monto) {
    throw new Error("No hay saldo de "+ this.nombreAMostrar+ " suficiente");
    }
  return new this.constructor(this.monto - monto);
};

Recurso.prototype.esIgualEnValorA = function(otroRecurso){
  return this.monto === otroRecurso.cantidad()
};

Recurso.prototype.aplicarConsumoEn = function(){
  throw new Error("Este recurso no es soportado por el sistema como tipo de consumo");
};

Recurso.prototype.esNulo = function(){
  return this.monto === 0;
};

module.exports = Recurso;