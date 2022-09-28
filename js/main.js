const CARDS = 5;

// peticion de pokemon al API

for (let i = 1; i <= CARDS; i++) {
    let id = getRandomID(150)
    searchPokemonById(id)
}

function getRandomID(max) {
    return Math.floor(Math.random() * max) + 1
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

    //arreglo con los nombres de los pokemon
    pokemonNames.push(data.name)
    pokemonNames = pokemonNames.sort(() => Math.random() - 0.5)

    // dibujando los pokemon
    draggableElements.innerHTML = ''
    pokemonSearched.forEach(pokemon => {
        draggableElements.innerHTML +=
            `<div class="pokemon">
            <img id="${pokemon.name}" draggable="true" class="image" 
            src="${pokemon.sprites.other['official-artwork'].front_default}" alt="pokemon">
            </div>`
    })

    //poniendo los nombres a los pokemon
    droppableElements.innerHTML = ''
    pokemonNames.forEach(name => {
        droppableElements.innerHTML +=
            `<div class="names">
                <p>${name}</p>
            </div>`
    })

    let pokemons = document.querySelectorAll('.image');
    pokemons = [...pokemons]
    pokemons.forEach(pokemon => {
        pokemon.addEventListener('dragstart', event => {
            event.dataTransfer.setData('text', event.target.id)
        })
    })

    let names = document.querySelectorAll('.names')
    let equivocado = document.querySelector('.equivocado')
    let points = 0;
    names = [...names]
    names.forEach(name => {
        name.addEventListener('dragover', event => {
            event.preventDefault()
        })
        name.addEventListener('drop', event => {
            const draggableElementData = event.dataTransfer.getData('text');
            let pokemonElement = document.querySelector(`#${draggableElementData}`)
            console.log(pokemonElement)
            if (event.target.innerText == draggableElementData) {
                console.log('SI')
                points++
                event.target.innerHTML = ''
                console.log(pokemonElement)
                event.target.appendChild(pokemonElement)
                equivocado.innerText = ''

                if (points == CARDS) {
                    draggableElements.innerHTML = `<p class="Ganar"><h1>¡GANASTE¡</h1></p>`
                }

            } else {
                console.log('NO')
                equivocado.innerText = '¡AY VA, TE HAS EQUIVOCADO!'
            }
        })

    })
    
    
}