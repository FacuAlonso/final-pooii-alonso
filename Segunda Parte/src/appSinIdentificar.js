const AppSinIdentificar = function(){

    this.nombre = "Sin identificar"
    
    this.consumirDatosEn = function(datos, paquete){
        paquete.descontarDatos(datos)
    }

    this.noSos = function(nombreOtra){
        return this.nombre !== nombreOtra
    }

}

module.exports = AppSinIdentificar
