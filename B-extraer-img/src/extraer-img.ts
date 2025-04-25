export const extraerImagenes = (value: string) => {
    //La expresión regular contempla que entre <img y src puede haber otros atributos como alt.
    //Lo mismo despues de la url.
  
    const patron = /<img\s(.+)?src="(?<url>[^"]+)(.+)?\s?\/>/gm;
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