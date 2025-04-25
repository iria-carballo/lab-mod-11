import { DatosIban, bancosEspañoles } from "./model";
import { encontrarBanco, esValidoIban, extraerDatosIban } from "./gestionar-iban";
import { obtenerValorInput, pintarDatosIBAN, pintarError, vaciarContenidoDiv } from "./ui";


const ibanValido = (valorInput: string) => {
  const datosIban = extraerDatosIban(valorInput) as DatosIban;

  const nombreDelBanco = encontrarBanco(datosIban.banco, bancosEspañoles);

  const datosIbanParaPintar = {
    ...datosIban,
    banco: nombreDelBanco,
  };
  pintarDatosIBAN(datosIbanParaPintar);
}


const obtenerDatosyPintar = () => {
  vaciarContenidoDiv("info-iban");
  const valorInput = obtenerValorInput("numero-iban");

  esValidoIban(valorInput) ? ibanValido(valorInput) : pintarError(
    "Ha habido un error al validar el IBAN"
  );
};


const formulario = document.querySelector("#formulario");
if (formulario && formulario instanceof HTMLFormElement) {
  formulario.addEventListener("submit", (evento: Event) => {
    evento.preventDefault();
    obtenerDatosyPintar();
  });
}
