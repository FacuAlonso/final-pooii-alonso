const Recurso = require("./tipoRecursoPrototipo");

function DineroPesos(montoDinero) {
  Recurso.call(this, montoDinero, "dinero");
  this.validarCeroOPositivo(montoDinero)
}

DineroPesos.prototype = Object.create(Recurso.prototype);

DineroPesos.prototype.constructor = DineroPesos;

module.exports = DineroPesos