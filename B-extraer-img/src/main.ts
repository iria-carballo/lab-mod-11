import { extraerImagenes } from "./extraer-img";
import {
  obtenerValorInput,
  pintarError,
  pintarImagenes,
  vaciarContenidoDiv,
} from "./ui";

const obtenerDatosyPintar = () => {
  vaciarContenidoDiv("contenedor-img");
  try {
    const valorInput = obtenerValorInput("codigo-html");
    const obtenerImagenes = extraerImagenes(valorInput);
    pintarImagenes(obtenerImagenes);
  } catch (error: any) {
    pintarError("No se han encontrado imágenes en el texto");
  }
};


const formulario = document.querySelector("#formulario");
if (formulario && formulario instanceof HTMLFormElement) {
  formulario.addEventListener("submit", (evento: Event) => {
    evento.preventDefault();
    obtenerDatosyPintar();
  });
}
export { extraerImagenes };
