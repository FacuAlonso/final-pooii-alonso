const PaqueteOfertado = require("../src/paqueteOfertado");
const CantidadMB = require("../src/tipoCantidadMB");
const DineroPesos = require("../src/tipoDineroPesos");
const DuracionEnDias = require("../src/tipoDuracionEnDias");
const MinutosLlamadas = require("../src/tipoMinutosLlamadas");

describe("Paquetes ofertados por la compañía", ()=>{

        test("Cuando se intenta crear un paquete con una cantidad de GB negativa, falla", ()=>{
                expect(() => new PaqueteOfertado(new CantidadMB(-10), 
                new MinutosLlamadas(1200), 
                new DuracionEnDias(7), 
                new DineroPesos(500))
                ).toThrow("La cantidad de datos de Internet no puede ser negativa");
        });

        test("Cuando se intenta crear un paquete con una cantidad de Minutos de Llamada negativa, falla", ()=>{
                expect(() => new PaqueteOfertado(new CantidadMB(10), 
                new MinutosLlamadas(-6000), 
                new DuracionEnDias(7), 
                new DineroPesos(5000))
                ).toThrow("La cantidad de minutos de llamada no puede ser negativa");

        });

        test("Cuando se intenta crear un paquete con una cantidad de Minutos de Llamada negativa, falla", ()=>{
                expect(() => new PaqueteOfertado(new CantidadMB(10), 
                new MinutosLlamadas(6000), 
                new DuracionEnDias(-2), 
                new DineroPesos(5000))
                ).toThrow("La duración del paquete debe ser de al menos 1 día");
        });

        test("Cuando se intenta crear un paquete con un precio negativo, falla", ()=>{
                expect(() => new PaqueteOfertado(new CantidadMB(10),
                new MinutosLlamadas(6000),
                new DuracionEnDias(1),
                new DineroPesos(-5000))
                ).toThrow("La cantidad de dinero no puede ser negativa");

        });



})
