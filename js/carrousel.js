import * as DOC from './buttons.js';
import* as INSERT from './inserts.js';

const SCROLL = DOC.DOC.querySelector( 'div.carrousel' );
const RIGHT = DOC.DOC.querySelector( '.right' );
const LEFT = DOC.DOC.querySelector( '.left' );
let jump = 0;
let flow = true;

export function initCarrousel( gifs ) {
    let parent = DOC.CARROUSEL;
    let content = createItemCard( gifs );
    RIGHT.onclick = () => { goBack( content ) };
    LEFT.onclick = () => { goNext( content ) };
    content.forEach( card => parent.appendChild( card ) );
}

function createItemCard( gifs ) {
    let innerCards = [];
    gifs.forEach( gif => {
        let container = INSERT.createEle( 'div', 'gif-carrousel' );
        let image = INSERT.createEle( 'img' );
            image.src = gif.url;
            image.alt = gif.title;
        if( window.screen.width < 550 ){
            image.onclick = () => { INSERT.max( gif, gifs, false ) };
        }
        let hover = INSERT.createEle( 'div', 'car-hover' );
        let buttons = INSERT.createEle( 'div', 'buttons-car' );
        let info = INSERT.createEle( 'div', 'car-info' );
            info.innerHTML = `<p class="user">${ gif.user }</p>
                            <p class="title-gif">${ gif.title }</p>`
        let but_arr = [
            createButton( INSERT.addFavorite ,INSERT.TYPES_B.favh , gif),
            createButton( INSERT.download ,INSERT.TYPES_B.download , gif),
            createButton( INSERT.max ,INSERT.TYPES_B.max , gif, gifs)
        ];
            but_arr.forEach( button => buttons.append( button ) );
            hover.append( buttons, info );
            container.append( image, hover );
            innerCards.push( container );
    } );
    return innerCards;
}

function createButton( func, type, item, list ) {
    let button = INSERT.createEle( 'button', 'button-t' );
    if( list ){
        button.onclick = () => { func( item, list, false ) };
    } else {
        button.onclick = () => { func( item ) };
    }
    let icon = INSERT.createEle( 'i', 'icon' );
        icon.classList.add( type );
    button.append( icon );
    return button;
}

function goNext( list ) {
    if( jump === 11 ){
        jump = 0;
    } else if( jump === 0 ) {
        jump = 3;
    } else {
        if( flow ){
            jump += 1;
        } else {
            jump += 3;
            flow = true;
        }
    }
    list[jump].scrollIntoView();
}

function goBack( list ) {
    if( jump === 0 ){
        jump = 11;
    } else if( jump === 11) {
        jump = 8;
    } else {
        if( flow ) {
            jump -= 3;
            flow = false;
        } else {
            jump -= 1;
        }
    }
    list[jump].scrollIntoView();
}