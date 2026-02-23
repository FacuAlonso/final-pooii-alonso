const RecursoDeCuenta = require("./recursoDeCuentaPrototipo");

function DineroPesos(montoDinero) {
  RecursoDeCuenta.call(this, montoDinero, "dinero");
}
DineroPesos.prototype = Object.create(RecursoDeCuenta.prototype);
DineroPesos.prototype.constructor = DineroPesos;

DineroPesos.prototype.mensajeErrorDeSoloPositivo = function(){
  return "El monto de dinero debe ser positivo"
}; 

module.exports = DineroPesos