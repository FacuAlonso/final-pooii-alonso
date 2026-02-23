const Consumo = require("../src/consumo");
const CantidadMB = require("../src/tipoCantidadMB");

describe("Consumos informados por una fuente externa a través de la interfaz diseñada", ()=>{

        test("Cuando se intenta crear un consumo con fechas de inicio y fin iguales, falla", ()=>{
                const unaFecha = Date("2026-02-23T10:00:00Z");
                expect(() => new Consumo(new CantidadMB(10), unaFecha, unaFecha)).toThrow("La fecha de finalización de consumo debe ser posterior a la del comienzo");
        });

        test("Cuando se intenta crear un consumo con una fecha de inicio posterior a la fecha de inicio, falla", ()=>{
                const unaFecha = Date("2026-02-23T10:00:00Z");
                expect(() => new Consumo(new CantidadMB(10), unaFecha+10, unaFecha)).toThrow("La fecha de finalización de consumo debe ser posterior a la del comienzo");
        });

        test("Cuando se intenta crear un consumo con un recurso negativo, falla", ()=>{
                const unaFecha = Date("2026-02-23T10:00:00Z");
                expect(() => new Consumo(new CantidadMB(-1), unaFecha, unaFecha+10)).toThrow("La cantidad de datos de Internet no puede ser negativa");
        });


})
