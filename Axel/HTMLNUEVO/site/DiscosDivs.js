const Discos = [
    {titulo: "The Powers That B", artista: "Death Grips", año: 2015, genero: "Experimental Hip Hop", portada: "https://t2.genius.com/unsafe/855x0/https%3A%2F%2Fimages.genius.com%2F1c1b145949a797b01493a2bdd8c2fb8d.1000x1000x1.png"},
    {titulo: "Bottomless Pit", artista: "Death Grips", año: 2016, genero: "Experimental Hip Hop", portada: "https://t2.genius.com/unsafe/855x0/https%3A%2F%2Fimages.genius.com%2F96be9c8a863f01fc942c2a057c265d1b.1000x1000x1.png"},
    {titulo: "Speaking In Tongues", artista: "Talking Heads", año: 1983, genero: "Synth-pop", portada: "https://t2.genius.com/unsafe/855x0/https%3A%2F%2Fimages.genius.com%2F8f77c1916e83df03eb0b9194aaffbd9f.1000x1000x1.png"},
    {titulo: "Ants From Up There", artista: "Black Country, New Road", año: 2022, genero: "Progressive Rock", portada: "https://t2.genius.com/unsafe/855x0/https%3A%2F%2Fimages.genius.com%2F2029df5d95e5266f9d1ae831030f0394.600x600x1.jpg"},
    {titulo: "In Rainbows", artista: "Radiohead", año: 2007, genero: "Alternative Rock", portada: "https://t2.genius.com/unsafe/855x0/https%3A%2F%2Fimages.genius.com%2Fe5c7b7460f68095c9f8cdaa1b3938755.1000x1000x1.png"},
    {titulo: "Lark's Tongues In Aspic", artista: "King Crimson", año: 1973, genero: "Progressive Rock", portada: "https://t2.genius.com/unsafe/855x0/https%3A%2F%2Fimages.genius.com%2F4109d31015e83370aa1f9a00dce5b9a7.1000x1000x1.png"},
    {titulo: "Station To Station", artista: "David Bowie", año: 1976, genero: "Glam Rock", portada: "https://t2.genius.com/unsafe/855x0/https%3A%2F%2Fimages.genius.com%2Fe0d5d559049837957d3248bb09985ad5.1000x1000x1.jpg"},
    {titulo: "The Fragile", artista: "Nine Inch Nails", año: 1999, genero: "Industrial Rock", portada: "https://t2.genius.com/unsafe/855x0/https%3A%2F%2Fimages.genius.com%2F86bc0184cd0052b30ecd2b7a34a8fc22.1000x1000x1.png"},
    {titulo: "The Downward Spiral", artista: "Nine Inch Nails", año: 1994, genero: "Industrial Rock", portada: "https://t2.genius.com/unsafe/855x0/https%3A%2F%2Fimages.genius.com%2F60ae7754328232a46b0835826bad659f.1000x1000x1.png"},
    {titulo: "Atrocity Exhibition", artista: "Danny Brown", año: 2016, genero: "Experimental Hip Hop", portada: "https://t2.genius.com/unsafe/855x0/https%3A%2F%2Fimages.genius.com%2F6426db0594c3b364e2774a3d136704b9.1000x1000x1.png"},
    {titulo: "Hellfire", artista: "Black Midi", año: 2022, genero: "Experimental Rock", portada: "https://t2.genius.com/unsafe/847x0/https%3A%2F%2Fimages.genius.com%2Fe272d6b9b5d7f329abef01257d44dd36.1000x1000x1.png"},
    {titulo: "RAM", artista: "Paul McCartney & Linda McCartney", año: 1971, genero: "Rock", portada: "https://t2.genius.com/unsafe/847x0/https%3A%2F%2Fimages.genius.com%2F450bb1dad3e47f6b7a5f900b72a33bb4.1000x1000x1.png"},
    {titulo: "To Be Kind", artista: "Swans", año: 2014, genero: "Experimental Rock", portada: "https://t2.genius.com/unsafe/855x0/https%3A%2F%2Fimages.genius.com%2Fe8d76131317cc18b6e542a6811537b5b.1000x1000x1.jpg"},
    {titulo: "Hot Rats", artista: "Frank Zappa", año: 1969, genero: "Jazz Fusion", portada: "https://t2.genius.com/unsafe/855x0/https%3A%2F%2Fimages.genius.com%2F269f7002cf56441d0f8b86c0afe5527c.1000x1000x1.jpg"},
]

Discos.sort((a, b) => b.año - a.año);

const contenedor = document.getElementById('discos');
const Decadas = contenedor.querySelectorAll(':scope > div');

Decadas.forEach(decada => {
    const anio = parseInt(decada.id);
    const discosEnDecada = Discos.filter(disco => disco.año >= anio && disco.año < anio + 10);
    discosEnDecada.forEach(disco => {
        decada.innerHTML += `
            <div class="contenedor-tarjeta">
                <div class="tarjeta-disco">
                    
                <div class="tarjeta-disco-frente">
                    <img src="${disco.portada}" alt="${disco.titulo}">
                </div>
                
                <div class="tarjeta-disco-trasera">
                    <h3>${disco.titulo}</h3>
                    <p>Artista: ${disco.artista}</p>
                    <p>Año: ${disco.año}</p>
                </div>
                
            </div>
        </div>
    `;
})});

// Bucle que avanza de 10 en 10 años
    for (let i = 0; i <= anioActual; i += 10) {
        // Condicional: si el año de nacimiento está entre i y i+9
        if (anioNacimiento >= i && anioNacimiento < i + 10) {
            decada = `${i}s`;
            break; // Salir del bucle una vez encontrada la década
        }
    }