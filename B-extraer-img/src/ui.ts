export const pintarImagenes = (imagenes: string[]) => {
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

export const pintarError = (texto: string) => {
  crearParrafo([texto], "danger");
};



export const obtenerValorInput = (Input: string): string => {
  const elementoInput = document.querySelector(`#${Input}`);

  if (elementoInput && elementoInput instanceof HTMLTextAreaElement) {
    return elementoInput.value;
  } else {
    throw new Error(`No se ha encontrado el Input ${Input}`);
  }
};

export const vaciarContenidoDiv = (id: string) => {
    const div = document.querySelector(`#${id}`);
    if (div instanceof HTMLDivElement) {
      div.innerHTML = "";
    }
  };