const Cliente = require("../src/cliente");
const PaqueteActivo = require("../src/paqueteActivo");
const PaqueteOfertado = require("../src/paqueteOfertado");

describe("Sistema para la venta de paquetes de una compañía telefónica", ()=>{
    test("Cuando una persona apenas se registra como cliente de la compañía, no tiene un paquete activo", ()=>{
        const cliente = new Cliente("Juan Perez", "+5491112345678");
        expect(cliente.tieneUnPaqueteActivo()).toBe(false)
    });

    test("Cuando una persona apenas se registra como cliente de la compañía, tiene un saldo nulo", ()=>{
        const cliente = new Cliente("Juan Perez", "+5491112345678");
        expect(cliente.calcularSaldo()).toBe(0)
    });

    test("Cuando un cliente realiza una carga de dinero exitosa, entonces su saldo debe actualizarse", ()=>{
            const cliente = new Cliente("Juan Perez", "+5491112345678");
            const montoDeLaCarga = 1000;
            cliente.cargarSaldoCon(montoDeLaCarga);
            expect(cliente.calcularSaldo()).toBe(montoDeLaCarga)
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

    test("Cuando un cliente sin un paquete activo compra uno exitosamente, entonces este nuevo se activa", ()=>{
            const cliente = new Cliente("Juan Perez", "+5491112345678");
            const montoDeLaCarga = 10000;
            const paquete = new PaqueteOfertado(10, 1200, 7, 5000);
            cliente.cargarSaldoCon(montoDeLaCarga);
            cliente.comprarUn(paquete);
            expect(cliente.tieneUnPaqueteActivo()).toBe(true)
    });

    test("Cuando un cliente compra exitosamente un paquete, entonces su saldo disminiuye por el precio del paquete", ()=>{
            const cliente = new Cliente("Juan Perez", "+5491112345678");
            const montoDeLaCarga = 10000;
            const precioDelPaquete = 5000;
            const paquete = new PaqueteOfertado(10, 1200, 7, precioDelPaquete);
            cliente.cargarSaldoCon(montoDeLaCarga);
            cliente.comprarUn(paquete);
            expect(cliente.calcularSaldo()).toBe(montoDeLaCarga - precioDelPaquete)
    });

    test("Cuando un cliente intenta comprar un paquete de mayor valor que el de su saldo actual, entonces falla y su saldo no disminuye", ()=>{
            const cliente = new Cliente("Juan Perez", "+5491112345678");
            const montoDeLaCarga = 10;
            const paquete = new PaqueteOfertado(10, 1200, 7, 5000);
            cliente.cargarSaldoCon(montoDeLaCarga);
            expect(() => cliente.comprarUn(paquete)).toThrow("La cuenta del cliente no tiene suficiente saldo");
            expect(cliente.calcularSaldo()).toBe(montoDeLaCarga);
    });

    test("Cuando un cliente con un paquete activo intenta comprar otro paquete, entonces falla y su saldo no disminuye la segunda vez", ()=>{
            const cliente = new Cliente("Juan Perez", "+5491112345678");
            const montoDeLaCarga = 10000;
            const precioDeUnPaquete = 5000;
            const paquete = new PaqueteOfertado(10, 1200, 7, precioDeUnPaquete);
            const otroPaquete = new PaqueteOfertado(1, 120, 7, 600);
            cliente.cargarSaldoCon(montoDeLaCarga);
            cliente.comprarUn(paquete);
            expect(() => cliente.comprarUn(otroPaquete)).toThrow("El cliente ya dispone de un paquete activo");
            expect(cliente.calcularSaldo()).toBe(montoDeLaCarga - precioDeUnPaquete);
    });

    test("Cuando un paquete ofertado es comprado por varios clientes entonces es válido", ()=>{
            const unPaqueteEnOferta = new PaqueteOfertado(10, 1200, 7, 2000);
            const unCliente = new Cliente("Juan Perez", "+5491112345678");
            const otroCliente = new Cliente("Pedro Gonzalez", "+5490348123456");
            const montoACargar = 10000;
            unCliente.cargarSaldoCon(montoACargar);
            otroCliente.cargarSaldoCon(montoACargar);
            unCliente.comprarUn(unPaqueteEnOferta);
            otroCliente.comprarUn(unPaqueteEnOferta);
            expect(unCliente.tieneUnPaqueteActivo()).toBe(true);
            expect(otroCliente.tieneUnPaqueteActivo()).toBe(true);
    });

    

})
