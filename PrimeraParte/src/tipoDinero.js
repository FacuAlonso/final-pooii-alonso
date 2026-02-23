const RecursoDeCuenta = require("./recursoPrototipo");

function DineroPesos(montoDinero) {
  RecursoDeCuenta.call(this, montoDinero, "dinero");
}
DineroPesos.prototype = Object.create(RecursoDeCuenta.prototype);
DineroPesos.prototype.constructor = DineroPesos;

DineroPesos.prototype.mensajeErrorDeSoloPositivo = function(){
  return "La cantidad de dinero no puede ser negativa"
}; 

module.exports = DineroPesos