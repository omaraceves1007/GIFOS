export class GIFOS {
    constructor( id, title, url, user) {
        this.id = id;
        this.title = title === "" || title === undefined ? 'Sin titulo' : title;
        this.url = url;
        this.user = user === "" || user === undefined ? 'Sin nombre usuario' : user;
    }
}

export function createArray( gifs ) {
    let arr = [];
    gifs.forEach(element => {
        let new_gif = new GIFOS( element.id, element.title, element.images.downsized_large.url, element.username );
        arr.push( new_gif );
    });
    return arr;
}

export function arrayFromMis( mis ) {
    let new_arr = [];
    mis.forEach( item => {
        if( item.exist ){
            new_arr.push( new GIFOS( item.gif.id, item.gif.title, item.gif.url, item.gif.user ) );
        }
    } );
    return new_arr;
}