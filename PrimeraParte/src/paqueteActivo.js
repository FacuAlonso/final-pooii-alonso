const PaqueteActivo = function(paqueteOfertado, fechaDeCompra){

    this.paqueteOfertado = paqueteOfertado;
    this.fechaDeCompra = fechaDeCompra;

    this.consumo = null;

    this.estaActivo = function(){
        return true
    }

    this.validarCompraDe = function(paquete){
        throw new Error("El cliente ya dispone de un paquete activo")  
    }

}

module.exports = PaqueteActivo