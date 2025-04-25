import { electronicFormatIBAN, isValidIBAN } from "ibantools";

export const esValidoIban = (iban: string) => {
  const ibanFormateado = electronicFormatIBAN(iban);
  if (!ibanFormateado) {
    throw new Error(
      "ERROR! No se pudo transformar el IBAN al formato electrónico"
    );
  }
  return isValidIBAN(ibanFormateado);
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

export const encontrarBanco = (
  value: string,
  lista: [string, string][]
): string => {
  const banco = lista.find(([codigo]) => codigo === value);

  if (!banco) {
    throw new Error(`No se ha encontrado un banco con el código: ${value}`);
  }

  return banco[1];
};



