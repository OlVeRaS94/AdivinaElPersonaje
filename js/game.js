let draggableElements = document.querySelector('.draggable-elements');
let droppableElements = document.querySelector('.droppable-elements');
let pokemonSearched = [];
let pokemonNames = [];
let points = 0;

document.getElementById('startGame').addEventListener('click', () => {
    const numPokemons = parseInt(document.getElementById('numPokemons').value);
    const shiny = document.getElementById('shiny').checked;
    startGame(numPokemons, shiny);
});

function startGame(numPokemons, shiny) {
    points = 0;
    pokemonSearched = [];
    pokemonNames = [];
    draggableElements.innerHTML = '';
    droppableElements.innerHTML = '';

    for (let i = 1; i <= numPokemons; i++) {
        let id = getRandomID(1025);
        searchPokemonById(id, shiny);
    }
}

function getRandomID(max) {
    return Math.floor(Math.random() * max) + 1;
}

async function searchPokemonById(id, shiny) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await res.json();

    pokemonSearched.push(data);
    pokemonNames.push(data.name);
    pokemonNames = pokemonNames.sort(() => Math.random() - 0.5);

    updateUI(shiny);
}

function updateUI(shiny) {
    draggableElements.innerHTML = '';
    pokemonSearched.forEach(pokemon => {
        const imageUrl = shiny ? pokemon.sprites.other['home'].front_shiny : pokemon.sprites.other['home'].front_default;
        draggableElements.innerHTML +=
            `<div class="pokemon">
                <img id="${pokemon.name}" draggable="true" class="image" src="${imageUrl}" alt="${pokemon.name}">
            </div>`;
    });

    droppableElements.innerHTML = '';
    pokemonNames.forEach(name => {
        droppableElements.innerHTML +=
            `<div class="names" data-name="${name}">
                <p>${name}</p>
            </div>`;
    });

    setupDragAndDrop();
}

function setupDragAndDrop() {
    let pokemons = document.querySelectorAll('.image');
    let names = document.querySelectorAll('.names');
    let equivocado = document.querySelector('.equivocado');

    pokemons.forEach(pokemon => {
        pokemon.addEventListener('dragstart', event => {
            event.dataTransfer.setData('text', event.target.id);
        });

        pokemon.addEventListener('touchstart', handleTouchStart);
        pokemon.addEventListener('touchmove', handleTouchMove);
        pokemon.addEventListener('touchend', handleTouchEnd);
    });

    names.forEach(name => {
        name.addEventListener('dragover', event => {
            event.preventDefault();
        });
        
        name.addEventListener('drop', event => handleDrop(event, equivocado));
    });
}

// Auto-scroll for drag
document.addEventListener('drag', event => {
    const scrollThreshold = 100;
    const viewportHeight = window.innerHeight;
    const mouseY = event.clientY;

    if (viewportHeight - mouseY < scrollThreshold) {
        window.scrollBy(0, 10);
    }
});

function handleDrop(event, equivocado) {
    event.preventDefault();
    const pokemonName = event.dataTransfer.getData('text');
    const targetName = event.target.closest('.names').dataset.name;

    let pokemonElement = document.getElementById(pokemonName);
    if (targetName === pokemonName) {
        points++;
        event.target.innerHTML = '';
        event.target.appendChild(pokemonElement);
        equivocado.innerText = '';

        if (points === pokemonSearched.length) {
            draggableElements.innerHTML = `<p class="Ganar"><h1>¡GANASTE!</h1></p>`;
        }
    } else {
        equivocado.innerText = '¡AY VA, TE HAS EQUIVOCADO!';
    }
}

// Touch handlers for mobile
let touchData = null;

function handleTouchStart(event) {
    const touch = event.targetTouches[0];
    touchData = {
        id: event.target.id,
        initialX: touch.clientX,
        initialY: touch.clientY
    };
}

function handleTouchMove(event) {
    event.preventDefault();
    const touch = event.targetTouches[0];
    const touchElement = document.getElementById(touchData.id);
    touchElement.style.position = 'absolute';
    touchElement.style.left = `${touch.clientX - touchElement.offsetWidth / 2}px`;
    touchElement.style.top = `${touch.clientY - touchElement.offsetHeight / 2}px`;
}

function handleTouchEnd(event) {
    const touch = event.changedTouches[0];
    const droppedElement = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (droppedElement && droppedElement.classList.contains('names')) {
        const eventMock = new DragEvent('drop', {
            dataTransfer: new DataTransfer()
        });
        eventMock.dataTransfer.setData('text', touchData.id);
        droppedElement.dispatchEvent(eventMock);
    }
    
    const touchElement = document.getElementById(touchData.id);
    touchElement.style.position = 'static';
    touchData = null;
}
