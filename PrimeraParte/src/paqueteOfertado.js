const PaqueteActivo = require("./paqueteActivo");

const PaqueteOfertado = function(montoGBDatos, montoMinutosLlamadas, diasDeDuracion, costoEnPesos){

    this.montoGBDatos = montoGBDatos;
    this.montoMinutosLlamadas = montoMinutosLlamadas;
    this.diasDeDuracion = diasDeDuracion;
    this.costoEnPesos = costoEnPesos;

    this.calcularPrecio = function(){
        return this.costoEnPesos;
    }

    this.activarAlMomentoDe = function(fecha){
        return new PaqueteActivo(this, fecha);
    }
}

module.exports = PaqueteOfertado;