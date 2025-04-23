import { electronicFormatIBAN, isValidIBAN } from "ibantools";
import { Validacion, DatosIban, bancosEspañoles } from "./model";

export const estaBienFormadoElIBAN = (value: string) => {
  const patron =
    /^[A-Z]{2}\d{2}([\s-]?)(\d{4}([\s-]?)){2}\d{2}([\s-]?)\d{10}$/i;
  if (!patron.test(value)) {
    throw new Error("ERROR! El IBAN no está bien formado");
  }

  return true;
};

export const validarIban = (value: string) => {
  const iban = electronicFormatIBAN(value);
  if (!iban) {
    throw new Error(
      "ERROR! No se pudo transformar el IBAN al formato electrónico"
    );
  }
  if (!isValidIBAN(iban)) {
    throw new Error("ERROR! El IBAN no es válido");
  }
  return true;
};

export const validarIBANCompleto = (value: string): Validacion => {
  try {
    estaBienFormadoElIBAN(value);
    validarIban(value);
    return { esValida: true };
  } catch (error: any) {
    return {
      esValida: false,
      mensajeError: error.message,
    };
  }
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

const obtenerValorInput = (Input: string): string => {
  const elementoInput = document.querySelector(`#${Input}`);

  if (
    (elementoInput && elementoInput instanceof HTMLInputElement) ||
    (elementoInput && elementoInput instanceof HTMLTextAreaElement)
  ) {
    return elementoInput.value;
  } else {
    throw new Error(`No se ha encontrado el Input ${Input}`);
  }
};

const encontrarBanco = (value: string, lista: [string, string][]): string => {
  const banco = lista.find(([codigo]) => codigo === value);

  if (!banco) {
    throw new Error(`No se ha encontrado un banco con el código: ${value}`);
  }

  return banco[1];
};

// Funciones para la UI ------------------------------------------------------------------

const crearParrafo = (textos: string[], clase: string) => {
  const infoIban = document.querySelector("#info-iban");
  if (infoIban instanceof HTMLDivElement) {
    textos.forEach((texto) => {
      const parrafo = document.createElement("p");
      parrafo.classList.add(clase);
      parrafo.textContent = texto;
      infoIban.appendChild(parrafo);
    });
  }
};

const pintarError = (texto: string) => {
  crearParrafo([texto], "danger");
};

const pintarValidaciones = () => {
  const validaciones = ["✅ El IBAN es válido", "✅ El IBAN está bien formado"];
  crearParrafo(validaciones, "active");
};

const vaciarContenidoDiv = (id: string) => {
  const div = document.querySelector(`#${id}`);
  if (div instanceof HTMLDivElement) {
    div.innerHTML = "";
  }
};

const pintarDatosIBAN = (datos: DatosIban): void => {
  const campos = [
    { valor: datos.banco, label: "🏦 Banco: " },
    {
      valor: datos.sucursal,
      label: "🏛️ Código sucursal: ",
    },
    {
      valor: datos.control,
      label: "🔐 Dígito de control: ",
    },
    { valor: datos.cuenta, label: "💰 Número de cuenta: " },
  ];

  pintarValidaciones();
  const infoIban = document.querySelector("#info-iban");
  if (infoIban instanceof HTMLDivElement) {
    campos.forEach(({ valor, label }) => {
      const parrafo = document.createElement("p");
      parrafo.classList.add("active");
      const elementoLabel = document.createElement("em");
      elementoLabel.textContent = `${label}:`;
      parrafo.appendChild(elementoLabel);
      const elementoSpan = document.createElement("span");
      elementoSpan.textContent = valor;
      parrafo.appendChild(elementoSpan);
      infoIban.appendChild(parrafo);
    });
  }
};

//---------------------

const obtenerDatosyPintar = () => {
  vaciarContenidoDiv("info-iban");
  const valorInput = obtenerValorInput("numero-iban");
  const ibanValidado = validarIBANCompleto(valorInput);
  if (!ibanValidado.esValida) {
    pintarError(
      `🚨 ${ibanValidado.mensajeError}` ||
        "Ha habido un error al validar el IBAN"
    );
  } else {
    const datosIban = extraerDatosIban(valorInput) as DatosIban;
    const nombreDelBanco = encontrarBanco(datosIban.banco, bancosEspañoles);
    const datosIbanParaPintar = {
      ...datosIban,
      banco: nombreDelBanco,
    };
    pintarDatosIBAN(datosIbanParaPintar);
  }
};


//-------------------------------------

const formulario = document.querySelector("#formulario");
if (formulario && formulario instanceof HTMLFormElement) {
  formulario.addEventListener("submit", (evento: Event) => {
    evento.preventDefault();
    obtenerDatosyPintar();
  });
}
