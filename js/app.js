const charsContainer = document.querySelector('.card-grid');
const loadMoreButton = document.querySelector('#load-more');
const searchInput = document.querySelector('#searchInput');
const showCharactersBtn = document.querySelector('#show-characters');
const showEpisodesBtn = document.querySelector('#show-episodes');
const showLocationsBtn = document.querySelector('#show-locations');

const API = "https://rickandmortyapi.com/api";
let currentType = 'characters';
const defaultFilters = {
    name: '',
    page: 1
};

function setActiveType(type) {
    currentType = type;
    
    showCharactersBtn.classList.remove('active');
    showEpisodesBtn.classList.remove('active');
    showLocationsBtn.classList.remove('active');
    
    if (type === 'characters') {
        showCharactersBtn.classList.add('active');
    } else if (type === 'episodes') {
        showEpisodesBtn.classList.add('active');
    } else if (type === 'locations') {
        showLocationsBtn.classList.add('active');
    }
    
    // Reseta a página e busca os dados
    defaultFilters.page = 1;
    fetchAndRenderData();
}

async function handleLoadMore() {
    loadMoreButton.textContent = 'Carregando...';
    defaultFilters.page += 1;
    await fetchAndRenderData();
    loadMoreButton.textContent = 'Mostrar mais';
}

function addListeners() {
    loadMoreButton.addEventListener('click', handleLoadMore);
    
    searchInput.addEventListener('keyup', async (event) => {
        defaultFilters.name = event.target.value;
        defaultFilters.page = 1;
        await fetchAndRenderData();
    });
    
    // Listeners para os botões de navegação
    showCharactersBtn.addEventListener('click', () => setActiveType('characters'));
    showEpisodesBtn.addEventListener('click', () => setActiveType('episodes'));
    showLocationsBtn.addEventListener('click', () => setActiveType('locations'));
} 

async function getData({name, page = 1}) {
    let response;
    
    if (currentType === 'characters') {
        response = await fetch(`${API}/character?name=${name}&page=${page}`);
    } else if (currentType === 'episodes') {
        response = await fetch(`${API}/episode?name=${name}&page=${page}`);
    } else if (currentType === 'locations') {
        response = await fetch(`${API}/location?name=${name}&page=${page}`);
    }
    
    const data = await response.json();
    return data.results;
}

async function fetchAndRenderData() {
    charsContainer.innerHTML = '<div class="loading">Carregando...</div>';
    
    try {
        const data = await getData(defaultFilters);
        
        if (data.length === 0) {
            charsContainer.innerHTML = '<div class="no-results">Nenhum resultado encontrado</div>';
            return;
        }
        
        render({data});
    } catch (error) {
        charsContainer.innerHTML = '<div class="error">Erro ao carregar os dados</div>';
        console.error(error);
    }
}

function render({ data }) {
    charsContainer.innerHTML = "";

    data.forEach((item) => {
        if (currentType === 'characters') {
            // Card de personagem (clicável)
            charsContainer.innerHTML += `
            <a href="character.html?id=${item.id}" class="card-link">
                <div class="card">
                    <img src="${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${item.species} - ${item.status}</p>
                </div>
            </a>
            `;
        } else if (currentType === 'episodes') {
            // Card de episódio (não clicável)
            const episodeNumber = item.episode.replace('S', 'Temporada ').replace('E', ' Episódio ');
            
            charsContainer.innerHTML += `
                <div class="card">
                    <div class="episode-image-placeholder">
                        <span>${item.episode}</span>
                    </div>
                    <h3>${item.name}</h3>
                    <p>${episodeNumber}</p>
                    <p>Exibido em: ${item.air_date}</p>
                </div>
            `;
        } else if (currentType === 'locations') {
            // Card de localização (não clicável)
            charsContainer.innerHTML += `
                <div class="card">
                    <div class="location-image-placeholder">
                        <span>${item.type}</span>
                    </div>
                    <h3>${item.name}</h3>
                    <p>Tipo: ${item.type}</p>
                    <p>Dimensão: ${item.dimension || 'Desconhecida'}</p>
                </div>
            `;
        }
    });

    // Adiciona efeitos hover aos cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        card.style.transition = 'all 0.5s ease';
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.03)';
            card.style.boxShadow = `
                0 10px 20px rgba(0, 0, 0, 0.91),
                0 0 15px 2px rgba(192, 65, 212, 0.4)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        });
    });
}

async function main() {
    setActiveType('characters');
    addListeners();
}

main();