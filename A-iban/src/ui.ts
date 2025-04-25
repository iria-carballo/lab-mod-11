import { datoParaPintar, DatosIban } from "./model";

export const obtenerValorInput = (Input: string): string => {
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

export const pintarError = (texto: string) => {
  crearParrafo([texto], "danger");
};

const pintarValidaciones = () => {
  const validaciones = ["✅ El IBAN es válido", "✅ El IBAN está bien formado"];
  crearParrafo(validaciones, "active");
};


const crearElementoDato = (campos: datoParaPintar[]) => {
  const infoIban = document.querySelector("#info-iban");
  if (infoIban instanceof HTMLDivElement) {
    campos.forEach((campo) => {
      const parrafo = document.createElement("p");
      parrafo.classList.add("active");
      const elementoLabel = document.createElement("em");
      elementoLabel.textContent = `${campo.label}: `;
      parrafo.appendChild(elementoLabel);
      const elementoSpan = document.createElement("span");
      elementoSpan.textContent = campo.valor;
      parrafo.appendChild(elementoSpan);
      infoIban.appendChild(parrafo);
    });
  }
};

export const pintarDatosIBAN = (datos: DatosIban): void => {
  const campos = [
    { valor: datos.banco, label: "🏦 Banco" },
    {
      valor: datos.sucursal,
      label: "🏛️ Código sucursal",
    },
    {
      valor: datos.control,
      label: "🔐 Dígito de control",
    },
    { valor: datos.cuenta, label: "💰 Número de cuenta" },
  ];
  pintarValidaciones();
  crearElementoDato(campos);
};


export const vaciarContenidoDiv = (id: string) => {
    const div = document.querySelector(`#${id}`);
    if (div instanceof HTMLDivElement) {
      div.innerHTML = "";
    }
  };