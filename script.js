function getImage(data) {           // get pokemon sprite image

    const pokemonSprite = data.sprites.front_default;
    const imageElement = document.getElementById('pokemonImage');

    imageElement.src = pokemonSprite;
    imageElement.style.display = "block";


}

function getStats() {           // base stats

}

function getDescription() {     // get weight, height, type, abilities, and pokedex id

}

async function main() {         // async main function for script

    try{

        const pokemonName = document.getElementById('pokemonName').value.toLowerCase();

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error(`Could not catch ${pokemonName}`);
        }

        const data = await response.json();
        console.log(data);

        getImage(data);

    }
    catch(error) {
        alert(error);
    }
}
