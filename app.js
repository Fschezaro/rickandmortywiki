const charsContainer = document.querySelector('.card-grid');
const loadMoreButton = document.querySelector('#load-more')

const API = "https://rickandmortyapi.com/api"
const defaultFilters = {
    name: '',
    page: 1
}

async function handleLoadMore(){
    loadMoreButton.textContent = 'Carregando...'
    defaultFilters.page += 1
    const characters = await getCharacters(defaultFilters)
    render({characters})
    loadMoreButton.textContent = 'Mostrar mais'
}

function addListeners(){
    loadMoreButton.addEventListener('click', handleLoadMore)
}

async function getCharacters({name, species, gender, status, page=1}){
    const response = await fetch(`${API}/character?name=${name}&page=${page}`)
    // const response = await fetch(`${API}/character?name=${name}&species=${species}&${status}&page=${page}`)


    const characters = await response.json()
    return characters.results
}

async function render({characters}){
    characters.forEach((character)=>{

        return charsContainer.innerHTML += `
        <a href="character.html?id=${character.id}">
            <div class="card">
                <img src="${character.image}" alt="Person 1">
                <h3>${character.name}</h3>
                <p>${character.species}</p>
            </div>
        </a>
        `
    })
}

async function main() {
    const characters = await getCharacters(defaultFilters)
    render ({characters})
}

main()
addListeners()

