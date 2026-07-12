
const ControlPrototipo = function(recursoRestante){
    this.recursoRestante = recursoRestante;
}

ControlPrototipo.prototype.calcularRestante = function(){
    return this.recursoRestante.cantidad()
}

ControlPrototipo.prototype.descontar = function(){
    throw new Error("El control debe implementarse con datos de internet, o bien minutos de llamada.")
}

ControlPrototipo.prototype.estaAgotado = function(){
    return this.recursoRestante.esNulo()
}

module.exports = ControlPrototipo