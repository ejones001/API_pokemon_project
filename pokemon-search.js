// pokemon-search.js

const baseURL = 'https://pokeapi.co/api/v2/pokemon/';

const pokemonForm = document.getElementById('pokemon-search-form');
const pokemonNameInput = document.getElementById('pokemon-name');
const pokemonDetailsContainer = document.getElementById('pokemon-details');

pokemonForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const pokemonName = pokemonNameInput.value.toLowerCase().trim();

    if (pokemonName === '') {
        alert('Please enter a Pokémon name or ID.');
        return;
    }

    // Fetch Pokémon data from PokeAPI
    fetch(`${baseURL}${pokemonName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon not found!');
            }
            return response.json();
        })
        .then(data => {
            // Display Pokémon details
            displayPokemonDetails(data);
        })
        .catch(error => {
            console.error('Error fetching Pokémon:', error);
            alert('Pokémon not found. Please try again.');
        });
});

function displayPokemonDetails(pokemon) {
    pokemonDetailsContainer.innerHTML = `
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p>Height: ${pokemon.height} decimetres</p>
        <p>Weight: ${pokemon.weight} hectograms</p>
    `;
}
