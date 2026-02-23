const CantidadMB = require("../src/tipoCantidadMB");
const CantidadGB = require("../src/tipoCantidadGB");

let paqueteMb = new CantidadMB(100);
console.log(paqueteMb.aGB().cantidad())