
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getSpecieOfPokemon = (pokemonId) =>{
    return fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
        .then((response) => response.json())
       
       
}
pokeApi.getPokemonEvolution = (evolutionChainUrl) =>{
    return fetch(evolutionChainUrl)
            .then((response) => response.json())
           
}

async function  convertPokeApiDetailToPokemonInformation(pokeDetail)  {
    const pokemon = new Pokemon_Detail()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    let specie = await pokeApi.getSpecieOfPokemon(pokemon.number)
    let evolution = await pokeApi.getPokemonEvolution(specie.evolution_chain.url) 

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    //Pokemon About
    pokemon.specie = specie.genera.filter(g => g.language.name == 'en')[0].genus

    pokemon.height = pokeDetail.height

    pokemon.weight = pokeDetail.weight

    const abilities = pokeDetail.abilities.map((AbilityName) => AbilityName.ability.name)
    const [abilitie] = abilities

    pokemon.abilities = abilities
    pokemon.abilitie = abilitie

    const eggGroups = specie.egg_groups.map((EggGroup) => EggGroup.name)
    const [eggGroup] = eggGroups

    pokemon.eggGroups = eggGroups
    pokemon.eggGroup = eggGroup

    pokemon.growthRate = specie.growth_rate.name

    //Pokemon BaseStats

    pokemon.hp = pokeDetail.stats[0].base_stat
    pokemon.attack = pokeDetail.stats[1].base_stat
    pokemon.defense = pokeDetail.stats[2].base_stat
    pokemon.special_attack = pokeDetail.stats[3].base_stat
    pokemon.special_defense= pokeDetail.stats[4].base_stat
    pokemon.speed = pokeDetail.stats[5].base_stat

    //Pokemon Evolution

    pokemon.evolutions = evolution.chain.evolves_to.map(species => species.species)
    

    



    return pokemon
}




pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemonDetailById = (pokemonId) =>{
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
           .then((response) => response.json())
           .then(convertPokeApiDetailToPokemonInformation)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}


