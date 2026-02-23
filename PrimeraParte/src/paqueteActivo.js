const PaqueteActivo = function(datosEnGBComprados, minutosLlamadasComprados, diasDeDuracion, fechaDeCompra){

    this.datosEnGBComprados = datosEnGBComprados;
    this.minutosLlamadasComprados = minutosLlamadasComprados;
    this.diasDeDuracion = diasDeDuracion;
    this.fechaDeCompra = fechaDeCompra;
    
    // TDD SINS////////SACAR/////SACAR///////
    this.datosRestantes = datosEnGBComprados;
    this.minutosRestantes = minutosLlamadasComprados;
    this.descontarDatos = function(datos){
        this.datosRestantes -= datos
    }

    this.descontarMinutos = function(minutos){
        this.minutosRestantes -= minutos
    }

    this.calcualarDatosRestantes = function(){
        return this.datosRestantes
    }

    this.calcualarMinutosRestantes = function(){
        return this.minutosRestantes
    }
    /////////////////////////////////////////////

    this.estaActivo = function(){
        return true
    }

    this.validarCompraDe = function(paquete){
        throw new Error("El cliente ya dispone de un paquete activo")  
    }

    //CONSUMO


}

module.exports = PaqueteActivo