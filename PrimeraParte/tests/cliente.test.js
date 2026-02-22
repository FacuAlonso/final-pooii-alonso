const Cliente = require("../src/cliente")
describe("Cuando una persona se registra en el sistema como cliente de la compañía, por defecto...", ()=>{
    test("No tiene ningun paquete activo", ()=>{
        const cliente = new Cliente("Juan Perez", "+5491112345678");
        expect(cliente.tieneUnPaqueteActivo()).toBe(false)
    });

    test("No puede pagar nada porque no tiene saldo a debitar", ()=>{
        const cliente = new Cliente("Juan Perez", "+5491112345678");
        expect(cliente.puedePagarUnMontoDe(1)).toBe(false)
    })

    // FALTA TEST INICIAL DE QUE NO PUEDE CONSUMIR DATOS NI MINUTOS PORQUE NO TIENE PACK
})

test("Cuando un cliente realiza una carga de saldo exitosa, puede validarlo", ()=>{
        const cliente = new Cliente("Juan Perez", "+5491112345678");
        const montoDeLaCarga = 1000;
        cliente.cargarSaldoCon(montoDeLaCarga);
        expect(cliente.puedePagarUnMontoDe(montoDeLaCarga)).toBe(true)
    });

test("Cuando un cliente realiza una carga de saldo exitosa, no puede pagar más que el monto cargado", ()=>{
        const cliente = new Cliente("Juan Perez", "+5491112345678");
        const montoDeLaCarga = 1000;
        cliente.cargarSaldoCon(montoDeLaCarga);
        expect(cliente.puedePagarUnMontoDe(montoDeLaCarga + 1)).toBe(false)
    });

test("Cuando se intenta cargar dinero a la cuenta de un cliente, indicando un monto nulo, entonces falla", ()=>{
        const cliente = new Cliente("Juan Perez", "+5491112345678");
        const montoDeLaCarga = 0;
        expect(() => cliente.cargarSaldoCon(montoDeLaCarga)).toThrow("El monto de dinero debe ser positivo");
    });

test("Cuando se intenta cargar dinero a la cuenta de un cliente, indicando un monto negativo, entonces falla", ()=>{
        const cliente = new Cliente("Juan Perez", "+5491112345678");
        const montoDeLaCarga = -1000;
        expect(() => cliente.cargarSaldoCon(montoDeLaCarga)).toThrow("El monto de dinero debe ser positivo");
    });

    test("Cuando un cliente realiza un pago con la totalidad de su saldo, ya no puede pagar nada más", ()=>{
        const cliente = new Cliente("Juan Perez", "+5491112345678");
        const montoDeLaCarga = 1000;
        cliente.cargarSaldoCon(montoDeLaCarga);
        cliente.pagarUnMontoDe(montoDeLaCarga);
        expect(cliente.puedePagarUnMontoDe(1)).toBe(false)
    });

    test("Cuando un cliente realiza un pago de un monto inferior a su saldo, luego puede pagar con la diferencia del monto", ()=>{
        const cliente = new Cliente("Juan Perez", "+5491112345678");
        const montoDeLaCarga = 1000;
        const montoDelPago = 600;
        cliente.cargarSaldoCon(montoDeLaCarga);
        cliente.pagarUnMontoDe(montoDelPago);
        expect(cliente.puedePagarUnMontoDe(montoDeLaCarga - montoDelPago)).toBe(true)
    });

    test("Cuando un cliente intenta realizar un pago de un monto superior a su saldo, falla ", ()=>{
        const cliente = new Cliente("Juan Perez", "+5491112345678");
        const montoDeLaCarga = 1000;
        const montoDelPago = 1500;
        cliente.cargarSaldoCon(montoDeLaCarga);
        expect(() => cliente.pagarUnMontoDe(montoDelPago)).toThrow("La cuenta del cliente no tiene suficiente saldo");
    });

    