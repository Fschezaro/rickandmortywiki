// Função principal para calcular o resultado do quiz
async function calcularResultado() {
    // Obtém todas as perguntas (títulos <h2> dentro do formulário)
    const perguntas = document.querySelectorAll('form h2');
    
    // Obtém todas as respostas marcadas (input radio checados)
    const respostasMarcadas = document.querySelectorAll('input[type="radio"]:checked');

    // Verifica se todas as perguntas foram respondidas
    if (respostasMarcadas.length < perguntas.length) {
        // Se não foram todas respondidas, exibe um alerta e sai da função
        alert("Por favor, responda todas as perguntas antes de ver o resultado.");
        return;  // Retorna e não continua o cálculo
    }

    // Cria um objeto para contar os pontos de cada personagem
    const pontos = { Rick: 0, Morty: 0, "Mr. Poopybutthole": 0, "Evil Morty": 0, Birdperson: 0 };

    // Para cada resposta marcada, incrementa o ponto para o personagem correspondente
    respostasMarcadas.forEach(resposta => pontos[resposta.value]++);

    let personagemVencedor = null;  // Variável para armazenar o personagem vencedor
    let maiorPonto = 0;  // Variável para armazenar o maior número de pontos

    // Verifica qual personagem tem mais pontos
    for (const personagem in pontos) {
        if (pontos[personagem] > maiorPonto) {
            maiorPonto = pontos[personagem];  // Atualiza o maior número de pontos
            personagemVencedor = personagem;  // Atualiza o personagem vencedor
        }
    }

    // Se um personagem foi encontrado como vencedor
    if (personagemVencedor) {
        // Exibe o nome do personagem vencedor na tela
        document.getElementById("result").textContent = `O personagem que mais combina com você é: ${personagemVencedor}!`;
        // Chama a função para buscar mais dados sobre o personagem vencedor
        await buscarDadosPersonagem(personagemVencedor);
    }
}

// Função para buscar dados do personagem na API
async function buscarDadosPersonagem(nomePersonagem) {
    // Define a URL da API para buscar o personagem pelo nome
    const apiUrl = `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(nomePersonagem)}`;

    try {
        // Faz a requisição para a API
        const response = await fetch(apiUrl);
        if (response.ok) {  // Se a resposta for bem-sucedida
            // Converte a resposta para um objeto JSON
            const data = await response.json();
            // Se o personagem foi encontrado, exibe seus dados
            if (data.results.length > 0) displayCharacter(data.results[0]);
        }
    } catch (error) {
        // Se ocorrer algum erro na requisição, exibe um erro no console
        console.error("Erro ao buscar personagem:", error);
    }
}

// Função para exibir os dados do personagem na página
function displayCharacter(character) {
    // Preenche a área de informações do personagem com seus dados
    document.getElementById('characterInfo').innerHTML = `
        <h3>${character.name}</h3>  <!-- Exibe o nome do personagem -->
        <img src="${character.image}" alt="${character.name}" style="width:200px;">  <!-- Exibe a imagem do personagem -->
        <br>
        <strong>Status:</strong> ${character.status}  <!-- Exibe o status do personagem -->
        <br>
        <strong>Espécie:</strong> ${character.species}  <!-- Exibe a espécie do personagem -->
        <br>
        <strong>Origem:</strong> ${character.origin.name}  <!-- Exibe a origem do personagem -->
        <br>
        <strong>Localização:</strong> ${character.location.name}  <!-- Exibe a localização do personagem -->
    `;
}
