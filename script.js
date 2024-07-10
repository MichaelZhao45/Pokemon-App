// sanitize HTML to prevent XSS attacks
/*
var sanitizeHTML = function (str) {
	var temp = document.createElement('div');
	temp.textContent = str;
	return temp.innerHTML;
};
*/

function getImage(data) {           // get pokemon sprite image

    const pokemonSprite = data.sprites.front_default;
    const imageElement = document.getElementById('pokemonImage');

    imageElement.src = pokemonSprite;
    imageElement.style.display = "block";


}

function getStats(data) {           // base stats

    const pokemonStats = data.stats;
    const statIds = ["hp", "attack", "defense", "specialAttack", "specialDefence", "speed"];

    for (let i = 0; i < pokemonStats.length; i++) {             // pokemonStats[i].base_stat === object, base_stat is the actual instance var
        let statElement = document.getElementById(statIds[i]);
        statElement.innerHTML = statIds[i] + pokemonStats[i].base_stat;//sanitizeHTML(statIds[i]) + sanitizeHTML(pokemonStats[i].base_stat);
    }   


}

function getDescription(data) {     // get weight, height, type, abilities, and pokedex id

    // get description elements that aren't an array
    const id = data.id;
    const idElement = document.getElementById('id');
    idElement.innerHTML = "ID: " + id;//sanitizeHTML(id);

    const weight = data.weight;
    const weightElement = document.getElementById('weight');
    weightElement.innerHTML = "Weight: " + weight;//sanitizeHTML(weight);

    const height = data.height;
    const heightElement = document.getElementById('height');
    heightElement.innerHTML = "Height: " + height;//sanitizeHTML(height); 
    




}

function convertHeight() {              // height: decimetres -> metres

}

function convertWeight() {              // weight: hectograms -> kg

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
        getStats(data);
        getDescription(data);

    }
    catch(error) {
        alert(error);
    }
}
