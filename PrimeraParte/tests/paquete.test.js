const Cliente = require("../src/cliente");
const PaqueteOfertado = require("../src/paqueteOfertado");

describe("Paquetes ofertados por la compañía", ()=>{

        test("Cuando se intenta crear un paquete con una cantidad de GB negativa, falla", ()=>{
                expect(() => new PaqueteOfertado(-10, 1200, 7, 5000)).toThrow("La cantidad inicial de datos de Internet no puede ser negativa");
        });

        test("Cuando se intenta crear un paquete con una cantidad de Minutos de Llamada negativa, falla", ()=>{
                expect(() => new PaqueteOfertado(10, -6000, 7, 5000)).toThrow("La cantidad inicial de minutos de llamada no puede ser negativa");
        });

        test("Cuando se intenta crear un paquete con una cantidad de Minutos de Llamada negativa, falla", ()=>{
                expect(() => new PaqueteOfertado(10, 6000, -2, 5000)).toThrow("La duración del paquete debe ser de al menos 1 día");
        });



})
