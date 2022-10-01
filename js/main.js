const CARDS = 10; //constante para saber cuantos pokemon quiero adivinar

// peticion de pokemon al API

for (let i = 1; i <= CARDS; i++) {
    let id = getRandomID(802)//numero de pokemon
    searchPokemonById(id)
}

function getRandomID(max) {
    return Math.floor(Math.random() * max) + 1 //funcion que me enseña un pokémon aleatorio
}

let draggableElements = document.querySelector('.draggable-elements')
let droppableElements = document.querySelector('.droppable-elements')

let pokemonSearched = [];//busqueda del pokémon
let pokemonNames = []
async function searchPokemonById(id) {//funcion que me trae de una api los pokémon
    //Las API son mecanismos que permiten a dos componentes de software comunicarse entre sí 
    //mediante un conjunto de definiciones y protocolos.
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)//busqueda en la api los pokemon
    const data = await res.json()//esperando la respuesta y almacenandola en la data

    //arreglos de los pokemon 
    pokemonSearched.push(data)

    //arreglo con los nombres de los pokemon
    pokemonNames.push(data.name)//busqueda de los nombres
    pokemonNames = pokemonNames.sort(() => Math.random() - 0.5)//para tener los nombres desordenados

    // dibujando los pokemon
    //draggableElements.innerHTML = ''//Borra y dibuja los elementos que tengamos en cards
    //pokemonSearched.forEach(pokemon => {
        //draggableElements.innerHTML +=
            //`<div class="pokemon">
            //<img id="${pokemon.name}" draggable="true" class="image" 
            //src="${pokemon.sprites.other['official-artwork'].front_default}" alt="pokemon">
           // </div>`//Pone las imagenes de forma dinamica de los pokemon
        //})

        //para hacer que sean shynis
         draggableElements.innerHTML = ''
        pokemonSearched.forEach(pokemon => {
            console.log(pokemon.sprites)
        draggableElements.innerHTML +=
          `<div class="pokemon">
         <img id="${pokemon.name}" draggable="true" class="image" 
         src="${pokemon.sprites.other['home'].front_shiny}" alt="pokemon">
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
        })//para saber que estoy arrastrando la imagen y que al soltar coincida con el nombre
    })

    let names = document.querySelectorAll('.names')
    let equivocado = document.querySelector('.equivocado')
    let points = 0;
    names = [...names]
    names.forEach(name => {
        name.addEventListener('dragover', event => {
            event.preventDefault()
        })//para saber que he arrastrado la imagen y que al soltar coincida con el nombre
        name.addEventListener('drop', event => {
            const draggableElementData = event.dataTransfer.getData('text');
            let pokemonElement = document.querySelector(`#${draggableElementData}`)// para saber que he soltado la imagen en el lugar correcto
            //console.log(pokemonElement)
            if (event.target.innerText == draggableElementData) {
                //console.log('SI')
                points++
                event.target.innerHTML = ''
                //console.log(pokemonElement)
                event.target.appendChild(pokemonElement)
                equivocado.innerText = ''

                if (points == CARDS) {
                    draggableElements.innerHTML = `<p class="Ganar"><h1>¡GANASTE¡</h1></p>`
                }

            } else {
                //console.log('NO')
                equivocado.innerText = '¡AY VA, TE HAS EQUIVOCADO!'
            }
        })

    })


}