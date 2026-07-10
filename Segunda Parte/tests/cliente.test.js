const AppUsoIlimitado = require("../src/appUsoIlimitado");
const Cliente = require("../src/cliente");
const Consumo = require("../src/consumo");
const CantidadGB = require("../src/tipoCantidadGB");
const CantidadMB = require("../src/tipoCantidadMB");
const MinutosLlamadas = require("../src/tipoMinutosLlamadas");
const { 
        paqueteDe10GBy20HsUnaSemana,
        paqueteDe10GBUnaSemana,
        paqueteDe10GBUnDia,
        paqueteDe10GBy20HsUnDia,
        paqueteDe50GBUnMes,
        paqueteDe1GBUnaSemana,
        paqueteDe10GBUnaSemanaWhatsAppIlimitado,
} = require("./paqueteFactory");

describe("Sistema para la venta de paquetes de una compañía telefónica", ()=>{
        
        test("Cuando una persona apenas se registra como cliente, entonces no tiene un paquete activo", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                expect(cliente.tieneUnPaqueteActivo()).toBe(false);
        });

        test("Cuando una persona apenas se registra como cliente de la compañía, entonces tiene un saldo nulo", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                expect(cliente.calcularSaldo()).toBe(0)
        });

        test("Cuando un cliente realiza una carga de dinero exitosa, entonces su saldo debe reflejar correctamente ese monto", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const montoDeLaCarga = 1000;
                cliente.cargarSaldoCon(montoDeLaCarga);
                expect(cliente.calcularSaldo()).toBe(montoDeLaCarga)
        });

        test("Cuando un cliente realiza dos cargas, entonces su saldo se acumula", ()=>{
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
                expect(() => cliente.cargarSaldoCon(montoDeLaCarga)).toThrow("La cantidad de dinero no puede ser negativa");
        });

        test("Cuando un cliente sin un paquete activo compra uno exitosamente, entonces este se activa", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const montoDeLaCarga = 10000;
                const paquete = paqueteDe10GBUnaSemana();

                cliente.cargarSaldoCon(montoDeLaCarga);
                cliente.comprarUn(paquete);

                expect(cliente.tieneUnPaqueteActivo()).toBe(true)
        });

        test("Cuando un cliente compra exitosamente un paquete, entonces su saldo disminiuye por el precio del paquete", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const montoDeLaCarga = 10000;
                const precioDelPaquete = 5000;
                const paquete = paqueteDe10GBUnaSemana(precioDelPaquete)

                cliente.cargarSaldoCon(montoDeLaCarga);
                cliente.comprarUn(paquete);

                expect(cliente.calcularSaldo()).toBe(montoDeLaCarga - precioDelPaquete)
        });

        test("Cuando un cliente compra exitosamente un paquete con todo su saldo, entonces este pasa a ser nulo", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const montoDeLaCarga = 10000;
                const precioDelPaquete = 10000;
                const paquete = paqueteDe50GBUnMes(precioDelPaquete)

                cliente.cargarSaldoCon(montoDeLaCarga);
                cliente.comprarUn(paquete);

                expect(cliente.calcularSaldo()).toBe(0)
        });

        test("Cuando un cliente intenta comprar un paquete de mayor valor que su saldo actual, entonces falla y su saldo no disminuye", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const montoDeLaCarga = 10;
                const paquete = paqueteDe10GBUnaSemana()

                cliente.cargarSaldoCon(montoDeLaCarga);

                expect(() => cliente.comprarUn(paquete)).toThrow("No hay saldo de dinero suficiente");
                expect(cliente.calcularSaldo()).toBe(montoDeLaCarga);
        });

        test("Cuando un cliente con un paquete activo intenta comprar otro, entonces falla y su saldo no vuelve a disminuir", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const montoDeLaCarga = 10000;
                const precioDeUnPaquete = 5000;
                const paquete = paqueteDe10GBUnaSemana(precioDeUnPaquete)
                const otroPaquete = paqueteDe1GBUnaSemana()

                cliente.cargarSaldoCon(montoDeLaCarga);
                cliente.comprarUn(paquete);

                expect(() => cliente.comprarUn(otroPaquete)).toThrow("El cliente ya dispone de un paquete activo");
                expect(cliente.calcularSaldo()).toBe(montoDeLaCarga - precioDeUnPaquete);
        });

        test("Cuando un cliente intenta comprar un paquete de mayor valor que el de su saldo actual, entonces falla y su saldo no disminuye", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const montoDeLaCarga = 10;
                const paquete = paqueteDe10GBUnaSemana()

                cliente.cargarSaldoCon(montoDeLaCarga);

                expect(() => cliente.comprarUn(paquete)).toThrow("No hay saldo de dinero suficiente");
                expect(cliente.calcularSaldo()).toBe(montoDeLaCarga);
        });

        test("Cuando un cliente con un paquete de datos activo consume una cantidad de datos válida, entonces su cantidad de datos disponible se reduce sólo en esa cantidad", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const cantidadGBPaquete = 10;
                const cantidadMBConsumidos = 50;
                const paquete = paqueteDe10GBUnaSemana()
                const consumoDeDatos = new Consumo(new CantidadMB(cantidadMBConsumidos), new Date("2026-02-23T10:00:00Z"), new Date("2026-02-24T10:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete);
                cliente.realizarUn(consumoDeDatos);

                expect(cliente.calcularDatosInternetDisponibles()).toBe(cantidadGBPaquete-(cantidadMBConsumidos/1000));
        });

        test("Cuando un cliente consume todos sus datos, entonces su saldo de datos de Internet es nulo", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const cantidadGBPaquete = 10;
                const cantidadMBConsumidos = 100;
                const paquete = paqueteDe10GBUnaSemana()
                const consumoDeDatos = new Consumo(new CantidadMB(cantidadMBConsumidos), new Date("2026-02-23T10:00:00Z"), new Date("2026-02-24T10:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete);
                cliente.realizarUn(consumoDeDatos);

                expect(cliente.calcularDatosInternetDisponibles()).toBe(cantidadGBPaquete-(cantidadMBConsumidos/1000));
        });

        test("Cuando un cliente consume una cantidad de datos menor a la adquirida en el paquete, entonces puede seguir haciendo más consumos", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = paqueteDe10GBUnaSemana();
                const primerConsumoDeDatos = new Consumo(new CantidadMB(5000), new Date("2026-02-23T10:00:00Z"), new Date("2026-02-24T10:00:00Z"));
                const segundoConsumoDeDatos = new Consumo(new CantidadMB(1000), new Date("2026-02-24T10:00:00Z"), new Date("2026-02-26T10:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete);
                cliente.realizarUn(primerConsumoDeDatos);
                cliente.realizarUn(segundoConsumoDeDatos);

                expect(cliente.calcularDatosInternetDisponibles()).toBe(4);
        });

        test("Cuando un cliente realiza consumos de distinto tipo por debajo del límite de su paquete, entonces su paquete sigue activo", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = paqueteDe10GBy20HsUnaSemana();
                const consumoDeInternet = new Consumo(new CantidadMB(2000), new Date("2026-02-23T10:00:00Z"), new Date("2026-02-24T10:00:00Z"));
                const consumoDeMinutos = new Consumo(new MinutosLlamadas(1000), new Date("2026-02-24T10:00:00Z"), new Date("2026-02-26T10:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete);
                cliente.realizarUn(consumoDeInternet);
                cliente.realizarUn(consumoDeMinutos);

                expect(cliente.calcularDatosInternetDisponibles()).toBe(8);
                expect(cliente.calcularMinutosLlamadaDisponibles()).toBe(200);
                expect(cliente.tieneUnPaqueteActivo()).toBe(true);
        });

        test("Cuando un cliente agota uno de los tipos consumo, igualmente puede consumir del otro tipo y el paquete continúa activo", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = paqueteDe10GBy20HsUnaSemana();
                const consumoQueAgotaDatos = new Consumo(new CantidadMB(2000), new Date("2026-02-23T10:00:00Z"), new Date("2026-02-24T10:00:00Z"));
                const consumoDeMinutos = new Consumo(new MinutosLlamadas(1200), new Date("2026-02-24T10:00:00Z"), new Date("2026-02-26T10:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete);
                cliente.realizarUn(consumoQueAgotaDatos);
                cliente.realizarUn(consumoDeMinutos);

                expect(cliente.calcularMinutosLlamadaDisponibles()).toBe(0);
                expect(cliente.calcularDatosInternetDisponibles()).toBe(8);
                expect(cliente.tieneUnPaqueteActivo()).toBe(true);
        });

        test("Cuando un cliente con un paquete activo intenta realizar un consumo de Internet por encima de lo disponible, entonces falla", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = paqueteDe10GBUnaSemana();
                const consumoDeDatos = new Consumo(new CantidadMB(12000), new Date("2026-02-23T10:00:00Z"), new Date("2026-02-24T10:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete);

                expect(() => cliente.realizarUn(consumoDeDatos)).toThrow("No hay saldo de datos de Internet en GB suficiente");
        });

        test("Cuando un cliente con un paquete activo intenta realizar un consumo de minutos de llamada por encima de lo disponible, entonces falla", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = paqueteDe10GBy20HsUnaSemana();
                const consumoDeMinutos = new Consumo(new MinutosLlamadas(12000), new Date("2026-02-23T10:00:00Z"), new Date("2026-02-24T10:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete);

                expect(() => cliente.realizarUn(consumoDeMinutos)).toThrow("No hay saldo de minutos de llamada suficiente");
        });

        test("Cuando un cliente con un paquete activo consume todos los datos de Internet y todos los minutos de llamada, entonces el paquete se agota y falla", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = paqueteDe10GBy20HsUnaSemana();
                const consumoQueAgotaMinutos = new Consumo(new MinutosLlamadas(1200), new Date("2026-02-23T10:00:00Z"), new Date("2026-02-24T10:00:00Z"));
                const consumoQueAgotaDatos = new Consumo(new CantidadMB(10000), new Date("2026-02-23T10:00:00Z"), new Date("2026-02-24T10:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete);
                cliente.realizarUn(consumoQueAgotaMinutos);
                cliente.realizarUn(consumoQueAgotaDatos);

                expect(() => cliente.realizarUn(consumoQueAgotaMinutos)).toThrow("El paquete actual del cliente se encuentra agotado. No puede realizar llamadas");
                expect(() => cliente.realizarUn(consumoQueAgotaDatos)).toThrow("El paquete actual del cliente se encuentra agotado. No puede consumir datos de Internet");
        });

        test("Cuando un cliente con un paquete activo intenta realizar un consumo posterior a la fecha de vencimiento del paquete, entonces falla", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = paqueteDe10GBUnDia();
                const consumoDeMinutos = new Consumo(new MinutosLlamadas(1200), new Date("2026-02-23T10:00:00Z"), new Date("2026-02-24T10:00:00Z"));
                const consumoDeDatos = new Consumo(new CantidadMB(10000), new Date("2026-02-23T10:00:00Z"), new Date("2026-02-24T10:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete, new Date("2026-02-10T10:00:00Z"));

                expect(() => cliente.realizarUn(consumoDeMinutos)).toThrow("El paquete actual del cliente se encuentra vencido. No puede realizar llamadas");
                expect(() => cliente.realizarUn(consumoDeDatos)).toThrow("El paquete actual del cliente se encuentra vencido. No puede consumir datos de Internet");
        });

        test("Cuando un cliente con un paquete vencido lo renueva, entonces puede volver a consumir datos y realizar llamadas, con su saldo actualizado correctamente", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = paqueteDe10GBy20HsUnaSemana();
                const fechaDeCompra = new Date("2026-02-01T10:00:00Z");
                const fechaDeRenovacion = new Date("2026-02-12T10:00:00Z");
                const consumoDeMinutos = new Consumo(new MinutosLlamadas(200), new Date("2026-02-12T11:00:00Z"), new Date("2026-02-12T12:00:00Z"));
                const consumoDeDatos = new Consumo(new CantidadMB(5000), new Date("2026-02-12T13:00:00Z"), new Date("2026-02-24T14:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete, fechaDeCompra);
                cliente.renovarPaquete(fechaDeRenovacion);
                cliente.realizarUn(consumoDeMinutos);
                cliente.realizarUn(consumoDeDatos);

                expect(cliente.calcularDatosInternetDisponibles()).toBe(5);
                expect(cliente.calcularMinutosLlamadaDisponibles()).toBe(1000);
                expect(cliente.tieneUnPaqueteActivo()).toBe(true);
           
        });

        test("Cuando un cliente con un paquete agotado lo renueva, entonces puede voler a consumir datos y realizar llamadas, con su saldo actualizado correctamente", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = paqueteDe10GBUnaSemana();
                const fechaDeCompra = new Date("2026-02-10T10:00:00Z");
                const fechaDeRenovacion = new Date("2026-02-12T10:00:00Z");
                const consumoQueAgotaPaquete = new Consumo(new CantidadMB(10000), new Date("2026-02-12T11:00:00Z"), new Date("2026-02-12T12:00:00Z"));
                const otroConsumo = new Consumo(new CantidadMB(5000), new Date("2026-02-12T13:00:00Z"), new Date("2026-02-24T14:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete, fechaDeCompra);
                cliente.realizarUn(consumoQueAgotaPaquete);
                cliente.renovarPaquete(fechaDeRenovacion);
                cliente.realizarUn(otroConsumo);

                expect(cliente.calcularDatosInternetDisponibles()).toBe(5);
                expect(cliente.tieneUnPaqueteActivo()).toBe(true);
           
        });

        test("Cuando un cliente con un paquete activo intenta renovarlo, entonces falla", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = paqueteDe10GBUnaSemana();
                const consumoDeDatos = new Consumo(new CantidadMB(1000), new Date("2026-06-27T10:00:00Z"), new Date("2026-06-27T11:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete);
                cliente.realizarUn(consumoDeDatos);

                expect(cliente.calcularDatosInternetDisponibles()).toBe(9);
                expect(cliente.tieneUnPaqueteActivo()).toBe(true);
                expect(() => cliente.renovarPaquete()).toThrow("El cliente ya dispone de un paquete activo")
           
        });

        test("Cuando un cliente con renovación automática activa agota un paquete y realiza otro consumo, teniendo saldo para renovar, entonces se renueva automáticamente ", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = paqueteDe10GBUnaSemana();
                const fechaDeCompra = new Date("2026-06-25T10:00:00Z");
                const consumoQueAgota = new Consumo(new CantidadMB(10000), new Date("2026-06-27T11:00:00Z"), new Date("2026-06-27T12:00:00Z"));
                const otroConsumo = new Consumo(new CantidadMB(5000), new Date("2026-06-27T13:00:00Z"), new Date("2026-06-27T14:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete, fechaDeCompra);
                cliente.activarRenovacionAutomatica();
                cliente.realizarUn(consumoQueAgota);
                cliente.realizarUn(otroConsumo);

                expect(cliente.calcularDatosInternetDisponibles()).toBe(5);
                expect(cliente.tieneUnPaqueteActivo()).toBe(true);
           
        });

        test("Cuando un cliente con renovación automática activa, y saldo suficiente, realiza un consumo con el paquete vencido, entonces se renueva automáticamente ", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = paqueteDe10GBUnDia();
                const fechaDeCompraVencida = new Date("2026-06-20T10:00:00Z");
                const consumoDeDatos = new Consumo(new CantidadMB(500), new Date("2026-06-27T11:00:00Z"), new Date("2026-06-27T12:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete, fechaDeCompraVencida);
                cliente.activarRenovacionAutomatica();
                cliente.realizarUn(consumoDeDatos);

                expect(cliente.tieneUnPaqueteActivo()).toBe(true);
           
        });


        test("Cuando un cliente con renovación automática activa realiza un consumo con el paquete vencido pero no tiene saldo suficiente, entonces falla ", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = paqueteDe10GBUnDia();
                const fechaDeCompraVencida = new Date("2026-06-20T10:00:00Z");
                const consumoDeDatos = new Consumo(new CantidadMB(10000), new Date("2026-06-27T11:00:00Z"), new Date("2026-06-27T12:00:00Z"));

                cliente.cargarSaldoCon(6000);
                cliente.comprarUn(paquete, fechaDeCompraVencida);
                cliente.activarRenovacionAutomatica();

                expect(() => cliente.realizarUn(consumoDeDatos)).toThrow("No hay saldo de dinero suficiente");
                expect(cliente.tieneUnPaqueteActivo()).toBe(false);
           
        });

        test("Cuando un cliente con renovación automática y un paquete activo realiza un consumo válido, entonces el paquete no se renueva", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = paqueteDe10GBUnaSemana();
                const fechaDeCompra = new Date("2026-06-25T10:00:00Z");
                const consumoDeDatos = new Consumo(new CantidadMB(8000), new Date("2026-06-27T11:00:00Z"), new Date("2026-06-27T12:00:00Z"));

                cliente.cargarSaldoCon(6000);
                cliente.activarRenovacionAutomatica();
                cliente.comprarUn(paquete, fechaDeCompra);
                cliente.realizarUn(consumoDeDatos);

                expect(cliente.tieneUnPaqueteActivo()).toBe(true);
           
        });

        test("Cuando un cliente con renovación automática agota su paquete activo e intenta realizar otro consumo, pero tampoco tiene saldo suficiente para renovar, entonces falla", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = paqueteDe10GBUnaSemana();
                const fechaDeCompra = new Date("2026-06-25T10:00:00Z");
                const consumoQueAgota = new Consumo(new CantidadMB(10000), new Date("2026-06-27T11:00:00Z"), new Date("2026-06-27T12:00:00Z"));
                const consumoPosterior = new Consumo(new CantidadMB(1000), new Date("2026-06-27T13:00:00Z"), new Date("2026-06-27T14:00:00Z"));

                cliente.cargarSaldoCon(6000);
                cliente.activarRenovacionAutomatica();
                cliente.comprarUn(paquete, fechaDeCompra);
                cliente.realizarUn(consumoQueAgota);

                expect(cliente.tieneUnPaqueteActivo()).toBe(false);
                expect(cliente.calcularSaldo()).toBe(1000);
                expect(() => cliente.realizarUn(consumoPosterior)).toThrow("El paquete actual del cliente se encuentra agotado y no tiene saldo suficiente para renovar.");
        });

        test("Cuando un cliente desactiva la renovacion automatica, entonces un paquete vencido no se renueva automaticamente", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = paqueteDe10GBUnDia();
                const fechaDeCompraVencida = new Date("2026-06-20T10:00:00Z");
                const consumoDeDatos = new Consumo(new CantidadMB(500), new Date("2026-06-27T11:00:00Z"), new Date("2026-06-27T12:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete, fechaDeCompraVencida);
                cliente.activarRenovacionAutomatica();
                cliente.desactivarRenovacionAutomatica();

                expect(() => cliente.realizarUn(consumoDeDatos)).toThrow("El paquete actual del cliente se encuentra vencido. No puede consumir datos de Internet");
                expect(cliente.calcularSaldo()).toBe(15000);
                expect(cliente.tieneUnPaqueteActivo()).toBe(false);
        });

        test("Cuando un cliente realiza un consumo y luego puede verlo en su historial, entonces es válido", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = paqueteDe10GBUnaSemana();
                const consumoDeDatos = new Consumo(new CantidadMB(5000), new Date("2026-06-23T10:00:00Z"), new Date("2026-06-24T10:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete);
                cliente.realizarUn(consumoDeDatos);

                expect(cliente.detallarConsumos()).toEqual([consumoDeDatos]);
        });

        test("Cuando un cliente consulta su historial de consumos, entonces los obtiene ordenados por fecha de inicio", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = paqueteDe10GBUnaSemana();
                const consumoMasNuevo = new Consumo(new CantidadMB(1000), new Date("2026-06-25T10:00:00Z"), new Date("2026-06-25T11:00:00Z"));
                const consumoMasViejo = new Consumo(new CantidadMB(1000), new Date("2026-06-23T10:00:00Z"), new Date("2026-06-23T11:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete);
                cliente.realizarUn(consumoMasNuevo);
                cliente.realizarUn(consumoMasViejo);

                expect(cliente.detallarConsumos()).toEqual([consumoMasViejo, consumoMasNuevo]);
        });

        test("Cuando un cliente consulta consumos entre dos fechas, entonces obtiene solo los consumos dentro de ese rango", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = paqueteDe10GBUnaSemana();
                const consumoAnterior = new Consumo(new CantidadMB(1000), new Date("2026-06-21T10:00:00Z"), new Date("2026-06-21T11:00:00Z"));
                const consumoDentroDelRango = new Consumo(new CantidadMB(1000), new Date("2026-06-23T10:00:00Z"), new Date("2026-06-23T11:00:00Z"));
                const consumoPosterior = new Consumo(new CantidadMB(1000), new Date("2026-06-25T10:00:00Z"), new Date("2026-06-25T11:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete);
                cliente.realizarUn(consumoPosterior);
                cliente.realizarUn(consumoDentroDelRango);
                cliente.realizarUn(consumoAnterior);

                expect(cliente.detallarConsumosEntre(new Date("2026-06-23T00:00:00Z"), new Date("2026-06-24T00:00:00Z"))).toEqual([consumoDentroDelRango]);
        });

        test("Cuando un cliente realiza un consumo con una app de uso ilimitado, entonces sus datos restantes no disminuyen", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = paqueteDe10GBUnaSemanaWhatsAppIlimitado();
                const consumo = new Consumo(new CantidadMB(1000), new Date("2026-06-21T10:00:00Z"), new Date("2026-06-21T11:00:00Z"), new AppUsoIlimitado("WhatsApp"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete);
                cliente.realizarUn(consumo);

                expect(cliente.calcularDatosInternetDisponibles()).toBe(10);
        });

        
        test("Cuando un cliente realizar un consumo sin detallar la aplicación, entonces sus datos restantes disminuyen aunque haya una app de uso ilimitado para el paquete", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = paqueteDe10GBUnaSemanaWhatsAppIlimitado();
                const consumo = new Consumo(new CantidadMB(1000), new Date("2026-06-21T10:00:00Z"), new Date("2026-06-21T11:00:00Z"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete);
                cliente.realizarUn(consumo);

                expect(cliente.calcularDatosInternetDisponibles()).toBe(9);
        });

        test("Cuando un cliente realiza un consumo con una app distinta a la especificada para uso ilimitado, entonces sus datos restantes disminuyen", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = paqueteDe10GBUnaSemanaWhatsAppIlimitado();
                const consumo = new Consumo(new CantidadMB(1000), new Date("2026-06-21T10:00:00Z"), new Date("2026-06-21T11:00:00Z"), new AppUsoIlimitado("YouTube"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete);
                cliente.realizarUn(consumo);

                expect(cliente.calcularDatosInternetDisponibles()).toBe(9);
        });

        test("Cuando un cliente renueva automáticamente su paquete por vencimiento, entonces conserva el beneficio de uso ilimitado de la app correspondiente", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = paqueteDe10GBUnaSemanaWhatsAppIlimitado();
                const consumo = new Consumo(new CantidadMB(1000), new Date("2026-06-21T10:00:00Z"), new Date("2026-06-21T11:00:00Z"), new AppUsoIlimitado("WhatsApp"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete, new Date("2026-01-01T10:00:00Z"));
                cliente.activarRenovacionAutomatica()
                cliente.realizarUn(consumo);

                expect(cliente.calcularDatosInternetDisponibles()).toBe(10);
        });

        test("Cuando un cliente renueva automáticamente su paquete por agotamiento, entonces conserva el beneficio de uso ilimitado de la app correspondiente", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = paqueteDe10GBUnaSemanaWhatsAppIlimitado();
                const consumoUsoIlimitado = new Consumo(new CantidadMB(1000), new Date("2026-06-21T10:00:00Z"), new Date("2026-06-21T11:00:00Z"), new AppUsoIlimitado("WhatsApp"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete);
                cliente.activarRenovacionAutomatica();
                cliente.realizarUn(consumoUsoIlimitado);

                expect(cliente.calcularDatosInternetDisponibles()).toBe(10);
        });

        test("Cuando un cliente realiza un consumo con una app de uso ilimitado para su paquete, pero ya se agotó el uso de datos previamente, entonces falla ", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = paqueteDe10GBUnaSemanaWhatsAppIlimitado();
                const consumoQueAgota = new Consumo(new CantidadMB(10000), new Date("2026-06-27T11:00:00Z"), new Date("2026-06-27T12:00:00Z"))
                const consumoUsoIlimitado = new Consumo(new CantidadMB(1000), new Date("2026-06-21T10:00:00Z"), new Date("2026-06-21T11:00:00Z"), new AppUsoIlimitado("WhatsApp"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete);
                cliente.realizarUn(consumoQueAgota);

                expect(() => cliente.realizarUn(consumoUsoIlimitado)).toThrow("El paquete actual del cliente se encuentra agotado. No puede consumir datos de Internet");
        });

        test("Cuando un cliente realiza un consumo con una app de uso ilimitado para su paquete, pero se encuentra vencido, entonces falla ", ()=>{
                const cliente = new Cliente("Juan Perez", "+5491112345678");
                const paquete = paqueteDe10GBUnaSemanaWhatsAppIlimitado();
                const consumoUsoIlimitado = new Consumo(new CantidadMB(1000), new Date("2026-06-21T10:00:00Z"), new Date("2026-06-21T11:00:00Z"), new AppUsoIlimitado("WhatsApp"));

                cliente.cargarSaldoCon(20000);
                cliente.comprarUn(paquete, new Date("2026-01-01T10:00:00Z"));

                expect(() => cliente.realizarUn(consumoUsoIlimitado)).toThrow("El paquete actual del cliente se encuentra vencido. No puede consumir datos de Internet");
        });

        test("Cuando un cliente presta datos y minutos a otro con paquete agotado, entonces se descuentan del otorgante y se activan en el receptor", ()=>{
                const otorgante = new Cliente("Juan Perez", "+5491112345678");
                const receptor = new Cliente("Ana Gomez", "+5493481234567");
                const paqueteDelOtorgante = paqueteDe10GBy20HsUnaSemana();
                const paqueteDelReceptor = paqueteDe1GBUnaSemana();
                const consumoQueAgotaAlReceptor = new Consumo(new CantidadMB(1000), new Date("2026-06-21T10:00:00Z"), new Date("2026-06-21T11:00:00Z"));

                otorgante.cargarSaldoCon(20000);
                receptor.cargarSaldoCon(20000);
                otorgante.comprarUn(paqueteDelOtorgante);
                receptor.comprarUn(paqueteDelReceptor);
                receptor.realizarUn(consumoQueAgotaAlReceptor);

                otorgante.prestarA(receptor, [new CantidadMB(1000), new MinutosLlamadas(100)], new Date("2026-06-22T10:00:00Z"));

                expect(otorgante.calcularDatosInternetDisponibles()).toBe(9);
                expect(otorgante.calcularMinutosLlamadaDisponibles()).toBe(1100);
                expect(receptor.calcularDatosInternetDisponibles()).toBe(1);
                expect(receptor.calcularMinutosLlamadaDisponibles()).toBe(100);
        });

        test("Cuando se realiza un préstamo, entonces queda registrado en el historial del cliente que otorga y del que recibe", ()=>{
                const otorgante = new Cliente("Juan Perez", "+5491112345678");
                const receptor = new Cliente("Ana Gomez", "+5493481234567");
                const paqueteDelOtorgante = paqueteDe10GBUnaSemana();
                const paqueteDelReceptor = paqueteDe1GBUnaSemana();
                const consumoQueAgotaAlReceptor = new Consumo(new CantidadMB(1000), new Date("2026-06-21T10:00:00Z"), new Date("2026-06-21T11:00:00Z"));

                otorgante.cargarSaldoCon(20000);
                receptor.cargarSaldoCon(20000);
                otorgante.comprarUn(paqueteDelOtorgante);
                receptor.comprarUn(paqueteDelReceptor);
                receptor.realizarUn(consumoQueAgotaAlReceptor);
                const prestamo = otorgante.prestarA(receptor, [new CantidadMB(1000)], new Date("2026-06-22T10:00:00Z"));

                expect(otorgante.detallarConsumos()).toContain(prestamo);
                expect(receptor.detallarConsumos()).toContain(prestamo);
        });

        test("Cuando el receptor tiene un paquete activo, entonces no puede recibir un préstamo y no se descuentan recursos del otorgante", ()=>{
                const otorgante = new Cliente("Juan Perez", "+5491112345678");
                const receptor = new Cliente("Ana Gomez", "+5493481234567");
                const paqueteDelOtorgante = paqueteDe10GBUnaSemana();
                const paqueteDelReceptor = paqueteDe1GBUnaSemana();

                otorgante.cargarSaldoCon(20000);
                receptor.cargarSaldoCon(20000);
                otorgante.comprarUn(paqueteDelOtorgante);
                receptor.comprarUn(paqueteDelReceptor);

                expect(() => otorgante.prestarA(receptor, [new CantidadMB(1000)], new Date("2026-06-22T10:00:00Z"))).toThrow("El cliente ya dispone de un paquete activo");
                expect(otorgante.calcularDatosInternetDisponibles()).toBe(10);
        });

        test("Cuando un préstamo falla por recursos insuficientes, entonces no se descuenta parcialmente al otorgante", ()=>{
                const otorgante = new Cliente("Juan Perez", "+5491112345678");
                const receptor = new Cliente("Ana Gomez", "+5493481234567");
                const paqueteDelOtorgante = paqueteDe10GBUnaSemana();
                const paqueteDelReceptor = paqueteDe1GBUnaSemana();
                const consumoQueAgotaAlReceptor = new Consumo(new CantidadMB(1000), new Date("2026-06-21T10:00:00Z"), new Date("2026-06-21T11:00:00Z"));

                otorgante.cargarSaldoCon(20000);
                receptor.cargarSaldoCon(20000);
                otorgante.comprarUn(paqueteDelOtorgante);
                receptor.comprarUn(paqueteDelReceptor);
                receptor.realizarUn(consumoQueAgotaAlReceptor);

                expect(() => otorgante.prestarA(receptor, [new CantidadMB(1000), new MinutosLlamadas(1)], new Date("2026-06-22T10:00:00Z"))).toThrow("No hay saldo de minutos de llamada suficiente");
                expect(otorgante.calcularDatosInternetDisponibles()).toBe(10);
        });

        test("Cuando un cliente intenta hacer un préstamo a otro cliente sin un paquete vencido o agotado, entonces falla", ()=>{
                const otorgante = new Cliente("Juan Perez", "+5491112345678");
                const receptor = new Cliente("Ana Gomez", "+5493481234567");
                const paqueteDelOtorgante = paqueteDe10GBUnaSemana();

                otorgante.cargarSaldoCon(20000);
                otorgante.comprarUn(paqueteDelOtorgante);

                expect(() => otorgante.prestarA(receptor, [new CantidadMB(1000)], new Date("2026-06-22T10:00:00Z"))).toThrow("El cliente debe tener un plan o préstamo vencido o agotado para recibir un préstamo");
        });

        test("Cuando un cliente con un préstamo vencido intenta hacer un consumo, entonces falla", ()=>{
                const otorgante = new Cliente("Juan Perez", "+5491112345678");
                const receptor = new Cliente("Ana Gomez", "+5493481234567");
                const paqueteDelOtorgante = paqueteDe10GBUnDia();
                const paqueteDelReceptor = paqueteDe1GBUnaSemana();
                const consumoQueAgotaAlReceptor = new Consumo(new CantidadMB(1000), new Date("2026-06-20T10:00:00Z"), new Date("2026-06-20T11:00:00Z"));
                const consumoPosteriorAlVencimientoDelPrestamo = new Consumo(new CantidadMB(500), new Date("2026-06-22T10:00:00Z"), new Date("2026-06-22T11:00:00Z"));

                otorgante.cargarSaldoCon(20000);
                receptor.cargarSaldoCon(20000);
                otorgante.comprarUn(paqueteDelOtorgante, new Date("2026-06-20T09:00:00Z"));
                receptor.comprarUn(paqueteDelReceptor);
                receptor.realizarUn(consumoQueAgotaAlReceptor);
                otorgante.prestarA(receptor, [new CantidadMB(1000)], new Date("2026-06-20T10:00:00Z"));

                expect(() => receptor.realizarUn(consumoPosteriorAlVencimientoDelPrestamo)).toThrow("El préstamo actual del cliente se encuentra vencido. No puede consumir datos de Internet");
        });

        test("Cuando el receptor tiene un paquete vencido, entonces puede recibir un préstamo", ()=>{
                const otorgante = new Cliente("Juan Perez", "+5491112345678");
                const receptor = new Cliente("Ana Gomez", "+5493481234567");
                const paqueteDelOtorgante = paqueteDe10GBUnaSemana();
                const paqueteVencidoDelReceptor = paqueteDe1GBUnaSemana();

                otorgante.cargarSaldoCon(20000);
                receptor.cargarSaldoCon(20000);
                otorgante.comprarUn(paqueteDelOtorgante, new Date("2026-06-20T10:00:00Z"));
                receptor.comprarUn(paqueteVencidoDelReceptor, new Date("2026-06-01T10:00:00Z"));
                otorgante.prestarA(receptor, [new CantidadMB(1000)], new Date("2026-06-22T10:00:00Z"));

                expect(receptor.calcularDatosInternetDisponibles()).toBe(1);
        });

        test("Cuando el receptor agota un préstamo, entonces no puede seguir consumiendo sus recursos", ()=>{
                const otorgante = new Cliente("Juan Perez", "+5491112345678");
                const receptor = new Cliente("Ana Gomez", "+5493481234567");
                const paqueteDelOtorgante = paqueteDe10GBUnaSemana();
                const paqueteDelReceptor = paqueteDe1GBUnaSemana();
                const consumoQueAgotaAlReceptor = new Consumo(new CantidadMB(1000), new Date("2026-06-21T10:00:00Z"), new Date("2026-06-21T11:00:00Z"));
                const consumoQueAgotaElPrestamo = new Consumo(new CantidadMB(1000), new Date("2026-06-22T10:00:00Z"), new Date("2026-06-22T11:00:00Z"));
                const consumoPosterior = new Consumo(new CantidadMB(1), new Date("2026-06-22T12:00:00Z"), new Date("2026-06-22T13:00:00Z"));

                otorgante.cargarSaldoCon(20000);
                receptor.cargarSaldoCon(20000);
                otorgante.comprarUn(paqueteDelOtorgante);
                receptor.comprarUn(paqueteDelReceptor);
                receptor.realizarUn(consumoQueAgotaAlReceptor);
                otorgante.prestarA(receptor, [new CantidadMB(1000)], new Date("2026-06-22T10:00:00Z"));
                receptor.realizarUn(consumoQueAgotaElPrestamo);

                expect(() => receptor.realizarUn(consumoPosterior)).toThrow("El préstamo actual del cliente se encuentra agotado. No puede consumir datos de Internet");
        });

        test("Cuando un cliente intenta realizar un préstamo a otro cliente que ya tenía un préstamo activo, entonces falla", ()=>{
                const primerOtorgante = new Cliente("Juan Perez", "+5491112345678");
                const segundoOtorgante = new Cliente("Carlos Ruiz", "+5491155555555");
                const receptor = new Cliente("Ana Gomez", "+5493481234567");
                const paqueteDelReceptor = paqueteDe1GBUnaSemana();
                const consumoQueAgotaAlReceptor = new Consumo(new CantidadMB(1000), new Date("2026-06-21T10:00:00Z"), new Date("2026-06-21T11:00:00Z"));

                primerOtorgante.cargarSaldoCon(20000);
                segundoOtorgante.cargarSaldoCon(20000);
                receptor.cargarSaldoCon(20000);
                primerOtorgante.comprarUn(paqueteDe10GBUnaSemana());
                segundoOtorgante.comprarUn(paqueteDe10GBUnaSemana());
                receptor.comprarUn(paqueteDelReceptor);
                receptor.realizarUn(consumoQueAgotaAlReceptor);
                primerOtorgante.prestarA(receptor, [new CantidadMB(1000)], new Date("2026-06-22T10:00:00Z"));

                expect(() => segundoOtorgante.prestarA(receptor, [new CantidadMB(1000)], new Date("2026-06-22T11:00:00Z"))).toThrow("El cliente ya tiene un préstamo activo");
                expect(segundoOtorgante.calcularDatosInternetDisponibles()).toBe(10);
        });

        test("Cuando un cliente intenta prestar desde un préstamo que recibió, entonces falla", ()=>{
                const otorganteOriginal = new Cliente("Juan Perez", "+5491112345678");
                const receptor = new Cliente("Ana Gomez", "+5493481234567");
                const otroReceptor = new Cliente("Carlos Ruiz", "+5491155555555");
                const consumoQueAgotaAlReceptor = new Consumo(new CantidadMB(1000), new Date("2026-06-21T10:00:00Z"), new Date("2026-06-21T11:00:00Z"));
                const consumoQueAgotaAlOtroReceptor = new Consumo(new CantidadMB(1000), new Date("2026-06-21T10:00:00Z"), new Date("2026-06-21T11:00:00Z"));

                otorganteOriginal.cargarSaldoCon(20000);
                receptor.cargarSaldoCon(20000);
                otroReceptor.cargarSaldoCon(20000);
                otorganteOriginal.comprarUn(paqueteDe10GBUnaSemana());
                receptor.comprarUn(paqueteDe1GBUnaSemana());
                otroReceptor.comprarUn(paqueteDe1GBUnaSemana());
                receptor.realizarUn(consumoQueAgotaAlReceptor);
                otroReceptor.realizarUn(consumoQueAgotaAlOtroReceptor);
                otorganteOriginal.prestarA(receptor, [new CantidadMB(1000)], new Date("2026-06-22T10:00:00Z"));

                expect(() => receptor.prestarA(otroReceptor, [new CantidadMB(1000)], new Date("2026-06-22T11:00:00Z"))).toThrow("No se puede prestar desde un préstamo");
        });

        test("Cuando un cliente intenta prestar sin indicar recursos, entonces falla", ()=>{
                const otorgante = new Cliente("Juan Perez", "+5491112345678");
                const receptor = new Cliente("Ana Gomez", "+5493481234567");
                const consumoQueAgotaAlReceptor = new Consumo(new CantidadMB(1000), new Date("2026-06-21T10:00:00Z"), new Date("2026-06-21T11:00:00Z"));

                otorgante.cargarSaldoCon(20000);
                receptor.cargarSaldoCon(20000);
                otorgante.comprarUn(paqueteDe10GBUnaSemana());
                receptor.comprarUn(paqueteDe1GBUnaSemana());
                receptor.realizarUn(consumoQueAgotaAlReceptor);

                expect(() => otorgante.prestarA(receptor, [], new Date("2026-06-22T10:00:00Z"))).toThrow("Debe prestar al menos un recurso");
        });


})
