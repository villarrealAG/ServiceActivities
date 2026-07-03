pngVinilo = "../assets/vinilo.png";

const Discos = [
    {titulo: "The Powers That B", artista: "Death Grips", año: 2015, genero: "Experimental Hip Hop", portada: "../assets/The Powers That B.png", contraportada: pngVinilo},
    {titulo: "Bottomless Pit", artista: "Death Grips", año: 2016, genero: "Experimental Hip Hop", portada: "../assets/Bottomless Pit.png", contraportada: pngVinilo},
    {titulo: "Speaking In Tongues", artista: "Talking Heads", año: 1983, genero: "Synth-pop", portada: "../assets/Speaking In Tongues.png", contraportada: pngVinilo},
    {titulo: "Ants From Up There", artista: "Black Country, New Road", año: 2022, genero: "Progressive Rock", portada: "../assets/Ants From Up There.jpg", contraportada: pngVinilo},
    {titulo: "In Rainbows", artista: "Radiohead", año: 2007, genero: "Alternative Rock", portada: "../assets/In Rainbows.png", contraportada: pngVinilo},
    {titulo: "Lark's Tongues In Aspic", artista: "King Crimson", año: 1973, genero: "Progressive Rock", portada: "../assets/Lark's Tongues In Aspic.png", contraportada: pngVinilo},
    {titulo: "Station To Station", artista: "David Bowie", año: 1976, genero: "Glam Rock", portada: "../assets/Station To Station.jpg", contraportada: pngVinilo},
    {titulo: "The Fragile", artista: "Nine Inch Nails", año: 1999, genero: "Industrial Rock", portada: "../assets/The Fragile.png", contraportada: pngVinilo},
    {titulo: "The Downward Spiral", artista: "Nine Inch Nails", año: 1994, genero: "Industrial Rock", portada: "../assets/The Downward Spiral.png", contraportada: pngVinilo},
    {titulo: "Atrocity Exhibition", artista: "Danny Brown", año: 2016, genero: "Experimental Hip Hop", portada: "../assets/Atrocity Exhibition.png", contraportada: pngVinilo},
    {titulo: "Hellfire", artista: "Black Midi", año: 2022, genero: "Experimental Rock", portada: "../assets/Hellfire.png", contraportada: pngVinilo},
    {titulo: "RAM", artista: "Paul McCartney & Linda McCartney", año: 1971, genero: "Rock", portada: "../assets/RAM.png", contraportada: pngVinilo},
    {titulo: "To Be Kind", artista: "Swans", año: 2014, genero: "Experimental Rock", portada: "../assets/To Be Kind.jpg", contraportada: pngVinilo},
    {titulo: "Hot Rats", artista: "Frank Zappa", año: 1969, genero: "Jazz Fusion", portada: "../assets/Hot Rats.jpg", contraportada: pngVinilo},
    {titulo: "Disintegration", artista: "The Cure", año: 1989, genero: "Gothic Rock", portada: "../assets/Disintegration.png", contraportada: pngVinilo},
    {titulo: "Sound Of Silver", artista: "LCD Soundsystem", año: 2007, genero: "Dance-punk", portada: "../assets/Sound Of Silver.jpg", contraportada: pngVinilo},
    {titulo: "Bone Machine", artista: "Tom Waits", año: 1992, genero: "Experimental Rock", portada: "../assets/Bone Machine.png", contraportada: pngVinilo},
    {titulo: "Rain Dogs", artista: "Tom Waits", año: 1985, genero: "Experimental Rock", portada: "../assets/Rain Dogs.png", contraportada: pngVinilo},
    {titulo: "Revés/Yo Soy", artista: "Café Tacvba", año: 1999, genero: "Alternative Rock", portada: "../assets/Revés Yo Soy.jpg", contraportada: pngVinilo},
]

Discos.sort((a, b) => b.año - a.año);

const contenedor = document.getElementById('discos');
const Decadas = contenedor.querySelectorAll(':scope > div');

