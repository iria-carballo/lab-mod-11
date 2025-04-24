export const extraerImagenes = (value: string) => {
  //La expresión regular contempla que entre <img y src puede haber otros atributos como alt.
  //Lo mismo despues de la url.

  const patron = /<img\s(.+)?src="(?<url>http(s?):\/\/.+)"(.+)?\s?\/>/gm;
  const urls: string[] = [];

  let coincidencia;
  while ((coincidencia = patron.exec(value)) !== null) {
    const { url } = coincidencia.groups as any;
    urls.push(url);
  }

  if (urls.length === 0) {
    throw new Error("No se han encontrado imágenes");
  }

  return urls;
};

// Funciones para la UI ------------------------------------------------------------------

const pintarImagenes = (imagenes: string[]) => {
  const contenedor = document.querySelector("#contenedor-img");
  if (contenedor) {
    imagenes.forEach((imagen) => {
      const nuevaImagen = document.createElement("img");
      nuevaImagen.classList.add("nueva-imagen");
      nuevaImagen.src = imagen;
      contenedor.appendChild(nuevaImagen);
    });
  }
};

const crearParrafo = (textos: string[], clase: string) => {
  const contenedor = document.querySelector("#contenedor-img");
  if (contenedor instanceof HTMLDivElement) {
    textos.forEach((texto) => {
      const parrafo = document.createElement("p");
      parrafo.classList.add(clase);
      parrafo.textContent = texto;
      contenedor.appendChild(parrafo);
    });
  }
};

const pintarError = (texto: string) => {
  crearParrafo([texto], "danger");
};

const vaciarContenidoDiv = (id: string) => {
  const div = document.querySelector(`#${id}`);
  if (div instanceof HTMLDivElement) {
    div.innerHTML = "";
  }
};

const obtenerValorInput = (Input: string): string => {
  const elementoInput = document.querySelector(`#${Input}`);

  if (elementoInput && elementoInput instanceof HTMLTextAreaElement) {
    return elementoInput.value;
  } else {
    throw new Error(`No se ha encontrado el Input ${Input}`);
  }
};

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

//Handle boton -------------------------------------------

const formulario = document.querySelector("#formulario");
if (formulario && formulario instanceof HTMLFormElement) {
  formulario.addEventListener("submit", (evento: Event) => {
    evento.preventDefault();
    obtenerDatosyPintar();
  });
}
