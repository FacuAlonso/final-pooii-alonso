const RenovacionAutomaticaOn = function(){
    this.aplicarSobreUnCon = function(cliente, paqueteActual, fecha){
        return paqueteActual.aplicarRenovacionAutomaticaCon(cliente, fecha);
    }
}

module.exports = RenovacionAutomaticaOn