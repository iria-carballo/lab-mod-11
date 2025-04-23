import { electronicFormatIBAN } from "ibantools";

console.log("Hello Typescript!");

export const estaBienFormadoElIBAN = (value: string) => {
  const patron =
    /^[A-Z]{2}\d{2}([\s-]?)(\d{4}([\s-]?)){2}\d{2}([\s-]?)\d{10}$/i;
  if (!patron.test(value)) {
    throw new Error("ERROR! El IBAN no está bien formado");
  }

  return true;
};

export const extraerDatosIban = (value: string) => {
  const patron =
    /^(?<pais>[A-Z]{2}\d{2})([\s-]?)(?<banco>\d{4})([\s-]?)(?<sucursal>\d{4})([\s-]?)(?<control>\d{2})([\s-]?)(?<cuenta>\d{10})$/i;
  const coincidencia = patron.exec(value);
  if (!coincidencia?.groups) {
    throw new Error("ERROR! No se han podido extraer los datos del IBAN");
  }

  return coincidencia.groups;
};

export const validarIban = (value: string) => {
  if (estaBienFormadoElIBAN(value)) {
    const ibantools = require("ibantools");
    const iban = electronicFormatIBAN(value);
    ibantools.isValidIBAN(iban);
  }
};