Decadas.forEach(decada => {
    const anio = parseInt(decada.id);
    const discosEnDecada = Discos.filter(disco => disco.año >= anio && disco.año < anio + 10);
    
    discosEnDecada.forEach(disco => {
        // 1. Creamos el elemento del disco de forma aislada
        const tarjetaContenedor = document.createElement('div');
        tarjetaContenedor.className = 'contenedor-tarjeta';
        
        tarjetaContenedor.innerHTML = `
            <div class="tarjeta-disco">
                <div class="tarjeta-disco-frente">
                    <img class="disco-portada" src="${disco.portada}" alt="${disco.titulo}">
                </div>
                <div class="tarjeta-disco-trasera">
                    <img class="disco-contraportada" src="${disco.contraportada}" alt="Contraportada de ${disco.titulo}" width="600" height="600">
                    <div class="informacion-disco">
                        <h3>${disco.titulo}</h3>
                        <p>Artista: ${disco.artista}</p>
                        <p>Año: ${disco.año}</p>
                    </div>
                </div>
            </div>
        `;

        // 2. Lo agregamos a la pantalla
        decada.appendChild(tarjetaContenedor);

        // 3. Capturamos los elementos internos de ESTA tarjeta específica
        const imgPortada = tarjetaContenedor.querySelector('.disco-portada');
        const capaTrasera = tarjetaContenedor.querySelector('.tarjeta-disco-trasera');
        const textoInfo = tarjetaContenedor.querySelector('.informacion-disco');

        // 4. Cuando la portada de ESTE disco cargue, calculamos su color dominante
        imgPortada.addEventListener('load', () => {
            const colorDominante = obtenerColorDominanteDeElemento(imgPortada);
            const colorContrario = obtenerColorContrarioDeElemento(imgPortada);

            // Pintamos el texto de la tarjeta trasera con el color contrario al dominante
            textoInfo.style.color = colorContrario;

            // Pintamos el fondo de la tarjeta trasera con su color dominante suavizado
            capaTrasera.style.backgroundColor = colorDominante;
        });
        
        // Por si la imagen ya estaba en caché
        if (imgPortada.complete) {
            imgPortada.dispatchEvent(new Event('load'));
        }
    });
});

// Bucle que avanza de 10 en 10 años
    for (let i = 0; i <= anioActual; i += 10) {
        // Condicional: si el año de nacimiento está entre i y i+9
        if (anioNacimiento >= i && anioNacimiento < i + 10) {
            decada = `${i}s`;
            break; // Salir del bucle una vez encontrada la década
        }
    }

function obtenerColorDominanteDeElemento(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // 1. Dibujar en un canvas pequeño para rendimiento
    canvas.width = 100;
    canvas.height = 100;
    
    try {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    } catch (e) {
        // Por si hay problemas de CORS con las URLs de Genius
        console.warn("No se pudo obtener el color debido a restricciones de CORS", e);
        return "rgba(50, 50, 50, 0.8)"; 
    }

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const mapaColores = {};

    let colorDominante = 'rgba(0,0,0,0.7)';
    let maxContador = 0;

    for (let i = 0; i < imgData.length; i += 4) {
        const r = imgData[i];
        const g = imgData[i+1];
        const b = imgData[i+2];
        const a = imgData[i+3];

        if (a < 125) continue; 

        // Agrupamos colores para promediar
        const rAgrupado = Math.round(r / 15) * 15;
        const gAgrupado = Math.round(g / 15) * 15;
        const bAgrupado = Math.round(b / 15) * 15;
        
        // Agregamos una ligera opacidad (0.85) para que no tape las letras blancas de la info
        const rgba = `rgba(${rAgrupado}, ${gAgrupado}, ${bAgrupado}, 0.85)`;

        mapaColores[rgba] = (mapaColores[rgba] || 0) + 1;

        if (mapaColores[rgba] > maxContador) {
            maxContador = mapaColores[rgba];
            colorDominante = rgba;
        }
    }

    return colorDominante;
}

function obtenerColorContrarioDeElemento(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 100;
    canvas.height = 100;
    
    try {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    } catch (e) {
        console.warn("No se pudo obtener el color debido a restricciones de CORS", e);
        return "rgba(200, 50, 50, 0.85)"; 
    }

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const mapaColores = {};

    let maxContador = 0;
    // Guardamos los canales del color dominante real
    let domR = 0, domG = 0, domB = 0;

    // 1. Encontramos el color dominante (como hacías al principio)
    for (let i = 0; i < imgData.length; i += 4) {
        const r = imgData[i];
        const g = imgData[i+1];
        const b = imgData[i+2];
        const a = imgData[i+3];

        if (a < 125) continue; 

        const rAgrupado = Math.round(r / 15) * 15;
        const gAgrupado = Math.round(g / 15) * 15;
        const bAgrupado = Math.round(b / 15) * 15;
        
        const clave = `${rAgrupado},${gAgrupado},${bAgrupado}`;
        mapaColores[clave] = (mapaColores[clave] || 0) + 1;

        if (mapaColores[clave] > maxContador) {
            maxContador = mapaColores[clave];
            domR = rAgrupado;
            domG = gAgrupado;
            domB = bAgrupado;
        }
    }

    // 2. MATEMÁTICA INTERESANTE: Invertimos los canales para hallar el complementario
    // Restar el color de 255 nos da exactamente el color opuesto en la rueda cromática.
    const rContrario = 255 - domR;
    const gContrario = 255 - domG;
    const bContrario = 255 - domB;

    // 3. Devolvemos el color opuesto con la opacidad suavizada para tu interfaz
    return `rgba(${rContrario}, ${gContrario}, ${bContrario}, 0.85)`;
}