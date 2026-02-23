const CantidadGB = function(cantidadDatosEnGB){
    this.monto = cantidadDatosEnGB
    this.aGB = function(){
        return this.monto
    }
    this.aMB = function(){
        return this.monto / 1000
    }
    this.nombreVisible = "datos de internet";
    this.cantidad = function(){return this.monto}
}

const CantidadMB = function(cantidadDatosEnMB){
    this.monto = cantidadDatosEnMB;
    this.aGB = function(){
        return this.monto * 1000
    }
    this.aMB = function(){
        return this.monto
    }
    this.nombreVisible = "datos de internet";
    this.cantidad = function(){return this.monto}
}

const MinutosLlamadas = function(cantidadMinutosDeLlamadas){
    this.monto = cantidadMinutosDeLlamadas;
    this.nombreVisible = "minutos de llamada";
    this.cantidad = function(){return this.monto}
}

module.exports = {
    CantidadGB,
    CantidadMB,
    MinutosLlamadas
}