function RecursoPositivo(monto, nombreAMostrar = "recursos") {
  this.nombreAMostrar = nombreAMostrar;
  this.validarCeroOPositivo(monto);
  this.monto = monto;
}

RecursoPositivo.prototype.mensajeErrorDeCeroOPositivo = function(){
  return "La cantidad de "+ this.nombreAMostrar+ " no puede ser negativa"
};

RecursoPositivo.prototype.mensajeErrorDeSoloPositivo = function(){
  return "La cantidad a operar de "+ this.nombreAMostrar + " debe ser positiva"
};

RecursoPositivo.prototype.validarCeroOPositivo = function(monto) {
  if (monto < 0){
    throw new Error(this.mensajeErrorDeCeroOPositivo());
    }
};

RecursoPositivo.prototype.validarSoloPositivo = function(monto) {
  if (monto <= 0) {
    throw new Error(this.mensajeErrorDeSoloPositivo());
  }
};

RecursoPositivo.prototype.cantidad = function() {
  return this.monto;
};

RecursoPositivo.prototype.sumar = function(monto) {
  this.validarSoloPositivo(monto);
  return new this.constructor(this.monto + monto);
};

RecursoPositivo.prototype.restar = function(monto) {
  this.validarSoloPositivo(monto);
  if (monto > this.monto) {
    throw new Error("No hay saldo de "+ this.nombreAMostrar+ " suficiente");
    }
  return new this.constructor(this.monto - monto);
};

RecursoPositivo.prototype.esIgualEnValorA = function(otroRecurso){
  return this.monto === otroRecurso.cantidad()
};


module.exports = RecursoPositivo