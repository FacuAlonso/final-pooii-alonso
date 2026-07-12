function Recurso(monto, nombreAMostrar = "recurso") {
  this.nombreAMostrar = nombreAMostrar;
  this.monto = monto;
}

Recurso.prototype.mensajeErrorDeCeroOPositivo = function(){
  return "La cantidad de "+ this.nombreAMostrar+ " no puede ser negativa"
}

Recurso.prototype.mensajeErrorDeSoloPositivo = function(){
  return "La cantidad de "+ this.nombreAMostrar + " debe ser positiva"
}

Recurso.prototype.validarCeroOPositivo = function() {
  if (this.monto < 0){
    throw new Error(this.mensajeErrorDeCeroOPositivo())
    }
}

Recurso.prototype.validarSoloPositivo = function() {
  if (this.monto <= 0) {
    throw new Error(this.mensajeErrorDeSoloPositivo())
  }
}

Recurso.prototype.cantidad = function() {
  return this.monto
}

Recurso.prototype.sumar = function(otroRecurso) {
  this.validarMismoTipoQue(otroRecurso);
  return new this.constructor(this.monto + otroRecurso.cantidad())
}

Recurso.prototype.restar = function(otroRecurso) {
  this.validarMismoTipoQue(otroRecurso);
  if (otroRecurso.cantidad() > this.monto) {
    throw new Error("No hay saldo de "+ this.nombreAMostrar+ " suficiente");
    }
  return new this.constructor(this.monto - otroRecurso.cantidad())
}

Recurso.prototype.esIgualEnValorA = function(otroRecurso){
  this.validarMismoTipoQue(otroRecurso);
  return this.monto === otroRecurso.cantidad()
}

Recurso.prototype.aplicarConsumoEn = function(){
  throw new Error("El sistema no reconoce este recurso como consumo")
}

Recurso.prototype.esNulo = function(){
  return this.monto === 0
}

Recurso.prototype.agregarA = function(){
  throw new Error("El sistema no reconoce este recurso como préstamo")
}

Recurso.prototype.validarMismoTipoQue = function(otroRecurso){
  if (this.nombreAMostrar != otroRecurso.nombreAMostrar){
    throw new Error("Los recursos a operar deben ser del mismo tipo")
  }
}

module.exports = Recurso;
