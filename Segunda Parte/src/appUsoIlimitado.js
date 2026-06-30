const AppUsoIlimitado = function(nombre){

    this.nombre = nombre
    
    this.consumirDatosEn = function(datos, paquete, appConsumida){
        if(appConsumida.noSos(this.nombre)){
            paquete.descontarDatos(datos)
        }
    }

    this.noSos = function(nombreOtra){
        return this.nombre !== nombreOtra
    }
}

module.exports = AppUsoIlimitado
