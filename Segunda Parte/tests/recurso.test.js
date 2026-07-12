const CantidadGB = require("../src/tipoCantidadGB");
const CantidadMB = require("../src/tipoCantidadMB")
const MinutosLlamadas = require("../src/tipoMinutosLlamadas");

describe("Tipos de recursos utilizados por el sistema de la compañía telefoníca", ()=>{

    test("Cuando se suman dos recursos del mismo tipo y se obtiene un nuevo recurso con el total, entonces es válido", () => {
        const minutosDisponibles = new MinutosLlamadas(100);
        const minutosAAgregar = new MinutosLlamadas(50);

        const minutosTotales = minutosDisponibles.sumar(minutosAAgregar);

        expect(minutosTotales.cantidad()).toBe(150)
        expect(minutosDisponibles.cantidad()).toBe(100)
        expect(minutosAAgregar.cantidad()).toBe(50)
    })

    test("Cuando se resta un recurso del mismo tipo y se obtiene un nuevo recurso con la diferencia, entonces es válido", () => {
        const datosDisponibles = new CantidadGB(5);
        const datosADescontar = new CantidadGB(2);

        const datosRestantes = datosDisponibles.restar(datosADescontar);

        expect(datosRestantes.cantidad()).toBe(3)
        expect(datosDisponibles.cantidad()).toBe(5)
    })

    test("Cuando se intenta restar más recursos de los disponibles, entonces falla", () => {
        const minutosDisponibles = new MinutosLlamadas(10);
        const minutosADescontar = new MinutosLlamadas(15);

        expect(()=> minutosDisponibles.restar(minutosADescontar)).toThrow("No hay saldo de minutos de llamada suficiente")
    })

    test("Cuando se intentan sumar dos recursos distintos, entonces falla", () => {
        const recursoMB = new CantidadMB(100);
        const recursoGB = new CantidadGB(1);

        expect(()=> recursoGB.sumar(recursoMB)).toThrow("Los recursos a operar deben ser del mismo tipo")
    })

    test("Cuando se intentan restar dos recursos distintos, entonces falla", () => {
        const recursoMB = new CantidadMB(100);
        const recursoGB = new CantidadGB(1);

        expect(()=> recursoGB.restar(recursoMB)).toThrow("Los recursos a operar deben ser del mismo tipo")
    })

    test("Cuando se intentan comparar dos recursos distintos, entonces falla", () => {
        const recursoMB = new CantidadMB(100);
        const recursoGB = new CantidadGB(100);
        
        expect(()=> recursoGB.esIgualEnValorA(recursoMB)).toThrow("Los recursos a operar deben ser del mismo tipo")
    })
})
