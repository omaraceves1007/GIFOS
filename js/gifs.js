export class GIFOS {
    constructor( id, title, url, user) {
        this.id = id;
        this.title = title === "" ? 'None' : title;
        this.url = url;
        this.user = user === "" ? 'None' : user;
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