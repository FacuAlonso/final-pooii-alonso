function RecursoConsumiblePositivo(monto) {
  this.validarNoNegativo(monto);
  this.monto = monto;
}

RecursoConsumiblePositivo.prototype.validarNoNegativo = function(monto) {
  if (monto < 0){
    throw new Error("La cantidad inicial no puede ser negativa");
    }
};

RecursoConsumiblePositivo.prototype.validarPositivo = function(monto) {
  if (monto <= 0) {
    throw new Error("La cantidad a operar debe ser positiva");
}
};

RecursoConsumiblePositivo.prototype.cantidad = function() {
  return this.monto;
};

RecursoConsumiblePositivo.prototype.incrementar = function(monto) {
  this.validarPositivo(monto);
  return new this.constructor(this.monto + monto);
};

RecursoConsumiblePositivo.prototype.decrementar = function(monto) {
  this.validarPositivo(monto);
  if (monto > this.monto) {
    throw new Error("No hay saldo suficiente");
    }
  return new this.constructor(this._monto - monto);
};


module.exports = RecursoConsumiblePositivo;