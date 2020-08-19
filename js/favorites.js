// import * as STORAGE from './storage.js';
import * as DOC from './buttons.js';
import * as INSERT from './inserts.js';
import * as STORAGE from './storage.js';
import * as GIFOS from './gifs.js';

let start = 0;
let end = 12;
let favorites = DOC.FAVS;
let misGifos = DOC.MIS;

// create empty seccion favorites
export function emptySecction( idIcon, dark ) {
    let section = idIcon === 'fav' ? favorites : misGifos;
        section.innerHTML = '';
        section.classList.remove( 'hide' );
    let title_text = idIcon === 'fav' ? 'Favoritos' : 'Mis GIFOS';
    let leyend = idIcon === 'fav' ? '"¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!"':
                            '¡Anímate a crear tu primer GIFO!';
    let icon = INSERT.createEle( 'i', 'icon' );
        icon.classList.add( `icon-${idIcon}` )
    let title = INSERT.createEle( 'h3', 'title' );
        title.innerHTML = `<strong>${title_text}</strong>`;
        if( dark ){
            title.classList.add( 'text-white' );
        }
    let cont = INSERT.createEle( 'div' );
        cont.innerHTML = `<i class="icon-${idIcon}-empty"></i>
                        <h4 class="title-empty"> ${leyend} </h4>`;
    section.append( icon, title, cont );
    if( dark ) {
        const TEXT = DOC.DOC.querySelectorAll('p, footer, h1, h2, h3, h4, li');
        TEXT.forEach(el => {
            el.classList.add('text-white');
        });
    }
}

// create favorites secction whit data
export function insertfavs ( list, idIcon, dark ) {
    let section = idIcon === 'fav' ? favorites : misGifos;
    let title_text = idIcon === 'fav' ? 'Favoritos' : 'Mis GIFOS';
    section.innerHTML = '';
    section.classList.remove( 'hide' );
    let icon = INSERT.createEle( 'i', 'icon' );
        icon.classList.add( `icon-${idIcon}` );
    let title = INSERT.createEle( 'h3', 'title' );
        title.innerHTML = `<strong>${ title_text }</strong>`;
        if( dark ){
            title.classList.add( 'text-white' );
        }
    let container = INSERT.createEle( 'div', 'grid' );
        container.classList.add( 'fav-items' );
    let cardsInner = cards( list, dark, idIcon );
        cardsInner.forEach( card => {
            container.appendChild( card );
            card.onload = () => { console.log('se cargo todo') };
        });
    section.append( icon, title, container );
    if( list.length > end ) {
        section.appendChild( seeMore( list, idIcon ) );
    }
}

// Create Card  gifs
function cards ( list, dark, idIcon ) {
    let cards_html = [];
    let short_list = list;
    if( list.length > end ){
        short_list = list.slice( start, end );
    }
    for( const item of short_list ){
        let card = INSERT.createEle( 'div', 'fav-item' );
        let image = INSERT.createEle( 'img' );
            image.src = item.url;
            image.alt = item.title;
        if( window.screen.width < 550 ){
            image.onclick = () => { INSERT.max( item, list, dark, true) };
        }
        let p1 = INSERT.createEle( 'p', 'user' );
            p1.innerHTML = item.user;
        let p2 = INSERT.createEle( 'p', 'title-gif' );
            p2.innerHTML = item.title;
        let buttons = searchButtons( item, list, dark, idIcon );
        card.appendChild ( image );
        card.appendChild (buttons );
        card.appendChild ( p1 );
        card.appendChild ( p2 );
        cards_html.push( card );
    }
    
    return cards_html;
}

// Insert Buttons card
function searchButtons( item, list, dark, idIcon ) {
    let cont = INSERT.createEle( 'div', 'hov' );
    let buttons = INSERT.createEle( 'div', 'buttons' );
    let fisrt_b = idIcon === 'fav' ? 'addFavorite' : deleteGif;
    let icon = idIcon === 'fav' ? INSERT.TYPES_B.fava : INSERT.TYPES_B.trash;
    let but_arr = [ createButton( fisrt_b, icon, item ),
                    createButton( INSERT.download, INSERT.TYPES_B.download, item ),
                    createButton( INSERT.max, INSERT.TYPES_B.max, item, list, dark, true ) ];
    but_arr.forEach( button  => buttons.appendChild( button ) );
    cont.appendChild( buttons );
    return cont;
}

// Create Buttons cards
function createButton ( func, type, item, list, dark, fav ) {
    let button = INSERT.createEle( 'button', 'button-t' );
        if( list ) {
            button.onclick = () => { func( item, list, dark, fav ) };
        } else {
            button.onclick = () => { func( item ) };
        }
    let icon = INSERT.createEle( 'i', 'icon' );
        icon.classList.add( type );
    button.appendChild( icon );
    return button;
}

function seeMore( list, idIcon ) {
     const HEADER = DOC.DOC.querySelector('header');
     let dark = false;
    if( HEADER.classList[0] === 'dark' ) {
        dark = true;
    }
    let see = DOC.DOC.createElement( 'div' );
        see.classList.add( 'ver-mas' );
    let button = DOC.DOC.createElement( 'button' );
        button.innerText = 'VER MÁS';
        button.onclick = () => { insertMore( list.slice( end, list.length ), dark, idIcon ) };
        see.appendChild( button );
    return see;
}

function insertMore ( list, dark, idIcon ) {
    let section = idIcon === 'fav' ? favorites : misGifos;
    let container = DOC.DOC.querySelector( "div.grid.fav-items" );
    let see = idIcon === 'fav' ? DOC.DOC.querySelector( '#fav-section div.ver-mas' ) : 
                                DOC.DOC.querySelector( '#mis-section div.ver-mas' );
    see.remove();
    let tempList = [];
    let childs = [];
    if ( list.length > end ){
        tempList = list.slice( start, end );
    } else {
        tempList = list.slice( start, list.length );
    }
    childs = cards( tempList, dark );
    childs.forEach( child => container.appendChild( child ) );
    if( list.length > end ) {
        section.appendChild( seeMore( list, idIcon ) );
    }
}

function deleteGif( item ) {
    let id = item.id;
    let mis = JSON.parse( STORAGE.getData( 'mis' ) );
        mis.forEach( gif => {
            if( gif.gif.id === id ) {
                gif.exist = false;
            }
        } );
    STORAGE.save( { key: 'mis', 
                    data: mis
                } );
    let news = GIFOS.arrayFromMis( mis );
    insertfavs( news, 'mis', false );
    console.log('delete', item);
}