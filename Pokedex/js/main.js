const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

const maxRecords = 1000
const limit = 151
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li id="pokemon_detail" class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
           

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
        let pokemon_listHtml = document.getElementsByClassName('pokemon')
        for(let li of pokemon_listHtml){
            li.addEventListener('click', (event) => {
               let pokemonId = li.getElementsByClassName('number')[0].innerHTML.replace('#', '')
               const detalhesUrl = `pagePoke.html?id=${pokemonId}`; // Substitua 'detalhes.html' pela sua página de detalhes

               // Redirecione o usuário para a página de detalhes
               window.location.href = detalhesUrl;
            });
        }
    })
}



searchButton.addEventListener('click', async () => {
    const searchTerm = searchInput.value.trim();
    const searchTermNumeric = Number(searchTerm);

    if (!isNaN(searchTermNumeric)) { 
        const urlSearchButton = `pagePoke.html?id=${searchTermNumeric}`;
        window.location.href = urlSearchButton;
    }else if (typeof searchTerm === "string") {
        const newStringNamePokemon = searchTerm.toLowerCase()
        try {
            const pokemonData = await getPokemonByName(newStringNamePokemon);
            if (pokemonData) {
                // Aqui você pode usar os dados do Pokémon, por exemplo, exibir no console
                const pokemonId = pokemonData.id;
                const urlSearchButton = `pagePoke.html?id=${pokemonId}`;
                window.location.href = urlSearchButton;
            } else {
                alert("Por favor digite um número ou nome válido")
            }
    
        } catch (error) {
            console.error(error);
        }
    
    } else {
        console.log("Pokemon não encontrado");
    }
});

async function getPokemonByName(name) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) {
            throw new Error('Pokémon não encontrado.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Função para pesquisar e processar o nome do Pokémon
async function searchPokemon() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Verifique se o campo de pesquisa está vazio
    if (searchTerm === "") {
        console.log("Campo de pesquisa vazio.");
        return;
    }

    // Obtenha a lista de Pokémon
    const pokemonListResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
    const pokemonListData = await pokemonListResponse.json();

    // Verifique se o nome do Pokémon corresponde à lista
    const pokemon = pokemonListData.results.find(p => p.name === searchTerm);

    if (pokemon) {
        // Extrair o ID da URL
        const pokemonId = pokemon.url.split('/').slice(-2, -1)[0];
        console.log(`Pokémon encontrado! Nome: ${pokemon.name}, ID: ${pokemonId}`);
    } else {
        console.log(`Pokémon com nome "${searchTerm}" não encontrado.`);
    }
}

// Adicione um ouvinte de eventos ao botão de pesquisa
searchButton.addEventListener('click', searchPokemon);



loadMoreButton.addEventListener('click', () => {
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
    offset += limit

})
