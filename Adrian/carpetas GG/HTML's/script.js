const personajes = [
    {
        nombre: "Ryu Hayabusa",
        imagen1: "https://static.wikia.nocookie.net/ninjagaiden/images/3/31/Ryu_NG4.png/revision/latest?cb=20141002215529",
        imagen2: "https://static.wikia.nocookie.net/ninjagaiden/images/f/f0/RyuHayabusa.jpg/revision/latest?cb=20090926232658",
        descripcion: "Ryu Hayabusa (El Dragón del Halcón Peregrino) es el protagonista de la serie Ninja Gaiden desarrollada por Team Ninja. Miembro del Clan Ninja Hayabusa famoso por su destreza en batalla, Ryu también es conocido por muchos títulos, incluyendo el Súper Ninja, Ninja Dragón, y el Ninja Definitivo."
    },
    {
        nombre: "Ayane",
        imagen1: "https://static.wikia.nocookie.net/ninjagaiden/images/9/9c/Ayane_NG4.png/revision/latest?cb=20251024193255",
        imagen2: "https://static.wikia.nocookie.net/ninjagaiden/images/7/7b/Ayane-NinjaGaiden3-RazorsEdge.jpeg/revision/latest?cb=20130603115549",
        descripcion: "Ayane es un personaje de la serie de juegos Dead Or Alive. Aunque solo hace pequeñas apariciones en Ninja Gaiden (Xbox), es un personaje jugable en Ninja Gaiden Sigma 2 y Ninja Gaiden 3: Razor's Edge."
    },
    {
        nombre: "Rachel",
        imagen1: "https://static.wikia.nocookie.net/ninjagaiden/images/a/af/NG2_Render_Char_Rachel_02b.png/revision/latest?cb=20140207180817",
        imagen2: "https://static.wikia.nocookie.net/ninjagaiden/images/4/4b/Rachel-ninja-gaiden-sigma-2-artwork.jpg/revision/latest?cb=20140207174207",
        descripcion: "Rachel y su hermana gemela Alma están afligidas con una maldición de sangre que convierte a los humanos en demonios (fiends). Para los eventos de Ninja Gaiden, la maldición ha consumido a Alma. Creyendo que no hay cura para su condición, Rachel busca a Alma a través de gran parte de Ninja Gaiden para matarla y redimir su alma."
    },
    {
        nombre: "Momiji",
        imagen1: "https://static.wikia.nocookie.net/ninjagaiden/images/5/53/Momiji.png/revision/latest?cb=20120923233559",
        imagen2: "https://static.wikia.nocookie.net/ninjagaiden/images/d/d2/NG2_Render_Char_Momiji_01d3b.jpg/revision/latest?cb=20140207174810",
        descripcion: "Momiji aparece por primera vez en Ninja Gaiden Dragon Sword. Más tarde apareció como un personaje jugable en Ninja Gaiden Sigma 2, y como NPC en Ninja Gaiden 3 y Yaiba: Ninja Gaiden Z. Está disponible como un personaje DLC gratuito en Ninja Gaiden 3: Razor's Edge."
    },
    {
        nombre: "Muramasa",
        imagen1: "https://static.wikia.nocookie.net/ninjagaiden/images/1/16/Ninja-gaiden-2-muramasa.png/revision/latest?cb=20120101151835",
        imagen2: "https://static.wikia.nocookie.net/ninjagaiden/images/4/42/Muramasa_NG3.png/revision/latest?cb=20120401195123",
        descripcion: "Muramasa es un legendario herrero de armas y dueño de una tienda que ayuda a Ryu en sus viajes. Muramasa sirve principalmente como mercader en la nueva serie de Ninja Gaiden, sin embargo, como experto en reliquias, también ofrecerá consejos gratuitos sobre objetos especiales y armas."
    }
]

let indiceActual = 0;

function mostrarPersonaje() {
    const personaje = personajes[indiceActual];
    document.querySelector("#nombre-personaje").textContent = personaje.nombre;
    document.querySelector("#descripcion-personaje").textContent = personaje.descripcion;
    document.querySelector("#imagen-personaje").src = personaje.imagen1;
    document.querySelector("#imagen-personaje").dataset.imagen1 = personaje.imagen1;
    document.querySelector("#imagen-personaje").dataset.imagen2 = personaje.imagen2;
}

document.addEventListener("DOMContentLoaded", function() {
    mostrarPersonaje();

    document.getElementById("flechaIzquierda").addEventListener("click", () => {
        indiceActual = (indiceActual - 1 + personajes.length) % personajes.length;
        mostrarPersonaje();
    });

    document.getElementById("flechaDerecha").addEventListener("click", () => {
        indiceActual = (indiceActual + 1) % personajes.length;
        mostrarPersonaje();
    });

    // Efecto hover para cambiar imagen
    const img = document.querySelector("#imagen-personaje");
    img.addEventListener("mouseenter", function() {
        img.src = img.dataset.imagen2;
    });

    img.addEventListener("mouseleave", function() {
        img.src = img.dataset.imagen1;
    });
});