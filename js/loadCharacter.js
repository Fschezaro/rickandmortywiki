const urlParams = new URLSearchParams(window.location.search);
const characterID = urlParams.get('id');
const charsContainer = document.querySelector('.card-extended');
getCharacter(characterID)

document.getElementById



function renderCharacter(character){
    return charsContainer.innerHTML += `
        
        <div><img src="${character.image}" alt="Person 1"></div>
        <div style="width: 100%">
            <h2>${character.name}</h2>
            <strong>Espécie:</strong><p>${character.species}</p>
            <strong>Origem:</strong><p>${character.origin.name}</p>
            <strong>Localização:</strong><p>${character.location.name}</p>
        </div>
        `
}
async function getCharacter(id){

    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    const character = await response.json();
    renderCharacter(character)
}

