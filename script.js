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
        statElement.innerHTML = statIds[i] + ": " + pokemonStats[i].base_stat;//sanitizeHTML(statIds[i]) + sanitizeHTML(pokemonStats[i].base_stat);
    }   


}

function getDescription(data) {     // get weight, height, type, abilities, and pokedex id

    // get description elements that aren't an array    

    const name = data.name;
    const nameElement = document.getElementById('name');
    nameElement.innerHTML = name[0].toUpperCase() + name.slice(1);

    const id = data.id;
    const idElement = document.getElementById('id');
    idElement.innerHTML = "ID: " + id;//sanitizeHTML(id);

    const weightElement = document.getElementById('weight');
    weightElement.innerHTML = "Weight: " + convertWeight(data) + "kg";//sanitizeHTML(weight);

    const heightElement = document.getElementById('height');
    heightElement.innerHTML = "Height: " + convertHeight(data) + "m";//sanitizeHTML(height); 
    
    // abilities

    const abilities = data.abilities;
    const abilitiesList = document.getElementById('abilities');
    for (let i = 0; i < abilities.length; i++) {
        let li = document.createElement('li');
        li.innerText = abilities[i].ability.name;
        abilitiesList.appendChild(li);
    }



    // type

    const type = data.types;
    const typeList = document.getElementById('type');             // query for type
    for (let i = 0; i < type.length; i++) {                     // for loop to loop through type array 
        let li = document.createElement('li');                  // create a list element
        li.innerText = type[i].type.name;                       // put the type in the list element
        typeList.appendChild(li);                               // append the list element to the parent, which is the element from query
    }

    

}

function convertHeight(data) {              // convertHeight helper function... height: decimetres -> metres
    const height = data.height;
    return height / 10;

}

function convertWeight(data) {              // convertWeight helper function... weight: hectograms -> kg
    const weight = data.weight;
    return weight / 10;

}

function reset() {
    const catchButton = document.getElementById('catchButton');
    catchButton.disabled = false;
    window.location.reload();
}



async function main() {         // async main function for script

    try{

        const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
        const description = document.getElementById('descriptionHeader');
        const abilities = document.getElementById('abilitiesHeader');
        const stats = document.getElementById('statsHeader');

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error(`Could not catch ${pokemonName}`);
        }

        const data = await response.json();
        //console.log(data);

        description.style.display = 'block';
        abilities.style.display = 'block';
        stats.style.display = 'block';
        getImage(data);
        getStats(data);
        getDescription(data);

        if (pokemonName) {
            const catchButton = document.getElementById('catchButton');
            catchButton.disabled = true;
        }
        

    }
    catch(error) {
        alert(error);
    }
}
