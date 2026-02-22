const Paquete = function(montoGBDatos, montoMinutosLlamadas, diasDeDuracion, costoEnPesos){
    this.montoGBDatos = montoGBDatos;
    this.montoMinutosLlamadas = montoMinutosLlamadas;
    this.diasDeDuracion = diasDeDuracion;
    this.costoEnPesos = costoEnPesos;

    this.consumo = null;

    this.calcularPrecio = function(){
        return this.costoEnPesos
    }
    
}

module.exports = Paquete