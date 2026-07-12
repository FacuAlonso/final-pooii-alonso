const AppSinIdentificar = function(){

    this.nombre = "Sin identificar"
    
    this.consumirDatosEn = function(datos, paquete){
        paquete.aplicarConsumoDatos(datos)
    }

    this.noSos = function(){
        return true
    }

}

module.exports = AppSinIdentificar
