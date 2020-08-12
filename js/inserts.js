import * as DOC from './buttons.js';
import * as GIPHY from './giphy.js';
import * as GIFOS from './gifs.js';
import * as SEARCHS from './autocomplete.js';
import * as STORAGE from './storage.js';
import * as MODAL from './modal.js';

const TYPES_B = {
    favh: 'icon-Hfav',
    fava: 'icon-Afav',
    trash: 'icon-trash',
    max: 'icon-max',
    download: 'icon-download',
    link: 'icon-link'
}

let offset = 12;
let search_list = [];

// Insert trendings \u00A0 unicode
export function insertTrendingText( trendings ) {
    let parent = DOC.DOC.getElementById( 'trending-list' );
    let text = '';
    trendings.forEach( ( element, i, arr) => {
        let item = createEle( 'li' );
        item.id = element;
        if( Object.is( arr.length - 1, i ) ) {
            item.innerHTML = `${ element[0].toUpperCase() }${ element.slice( 1 ) }.`;    
        } else {
            item.innerHTML = `${ element[0].toUpperCase() }${ element.slice( 1 ) }, `;
        }
        item.onclick = () => { search( item.id, false ) };
        parent.appendChild( item );
    } );
}

//insert autocomplete list
export function insertRecomendations( list, dark ) {
    const SEARCH_BOX = DOC.DOC.querySelector('div.buscar.grid ul');
    SEARCH_BOX.innerHTML = '';
    list.forEach( element => {
        let item = DOC.DOC.createElement('li');
        item.id = element.name;
        item.onclick = () => { search( item.id, dark ) };
        item.innerHTML = `<button id=${element.name} class="search-btn"><i class="icon icon-search"></i></button>
                            <p>${element.name}</p>`;
        SEARCH_BOX.append(item);
    });
}

// insert result search
export function insertResults ( text, list, dark ) {
    search_list = list;
    DOC.RESULTS.innerHTML = '';
    DOC.RESULTS.classList.remove( 'hide' );
    let title = DOC.DOC.createElement( 'h3' );
    title.classList.add( 'title' );
    title.innerHTML = `<strong id="resBusqueda">${ text.toUpperCase() }</strong>`;
    let container = DOC.DOC.createElement( 'div' );
    container.classList.add( 'grid', 'grid-busqueda', 'result-row' );
    let cardsInner = cards( list, dark );
    cardsInner.forEach( card => {
        container.appendChild( card );
    });
    DOC.RESULTS.appendChild( title );
    DOC.RESULTS.appendChild( container );
    DOC.RESULTS.appendChild( seeMore( text ) );
}

// Create Card  gifs
function cards ( list, dark ) {
    let cards_html = [];
    for( const item of list ){
        let card = createEle( 'div', 'result-item' );
        let image = createEle( 'img' );
            image.src = item.url;
            image.alt = item.title;
        if( window.screen.width < 550 ){
            image.onclick = () => { max( item, list, dark) };
        }
        let p1 = createEle( 'p', 'user' );
            p1.innerHTML = item.user;
        let p2 = createEle( 'p', 'title-gif' );
            p2.innerHTML = item.title;
        let buttons = searchButtons( item, list, dark );
        card.appendChild ( image );
        card.appendChild (buttons );
        card.appendChild ( p1 );
        card.appendChild ( p2 );
        cards_html.push( card );
    }
    
    return cards_html;
}

// Insert Buttons card
function searchButtons( item, list, dark ) {
    let cont = DOC.DOC.createElement( 'div' );
    cont. classList.add( 'hov' );
    let buttons = DOC.DOC.createElement( 'div' );
    buttons.classList.add( 'buttons' );
    let but_arr = [ createButton( addFavorite, TYPES_B.favh, item ),
                    createButton( download, TYPES_B.download, item ),
                    createButton( max, TYPES_B.max, item, list, dark ) ];
    but_arr.forEach( button  => buttons.appendChild( button ) );
    cont.appendChild( buttons );
    return cont;
}

// Create Buttons cards
function createButton ( func, type, item, list, dark ) {
    let button = DOC.DOC.createElement( 'button' );
        button.classList.add( 'button-t' );
        if( list ) {
            button.onclick = () => { func( item, list, dark ) };    
        } else {
            button.onclick = () => { func( item ) };
        }
    let icon = DOC.DOC.createElement( 'i' );
        icon.classList.add('icon', type);
    button.appendChild( icon );
    return button;
}

// Insert seeMore button search
export function seeMore( text ) {
    let see = DOC.DOC.createElement( 'div' );
        see.classList.add( 'ver-mas' );
    let button = DOC.DOC.createElement( 'button' );
        button.id = text;
        button.innerText = 'VER MÁS';
        button.onclick = () => { getMore( text ) };
    see.appendChild( button );
    return see;
}

// Empty search 

export function emptySecction( text, type ) {
    DOC.RESULTS.innerHTML = '';
    DOC.RESULTS.classList.remove( 'hide' );
    let title = createEle( 'h3', 'title' );
        title.innerHTML = `<strong id="resBusqueda">${ text.toUpperCase() }</strong>`;
    let cont = createEle( 'div' );
        cont.innerHTML = `<i class="icon-search-empty"></i>
                        <h4 class="title-empty"> Intenta con otra búsqueda </h4>`;
    DOC.RESULTS.append( title, cont );
}

/******* butons actions ********/ 

// see more buttons search
function search( id, dark ) {
    GIPHY.search( id ).then( gifs => {
        if(gifs) {
            let search_arr = GIFOS.createArray( gifs );
            STORAGE.save({
                key: 'search',
                data: search_arr.toString()
            });
            insertResults( id, search_arr, dark );
            SEARCHS.deleteClass();
        }
    });
}


// Get more results of search

function getMore( text ) {
    GIPHY.search( text , offset ).then( gifs => {
        if( gifs.length > 0 ){
            let temp = GIFOS.createArray( gifs );
            search_list = search_list.concat( temp );
            offset += 12;
            insertResults( text, search_list, false );
        } else {
            alert( 'No hay más resultados a cargar!!!' );
        }
    } );
}

//add to favorite array
function addFavorite( gif ) {
    console.log('favorite', gif)
}

//Delete from fav array
function trash( gif ) {
    console.log('trash', gif)
}

// Max images
function max( gif, gifs, dark ) {
    const HEADER = DOC.DOC.querySelector('header');
    if( HEADER.classList[0] === 'dark' ) {
        dark = true;
    }
    MODAL.createModal( gif, gifs, addFavorite, download, dark );
}

// Download link page
function download( gif ) {
    let index = gif.url.indexOf('?cid');
    const link = DOC.DOC.createElement( 'a' );
    link.style.display = 'none';
    link.href = gif.url.slice(0, index);
    link.download = gif.name + ".gif";
    link.target = '_blank';
    DOC.DOC.body.appendChild(link);
    link.click(); 
    link.remove();
}

function link( gif ) {
    console.log('link', gif)
}

const tempButtons = `<div class="buttons">
<button class="button-t"><i class="icon icon-Hfav"></i></button>
<button class="button-t"><i class="icon icon-Afav"></i></button>
<button class="button-t"><i class="icon icon-trash"></i></button>
<button class="button-t"><i class="icon icon-max"></i></button>
<button class="button-t"><i class="icon icon-download"></i></button>
<button class="button-t"><i class="icon icon-link"></i></button>
</div>`;

// aux functions

// Create DOC.DOC element function
export function createEle( element, clas ) {
    let component = DOC.DOC.createElement( element );
    if( clas ) {
        component.classList.add( clas );
    }
    return component;
}