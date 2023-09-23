const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li  class="type ${type}">${type}</li>`).join('')}
                    
                    <li class = "stats ${pokemon.type} ">HP: ${pokemon.hp}</li>
                    <li class = "stats ${pokemon.type} ">ATTACK: ${pokemon.attack}</li>
                    <li class = "stats ${pokemon.type}">DEFENSE: ${pokemon.defense}</li>
                    <li class = "stats ${pokemon.type}">SP.ATTACK: ${pokemon.sp_attack}</li>
                    <li class = "stats ${pokemon.type}">SP.DEFENSE: ${pokemon.sp_defense}</li>
                    <li class = "stats ${pokemon.type}">SPEED: ${pokemon.speed}</li>
                    
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
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


