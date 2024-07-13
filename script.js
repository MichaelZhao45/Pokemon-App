/*  script.js for pokemon app
    @author Michael Zhao
    @date July 13, 2024
*/

function getImage(data) {           // get pokemon sprite image

    const pokemonSprite = data.sprites.front_default;
    const imageElement = document.getElementById('pokemonImage');

    imageElement.src = pokemonSprite;
    imageElement.style.display = "block";

}

function getStats(data) {           // base stats

    const pokemonStats = data.stats;
    const statIds = ["Hp", "Attack", "Defense", "SpecialAttack", "SpecialDefence", "Speed"];
    let totalStats = 0;

    for (let i = 0; i < pokemonStats.length; i++) {             // pokemonStats[i].base_stat === object, base_stat is the actual instance var
        let statElement = document.getElementById(statIds[i]);
        statElement.innerText = statIds[i] + ": " + pokemonStats[i].base_stat;
        totalStats += pokemonStats[i].base_stat;
    }   

    const totalElement = document.getElementById('Total');
    totalElement.innerText = "Total: " + totalStats;

}

function getDescription(data) {     // get weight, height, type, abilities, and pokedex id

    // get description elements that aren't an array    

    const name = data.name;
    const nameElement = document.getElementById('name');
    nameElement.innerText = name[0].toUpperCase() + name.slice(1);

    const id = data.id;
    const idElement = document.getElementById('id');
    idElement.innerText = "ID: " + id;

    const weightElement = document.getElementById('weight');
    weightElement.innerText = "Weight: " + convertWeight(data) + "kg";

    const heightElement = document.getElementById('height');
    heightElement.innerText = "Height: " + convertHeight(data) + "m";
    
    // abilities

    const abilities = data.abilities;
    const abilitiesList = document.getElementById('abilities');
    for (let i = 0; i < abilities.length; i++) {
        let li = document.createElement('li');
        li.innerText = abilities[i].ability.name[0].toUpperCase() + abilities[i].ability.name.slice(1);
        abilitiesList.appendChild(li);
    }

    // type

    const type = data.types;
    const typeList = document.getElementById('type');                                               // query for type
    for (let i = 0; i < type.length; i++) {                                                         // for loop to loop through type array 
        let li = document.createElement('li');                                                     // create a list element
        li.innerText = type[i].type.name[0].toUpperCase() + type[i].type.name.slice(1);          // put the type in the list element
        typeList.appendChild(li);                                                               // append the list element to the parent, which is the element from query
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
