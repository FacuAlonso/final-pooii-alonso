const GestorDeConsumos = function(){

    const consumos = [];

    this.registrar = function(consumo){
        consumos.push(consumo)
    }

    this.detallar = function(){
        return consumosOrdenados()
    }

    this.detallarEntre = function(fechaDesde, fechaHasta){
        return consumosOrdenados().filter(consumo =>
            consumo.calcularInicio() >= fechaDesde && consumo.calcularFin() <= fechaHasta
        )
    }

    const consumosOrdenados = function(){
        return [...consumos].sort((unConsumo, otroConsumo) =>
            unConsumo.calcularInicio() - otroConsumo.calcularInicio()
        )
    }

}

module.exports = GestorDeConsumos
