const CARDS = 3;


// peticion de pokemon al API

for (let i=1; i<= CARDS; i++) {
    let id = getRandomID(150)
    searchPokemonById(id)
}


function getRandomID(max) {
    return Math.floor(Math.random()*max) + 1
}

let draggableElements = document.querySelector('.draggable-elements')
let droppableElements = document.querySelector('.droppable-elements')

let pokemonSearched = [];
let pokemonNames = []
async function searchPokemonById(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const data = await res.json()
    //arreglos de los pokemon
    pokemonSearched.push(data)
    pokemonNames.push(data.name)


    pokemonNames = pokemonNames.sort(() => Math.random() - 0.5)

    // dibujando los pokemon
    draggableElements.innerHTML = ''
    pokemonSearched.forEach(pokemon => {
        console.log(pokemon)
        draggableElements.innerHTML +=
            `<div class="pokemon">
            <img draggable="true" class="image' src="${pokemon.sprites.other[`official-artwork`].front_default}" alt="pokemon">
            /div>`
    })

    //poniendo los nombres a los pokemon
    droppableElements.innerHTML = ''
    pokemonNames.forEach(name => {
        droppableElements.innerHTML += `<div class="names">
        <p>${name}</p>
    </div>`
    })
}


/*

*/