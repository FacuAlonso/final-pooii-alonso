const RenovacionAutomaticaOn = function(){
    this.aplicarSobreUnCon = function(cliente, paqueteActivo){
        try {
            cliente.comprarUn(cliente.recordarUltimoPaqueteComprado())
        } catch (error) {
            return paqueteActivo
        }
        
    };
};

module.exports = RenovacionAutomaticaOn