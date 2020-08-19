const KEY = 'ZGixrwRe4p2KRC7dadqj5o1gKO1ks93a'; // 'RVMI7UVuYe5FIgQ8wXDahFt62ndYR0k5';
const BASE_URL = 'https://api.giphy.com/v1/gifs';
const BASE_TRENDING = 'https://api.giphy.com/v1/';
const RANDOM = `${ BASE_URL }/random?api_key=${ KEY }`;
const TRENDING = `${ BASE_TRENDING }trending/searches?api_key=${ KEY }`;
const AUTOCOMPLETE = `${ BASE_URL }/search/tags?api_key=${ KEY }`;
const TREND_IMAGE = `${BASE_URL}/trending?api_key=${ KEY }&limit=12&rating=g`;
const UPLOAD = `https://upload.giphy.com/v1/gifs?api_key=${ KEY }`;
let ids = 'M33UV4NDvkTHa,f9XgYLDBg1HCDAldN7';
const GIFS = `${BASE_URL}?api_key=${KEY}&ids=`;

// api.giphy.com/v1/gifs/search/tags
// api.giphy.com/v1/trending/searches
export function getRandom() {
    return fetch( RANDOM ).then( e => e.json() );
}

export function getTrending() {
    return fetch( TRENDING ).then( e => e.json() )
        .then( trendings => {
            if( trendings.meta ){
                if( trendings.meta.status === 200 ){
                    return new Promise( resolve => resolve( trendings.data.slice( 0, 5 ) ) );
                } else {
                    throw new Error ('Error al obtener trendings');
                }
            }
        });
}

export function search( word, offset ) {
    let url = `${ BASE_URL }/search?api_key=${ KEY }&q=${ word }&limit=12&offset=${ offset ? offset : 0}`;
    return fetch( url ).then( e => e.json() )
        .then( respResult );
}


export function autocomplete( text ) {
    let url = `${AUTOCOMPLETE}&q=${text}`;
    return fetch( url ).then( e => e.json() )
        .then( respResult );
}

export function getTrendingImages() {
    return fetch( TREND_IMAGE ).then( resp => resp.json() )
            .then( respResult )
            .catch( console.log );
}

export function upload( data ) {
    return fetch( UPLOAD, data ).then( res => res.json())
    .then( respResult )
    .catch( console.log );
}

export function getByIds( ids ) {
    return fetch( GIFS + ids ).then( res => res.json() )
        .then( respResult )
        .catch( console.log );
}

export function getById ( id ) {
    let url = `${ BASE_URL }/${ id }?api_key=${ KEY }`;
    return fetch( url ).then( res => res.json() )
        .then( respResult )
        .catch( console.log );
}

// getByIds( ids );

function respResult( response ) {
    if( response.meta ) {
        if( response.meta.status === 200 ){
            return new Promise( resolve => {
                resolve( response.data );
            });
        }  else {
            throw new Error('error de busqueda');
        }
    }
}