const RenovacionAutomaticaOn = function(){
    this.aplicarSobreUnCon = function(cliente, paqueteActual){
        try {
            cliente.comprarUn(cliente.recordarUltimoPaqueteComprado())
        } catch (error) {
            return paqueteActual
        }
        
    };
};

module.exports = RenovacionAutomaticaOn