const urlParams = new URLSearchParams(window.location.search);
const characterID = urlParams.get('id');
const charsContainer = document.querySelector('.card-extended');
getCharacter(characterID)



function renderCharacter(character){
    return charsContainer.innerHTML += `
        <div><img src="${character.image}" alt="Person 1"></div>
        <div>
            <h2>${character.name}</h2>
            <p>${character.species}</p>
        </div>
        `
}
async function getCharacter(id){

    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    const character = await response.json();
    renderCharacter(character)
}

