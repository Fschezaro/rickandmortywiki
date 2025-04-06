const charsContainer = document.querySelector('.card-grid');
const loadMoreButton = document.querySelector('#load-more')
const searchNameInput = document.querySelector('#sarchNameInput')



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
    searchNameInput.addEventListener('keyup', async (event) => {
        defaultFilters.name = event.target.value
        charsContainer.innerHTML = ''
        const characters = await getCharacters(defaultFilters)
        render({characters})
    })
} 

async function getCharacters({name, species, gender, status, page=1}){
    const response = await fetch(`${API}/character?name=${name}&page=${page}`)
    // const response = await fetch(`${API}/character?name=${name}&species=${species}&${status}&page=${page}`)


    const characters = await response.json()
    return characters.results
}

async function render({ characters }) {
    charsContainer.innerHTML = ""; // Limpa antes de renderizar

    characters.forEach((character) => {
        // Adiciona o card
        charsContainer.innerHTML += `
        <a href="character.html?id=${character.id}">
            <div class="card">
                <img src="${character.image}" alt="Person 1">
                <h3>${character.name}</h3>
                <p>${character.species}</p>
            </div>
        </a>
        `;
    });

    // Depois que todos os cards foram adicionados, seleciona eles
    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => {
        // Adiciona transição suave
        card.style.transition = 'all 0.5s ease';

        // Evento ao passar o mouse
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.03)';
            card.style.boxShadow = `
                0 10px 20px rgba(0, 0, 0, 0.2),   /* sombra original */
                0 0 15px 2px rgba(0, 255, 0, 0.4) /* sombra verde suave */
            `;
        });

        // Evento ao tirar o mouse
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        });
    });
}



async function main() {
    const characters = await getCharacters(defaultFilters)
    render ({characters})
}

main()
addListeners()

