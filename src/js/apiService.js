const BASE_URL = 'https://pixabay.com/api/';

function fetchPokemon(pokemonId) {
    return fetch(`${ BASE_URL }/pokemon/${ pokemonId }`).then(response =>
        response.json(),
    );
}

export default { fetchPokemon };

'BASE_URL?image_type=photo&orientation=horizontal&q=${searhImg}&page=${pageNum}&per_page=${perPage}&key=PIXABAY_KEY '