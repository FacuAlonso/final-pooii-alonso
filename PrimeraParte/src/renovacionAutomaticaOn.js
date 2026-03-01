const RenovacionAutomaticaOn = function(){
    this.aplicarSobreUnCon = function(cliente, paqueteActual){
        cliente.comprarUn(cliente.recordarUltimoPaqueteComprado())
    }
};

module.exports = RenovacionAutomaticaOn