const Cliente = require("../src/cliente");
const Consumo = require("../src/consumo");
const CantidadMB = require("../src/tipoCantidadMB");
const MinutosLlamadas = require("../src/tipoMinutosLlamadas");
const crearPaqueteOfertado = require("../tests/PaqueteFactory");

describe("Sistema para la venta de paquetes de una compañía telefónica", ()=>{
        
        test("Cuando una persona apenas se registra como cliente de la compañía y quiere saber el estado de su paquete sin haber comprado ninguno, entonces falla", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                expect(() => cliente.tieneUnPaqueteActivo()).toThrow("Debe adquirir un paquete disponible");
        });

        test("Cuando una persona apenas se registra como cliente de la compañía, tiene un saldo de dinero nulo", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                expect(cliente.calcularSaldo()).toBe(0)
        });

        test("Cuando un cliente realiza una carga de dinero exitosa, entonces su saldo debe actualizarse en ese monto", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const montoDeLaCarga = 1000;
                cliente.cargarSaldoCon(montoDeLaCarga);
                expect(cliente.calcularSaldo()).toBe(montoDeLaCarga)
        });

        test("Cuando un cliente realiza dos cargas, entonces su saldo se acumnula", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const montoDeLaCarga = 1000;
                cliente.cargarSaldoCon(montoDeLaCarga);
                cliente.cargarSaldoCon(montoDeLaCarga);
                expect(cliente.calcularSaldo()).toBe(montoDeLaCarga*2)
        });

        test("Cuando se intenta cargar dinero a la cuenta de un cliente, indicando un monto nulo, entonces falla", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const montoDeLaCarga = 0;
                expect(() => cliente.cargarSaldoCon(montoDeLaCarga)).toThrow("La cantidad de dinero debe ser positiva");
        });

        test("Cuando se intenta cargar dinero a la cuenta de un cliente, indicando un monto negativo, entonces falla", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const montoDeLaCarga = -1000;
                expect(() => cliente.cargarSaldoCon(montoDeLaCarga)).toThrow("La cantidad de dinero debe ser positiva");
        });

        test("Cuando un cliente sin un paquete activo compra uno exitosamente, entonces este nuevo se activa", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const montoDeLaCarga = 10000;
                const paquete = crearPaqueteOfertado(10, 1200, 7, 5000);

                cliente.cargarSaldoCon(montoDeLaCarga);
                cliente.comprarUn(paquete);

                expect(cliente.tieneUnPaqueteActivo()).toBe(true)
        });

        test("Cuando un cliente compra exitosamente un paquete, entonces su saldo disminiuye por el precio del paquete", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const montoDeLaCarga = 10000;
                const precioDelPaquete = 5000;
                const paquete = crearPaqueteOfertado(10, 120, 7, precioDelPaquete)

                cliente.cargarSaldoCon(montoDeLaCarga);
                cliente.comprarUn(paquete);

                expect(cliente.calcularSaldo()).toBe(montoDeLaCarga - precioDelPaquete)
        });

        test("Cuando un cliente compra exitosamente un paquete con todo su saldo, entonces este pasa a ser nulo", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const montoDeLaCarga = 10000;
                const precioDelPaquete = 10000;
                const paquete = crearPaqueteOfertado(50, 600, 30, precioDelPaquete)

                cliente.cargarSaldoCon(montoDeLaCarga);
                cliente.comprarUn(paquete);

                expect(cliente.calcularSaldo()).toBe(0)
        });

        test("Cuando un cliente intenta comprar un paquete de mayor valor que el de su saldo actual, entonces falla y su saldo no disminuye", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const montoDeLaCarga = 10;
                const paquete = crearPaqueteOfertado(10, 1200, 7, 5000)

                cliente.cargarSaldoCon(montoDeLaCarga);

                expect(() => cliente.comprarUn(paquete)).toThrow("No hay saldo de dinero suficiente");
                expect(cliente.calcularSaldo()).toBe(montoDeLaCarga);
        });

        test("Cuando un cliente con un paquete activo intenta comprar otro paquete, entonces falla y su saldo no disminuye la segunda vez", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const montoDeLaCarga = 10000;
                const precioDeUnPaquete = 5000;
                const paquete = crearPaqueteOfertado(10, 1200, 7, precioDeUnPaquete)
                const otroPaquete = crearPaqueteOfertado(1, 120, 7, 600)

                cliente.cargarSaldoCon(montoDeLaCarga);
                cliente.comprarUn(paquete);

                expect(() => cliente.comprarUn(otroPaquete)).toThrow("El cliente ya dispone de un paquete activo");
                expect(cliente.calcularSaldo()).toBe(montoDeLaCarga - precioDeUnPaquete);
        });

        test("Cuando un paquete ofertado es comprado por varios clientes entonces es válido", ()=>{
                const unPaqueteEnOferta = crearPaqueteOfertado(10, 1200, 7, 2000)
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

        test("Cuando un cliente intenta comprar un paquete de mayor valor que el de su saldo actual, entonces falla y su saldo no disminuye", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const montoDeLaCarga = 10;
                const paquete = crearPaqueteOfertado(10, 1200, 7, 5000)

                cliente.cargarSaldoCon(montoDeLaCarga);

                expect(() => cliente.comprarUn(paquete)).toThrow("No hay saldo de dinero suficiente");
                expect(cliente.calcularSaldo()).toBe(montoDeLaCarga);
        });

        test("Cuando un cliente intenta comprar un paquete de mayor valor que el de su saldo actual, entonces falla y su saldo no disminuye", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const montoDeLaCarga = 10;
                const paquete = crearPaqueteOfertado(10, 1200, 7, 5000)

                cliente.cargarSaldoCon(montoDeLaCarga);

                expect(() => cliente.comprarUn(paquete)).toThrow("No hay saldo de dinero suficiente");
                expect(cliente.calcularSaldo()).toBe(montoDeLaCarga);
        });


        test("Cuando un cliente con un paquete de datos activo consume una cantidad de datos válida, entonces su cantidad de datos disponible se reduce sólo en esa cantidad", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const cantidadGBPaquete = 10;
                const cantidadMBConsumidos = 50;
                const paquete = crearPaqueteOfertado(10, 1200, 7, 5000)
                const consumo = new Consumo(new CantidadMB(cantidadMBConsumidos), new Date("2026-02-23T10:00:00Z"), new Date("2026-02-24T10:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete);
                cliente.realizarUn(consumo);

                expect(cliente.calcularDatosInternetDisponibles()).toBe(cantidadGBPaquete-(cantidadMBConsumidos/1000));
        });

        test("Cuando un cliente consume todos sus datos, entonces su saldo de datos de Internet es nulo", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const cantidadGBPaquete = 10;
                const cantidadMBConsumidos = 100;
                const paquete = crearPaqueteOfertado(10, 1200, 7, 5000)
                const consumo = new Consumo(new CantidadMB(cantidadMBConsumidos), new Date("2026-02-23T10:00:00Z"), new Date("2026-02-24T10:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete);
                cliente.realizarUn(consumo);

                expect(cliente.calcularDatosInternetDisponibles()).toBe(cantidadGBPaquete-(cantidadMBConsumidos/1000));
        });

        test("Cuando un cliente consume una cantidad de datos menor a la adquirida en el paquete, entonces puede seguir haciendo más consumos", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = crearPaqueteOfertado(10, 1200, 7, 5000);
                const unConsumo = new Consumo(new CantidadMB(5000), new Date("2026-02-23T10:00:00Z"), new Date("2026-02-24T10:00:00Z"));
                const otroConsumo = new Consumo(new CantidadMB(1000), new Date("2026-02-24T10:00:00Z"), new Date("2026-02-26T10:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete);
                cliente.realizarUn(unConsumo);
                cliente.realizarUn(otroConsumo);

                expect(cliente.calcularDatosInternetDisponibles()).toBe(4);
        });

        test("Cuando un cliente realiza consumos de distinto tipo por debajo del límite de su paquete, entonces su paquete sigue activo", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = crearPaqueteOfertado(10, 1200, 7, 5000);
                const unConsumo = new Consumo(new CantidadMB(2000), new Date("2026-02-23T10:00:00Z"), new Date("2026-02-24T10:00:00Z"));
                const otroConsumo = new Consumo(new MinutosLlamadas(1000), new Date("2026-02-24T10:00:00Z"), new Date("2026-02-26T10:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete);
                cliente.realizarUn(unConsumo);
                cliente.realizarUn(otroConsumo);

                expect(cliente.calcularDatosInternetDisponibles()).toBe(8);
                expect(cliente.calcularMinutosLlamadaDisponibles()).toBe(200);
                expect(cliente.tieneUnPaqueteActivo()).toBe(true);
        });

        test("Cuando un cliente agota uno de los tipos consumo, igualmente puede consumir del otro tipo y el paquete continúa activo", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = crearPaqueteOfertado(10, 1200, 7, 5000);
                const unConsumo = new Consumo(new CantidadMB(2000), new Date("2026-02-23T10:00:00Z"), new Date("2026-02-24T10:00:00Z"));
                const otroConsumo = new Consumo(new MinutosLlamadas(1200), new Date("2026-02-24T10:00:00Z"), new Date("2026-02-26T10:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete);
                cliente.realizarUn(unConsumo);
                cliente.realizarUn(otroConsumo);

                expect(cliente.calcularMinutosLlamadaDisponibles()).toBe(0);
                expect(cliente.calcularDatosInternetDisponibles()).toBe(8);
                expect(cliente.tieneUnPaqueteActivo()).toBe(true);
        });

        test("Cuando un cliente con un paquete activo intenta realizar un consumo de Internet por encima de lo disponible, entonces falla", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = crearPaqueteOfertado(10, 1200, 7, 5000);
                const consumo = new Consumo(new CantidadMB(12000), new Date("2026-02-23T10:00:00Z"), new Date("2026-02-24T10:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete);

                expect(() => cliente.realizarUn(consumo)).toThrow("No hay saldo de datos de Internet suficiente");
        });

        test("Cuando un cliente con un paquete activo intenta realizar un consumo de minutos de llamada por encima de lo disponible, entonces falla", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = crearPaqueteOfertado(10, 1200, 7, 5000);
                const consumo = new Consumo(new MinutosLlamadas(12000), new Date("2026-02-23T10:00:00Z"), new Date("2026-02-24T10:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete);

                expect(() => cliente.realizarUn(consumo)).toThrow("No hay saldo de minutos de llamada suficiente");
        });

        test("Cuando un cliente con un paquete activo consume todos los datos de Internet y todos los minutos de llamada, entonces el paquete se agota y falla", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = crearPaqueteOfertado(10, 1200, 7, 5000);
                const consumo = new Consumo(new MinutosLlamadas(1200), new Date("2026-02-23T10:00:00Z"), new Date("2026-02-24T10:00:00Z"));
                const otroConsumo = new Consumo(new CantidadMB(10000), new Date("2026-02-23T10:00:00Z"), new Date("2026-02-24T10:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete);
                cliente.realizarUn(consumo);
                cliente.realizarUn(otroConsumo);

                expect(() => cliente.realizarUn(consumo)).toThrow("El paquete actual del cliente se encuentra agotado. No puede realizar llamadas");
                expect(() => cliente.realizarUn(otroConsumo)).toThrow("El paquete actual del cliente se encuentra agotado. No puede consumir datos de Internet");
        });

        test("Cuando un cliente con un paquete activo intenta realizar un consumo posterior a la fecha de vencimiento del paquete, entonces falla", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = crearPaqueteOfertado(10, 1200, 1, 5000);
                const consumo = new Consumo(new MinutosLlamadas(1200), new Date("2026-02-23T10:00:00Z"), new Date("2026-02-24T10:00:00Z"));
                const otroConsumo = new Consumo(new CantidadMB(10000), new Date("2026-02-23T10:00:00Z"), new Date("2026-02-24T10:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete, new Date("2026-02-10T10:00:00Z"));

                expect(() => cliente.realizarUn(consumo)).toThrow("El paquete actual del cliente se encuentra vencido. No puede realizar llamadas");
                expect(() => cliente.realizarUn(otroConsumo)).toThrow("El paquete actual del cliente se encuentra vencido. No puede consumir datos de Internet");
        });

        test("Cuando un cliente con un paquete vencido lo renueva, entonces puede voler a consumir datos y realizar llamadas, con su saldo actualizado correctamente", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = crearPaqueteOfertado(10, 1200, 1, 5000);
                const fechaDeCompra = new Date("2026-02-10T10:00:00Z");
                const fechaDeRenovacion = new Date("2026-02-12T10:00:00Z");
                const consumo = new Consumo(new MinutosLlamadas(200), new Date("2026-02-12T11:00:00Z"), new Date("2026-02-12T12:00:00Z"));
                const otroConsumo = new Consumo(new CantidadMB(5000), new Date("2026-02-12T13:00:00Z"), new Date("2026-02-24T14:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete, fechaDeCompra);
                cliente.renovarPaqueteAlMomentoDe(fechaDeRenovacion);
                cliente.realizarUn(consumo);
                cliente.realizarUn(otroConsumo);

                expect(cliente.calcularDatosInternetDisponibles()).toBe(5);
                expect(cliente.calcularMinutosLlamadaDisponibles()).toBe(1000);
                expect(cliente.tieneUnPaqueteActivo()).toBe(true);
           
        });

        test("Cuando un cliente con un paquete agotado lo renueva, entonces puede voler a consumir datos y realizar llamadas, con su saldo actualizado correctamente", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = crearPaqueteOfertado(10, 0, 7, 5000);
                const fechaDeCompra = new Date("2026-02-10T10:00:00Z");
                const fechaDeRenovacion = new Date("2026-02-12T10:00:00Z");
                const consumo = new Consumo(new CantidadMB(10000), new Date("2026-02-12T11:00:00Z"), new Date("2026-02-12T12:00:00Z"));
                const otroConsumo = new Consumo(new CantidadMB(5000), new Date("2026-02-12T13:00:00Z"), new Date("2026-02-24T14:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete, fechaDeCompra);
                cliente.realizarUn(consumo, new Date("2026-02-12T11:00:00Z"));
                cliente.renovarPaqueteAlMomentoDe(fechaDeRenovacion);
                cliente.realizarUn(otroConsumo);

                expect(cliente.calcularDatosInternetDisponibles()).toBe(5);
                expect(cliente.tieneUnPaqueteActivo()).toBe(true);
           
        });



})
