const CARDS = 3;


// peticion de pokemon al API

for (let i = 1; i <= CARDS; i++) {
    let id = getRandomID(150)
    searchPokemonById(id)
}


function getRandomID(max) {
    return Math.floor(Math.random() * max) + 1
}

let draggableElements = document.querySelector('.draggable-elements')
let pokemonSearched = {};
async function searchPokemonById(id) {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/${id}/')
    const data = await res.json()
    pokemonSearched.push(data)

    draggableElements.innerHTML =''
    pokemonSearched.forEach(pokemon =>{
        console.log(pokemon)
        draggableElements.innerHTML +='<div class="pokemon">
        <img class="image" src="${pokemon.sprites.back.other['official-artwork']}" alt="pokemon">
    </div>'
    } )
}


/*

*/