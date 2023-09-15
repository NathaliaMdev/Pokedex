
const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');
const pokemon_information = document.getElementById('pokemon_information')
const pokemon_about = document.getElementById('pokemon_about')
const pokemon_button_about = document.getElementById('buttonAbout')
const pokemon_button_basestats = document.getElementById('buttonBaseStats')
const pokemon_button_evolution = document.getElementById('buttonEvolution')
const pokemon_button_moves = document.getElementById('buttonMoves')
let pokemon; 



function convertPokemonToInformationPokemon(pokemon) {
    return `
       
        <li class="pokemon_detail ${pokemon.type}">
            <div class="arrow_and_heart_container">
                <a class="arrow" href="index.html">  </a>
                <a class="heart"></a>
            </div>
            <div class="container_number_name">
                <span class="name">${pokemon.name}</span>
                <span class="number">#${pokemon.number}</span>
            </div>
            <div class="detail">
            <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            </div>
            <div class="image_container">
            <img class="img-pokemon "  src="${pokemon.photo}"  alt="${pokemon.name}" > 
            </div>
        </li>
       
        
    `

}

function convertPokemontoAboutInformation(pokemon){
    return`<div class= "table_div" >
            <table class="table_information">
                    <tbody class= "table_results">
                        <tr>
                            <td class="tag">Specie:</td>
                            <td class="response">${pokemon.specie}</td>
                        </tr>
                        <tr>
                            <td class="tag">Heigth:</td>
                            <td class="response">${pokemon.height}</td>
                        </tr>
            
                        <tr>
                            <td class="tag">Weight:</td>
                            <td class="response">  ${pokemon.weight}</td>
                        </tr>
                        <tr>
                        <td class="h2_td"><h2 class="tag">Breeding:</h2></td>
                        
                        </tr>
                        <tr> 
                            <td class="tag">Abilities:</td>
                            <td class="response">
                            <ol>
                                ${pokemon.abilities.map((abilitie) => `<li class="type ${abilitie}">${abilitie}</li>`).join('')} </li>
                            </ol>
                            </td>
                        </tr>
                        <tr>  
                            <td  class="tag">EggGrous </td>
                            <td class="response">
                            <ol>    ${pokemon.eggGroups.map((eggGroup) => `<li class="type ${eggGroup}">${eggGroup}</li>`).join('')} </li>
                            </ol>
                            </td>
                        </tr>
                        <tr>
                            <td  class="tag">GrowthRate </td>
                            <td class="response">
                                ${pokemon.growthRate}
                            </td>
                        </tr>
                    </div>
                </tbody>
            </table>
        </div>    
        `
}

function convertPokemontoBaseStatsInformation(pokemon){
        function criaBarra(valor, idBarra, color) {
        let porcentagem = (valor / 100) * 100; // Supondo uma barra de 100 unidades
        let color_background = color;
        if (porcentagem > 100){
            porcentagem = (valor/600 * 100)
        }else if(idBarra === "basestat"){
            idBarra = "total"
        }else if (color === "red" || color === "green"){
            color_background = color;
        }
        return `
          <tr>
            <td class="tag">${idBarra}:</td>
            <td class="response">${valor}</td>
            <td class="container_power_bar">
              <div class="power_bar">
                <div class="power_bar_element" id="${idBarra}_bar"  style="background-color:${color_background}; width:${porcentagem}%;"></div>
              </div>
            </td>
          </tr>
        `;
    }
    
    const hpBar = criaBarra(pokemon.hp, "hp", "red");
    const attackBar = criaBarra(pokemon.attack, "attack", "green");
    const defenseBar = criaBarra(pokemon.defense, "defense","red");
    const specialAttackBar = criaBarra(pokemon.special_attack, "special_attack","green");
    const specialDefenseBar = criaBarra(pokemon.special_defense, "special_defense", "red");
    const speedBar = criaBarra(pokemon.speed, "speed", "green");
    const baseStatBar = criaBarra(pokemon.total_base_stat(), "basestat", "red");
    
    return`<div class= "table_div">
                <table>
                    <tbody>
                        <div>
                            ${hpBar}
                            ${attackBar}
                            ${defenseBar}
                            ${specialAttackBar}
                            ${specialDefenseBar}
                            ${speedBar}
                            ${baseStatBar}
                        </div>
                    </tbody>
                </table>
                <h2>Type defenses </h2>
                <p> The effectiviness of each type on <span class="pokemon_name">${pokemon.name}</span> </p>
            </div>    
`
}

function convertPokemontoEvolutionInformation(pokemon){
   return`
    <div class= "table_div">
            <table class="table_information">
                <tr class= "table_evolution">
                    <td class="tag_evolution_name">Evolution:</td>
                    ${pokemon.evolutions.map(evolution => {
                    return `<td class="evolution_name"> ${evolution.name} </td>`
                })
                }
                </tr>
                <tr class= "table_evolution">
                <td class="tag_evolution_link"><a href="${`http://127.0.0.1:5500/pagePoke.html?id=${pokemon.number + 1}`}">Veja aqui</a></td>
                </tr>
            </table>
    </div>
   `

}
function convertPokemontoMovesInformation(pokemon){
    return`
    <div class= "table_div">
            <table class="table_information">
                <tr class= "table_moves">
                    <td class="tag_moves_name">Evolution:</td>
                    <td class="tag_moves"> ${pokemon.movesSkill.map((moveSkill) => `<li class="type ${moveSkill}">${moveSkill}</li>`).join('')}</td>
                </tr>
    
            </table>
    </div>
   `

}

pokemon_button_about.addEventListener("click", () => {
     let show_about_information = convertPokemontoAboutInformation(pokemon)
     pokemon_about.innerHTML = show_about_information
})

pokemon_button_basestats.addEventListener("click", () => {
    let show_about_information = convertPokemontoBaseStatsInformation(pokemon)
     pokemon_about.innerHTML = show_about_information
})
pokemon_button_evolution.addEventListener("click", () => {
    let show_about_information = convertPokemontoEvolutionInformation(pokemon)
    pokemon_about.innerHTML = show_about_information
})

pokemon_button_moves.addEventListener("click", () => {
    let show_about_information = convertPokemontoMovesInformation(pokemon)
    pokemon_about.innerHTML = show_about_information
})

function loadPokemonInformation() {
    pokeApi.getPokemonDetailById(pokemonId).then((pokemonDetail) => {
        const baseInformation = convertPokemonToInformationPokemon(pokemonDetail)
        const aboutInformation = convertPokemontoAboutInformation(pokemonDetail)
        pokemon_information.innerHTML = baseInformation
        pokemon_about.innerHTML = aboutInformation
        pokemon = pokemonDetail
    })
}
loadPokemonInformation()






