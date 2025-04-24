import { extraerImagenes } from "./main";

const htmlContent = `<html lang="en">
  <head>
    <script type="module">
      import { inject } from "/@vite-plugin-checker-runtime";
      inject({
        overlayConfig: {},
        base: "/",
      });
    </script>

    <script type="module" src="/@vite/client"></script>

    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="reset-estilos.css" />
    <link rel="stylesheet" href="estilos.css" />
    <title>Laboratorio Asinconía</title>
  </head>
  <body>
    <div class="root">
      <h1>Personajes de Moradelo y Filemón</h1>
      <form class="find-container">
        <input id="search" />
        <button type="submit" id="button-search">Filtrar</button>
      </form>
      <div class="character-list" id="character-list">
        <div class="card">
          <img alt="foto de mortadelo" src="http://localhost:3000/./mortadelo.webp" />
          <div class="container-description">
            <h2><span>Nombre: </span>Mortadelo</h2>
            <p><span>Especialidad: </span>Disfraces</p>
            <p>
              <span>Habilidades: </span>Camuflaje, Imitaciones, Huida rápida
            </p>
          </div>
        </div>
        <div class="card">
          <img src="http://localhost:3000/./filemon.webp" />
          <div class="container-description">
            <h2><span>Nombre: </span>Filemón</h2>
            <p><span>Especialidad: </span>Ingeniería improvisada</p>
            <p>
              <span>Habilidades: </span>Inventor, Construcción rápida, Cálculos
              mentales
            </p>
          </div>
        </div>
        </div>
      </div>
      <script type="module" src="main.ts"></script>
    </div>
  </body>
</html>`;
const htmlContentSINImagenes = `
<html lang="en">
  <head>
    <script type="module">
      import { inject } from "/@vite-plugin-checker-runtime";
      inject({
        overlayConfig: {},
        base: "/",
      });
    </script>

    <script type="module" src="/@vite/client"></script>

    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="reset-estilos.css" />
    <link rel="stylesheet" href="estilos.css" />
    <title>Laboratorio Asinconía</title>
  </head>
  <body>
    <div class="root">
      <h1>Personajes de Moradelo y Filemón</h1>
      <form class="find-container">
        <input id="search" />
        <button type="submit" id="button-search">Filtrar</button>
      </form>
      <div class="character-list" id="character-list">
        <!-- tarjetas de personajes aquí -->
      </div>
      <script type="module" src="main.ts"></script>
    </div>
  </body>
</html> 
`;

describe("extraerImagenes", () => {
  it("Debería devolver un array las siguientes url:http://localhost:3000/./mortadelo.webp,http://localhost:3000/./filemon.webp", () => {
    //Assert
    const texto = htmlContent;
    //Act
    const resultado = extraerImagenes(texto);
    const resultadoEsperado = [
      "http://localhost:3000/./mortadelo.webp",
      "http://localhost:3000/./filemon.webp",
    ];
    //Assert
    expect(resultado).toEqual(resultadoEsperado);
  });
  it("Debería devolver un error", () => {
    //Assert
    const texto = htmlContentSINImagenes;
    //Act
    const resultado = () => extraerImagenes(texto);

    //Assert
    expect(resultado).toThrow("No se han encontrado imágenes");
  });
});
