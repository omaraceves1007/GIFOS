import * as INSERT from './inserts.js';


let ITEMS;

export function createModal( item, items, favAdd, download, dark ){
    ITEMS = items;
    let modal = INSERT.createEle( 'div', 'modal' );
    let close = INSERT.createEle( 'button', 'close-modal');
    let icon = INSERT.createEle( 'i', 'icon');
        icon.classList.add( 'icon-close' );
        close.appendChild( icon );
        close.onclick = () => { modal.remove() };
    let modal_cont = INSERT.createEle( 'div', 'cont-modal' );
    let body = createImage( item );
    let foot = createFooter( item, favAdd, download, dark );
    if( dark ) {
        modal.classList.add( 'dark-b');
        icon.style.background = '#ffffff';
    }
    modal_cont.append(  body, foot );
    modal.append( close, modal_cont );
    document.body.appendChild( modal );
}

function createImage ( item ) {
    let container = INSERT.createEle( 'div', 'body-modal' );
    let img = INSERT.createEle( 'img' );
        img.src = item.url;
        img.alt = item.title;
        container.appendChild( img );
    return container;
}


const TEMP = `<div class="modal hide">
                <button class="close-modal"><i class="icon icon-close"></i></button>
                <div class="cont-modal">
                    <div class="body-modal">
                        <img src="https://media.giphy.com/media/fnlXXGImVWB0RYWWQj/giphy.gif" alt="clavado perruno">
                    </div>
                    <div class="footer-modal">
                        <div class="data">
                            <p>USER</p>
                            <p>TITLE GIF</p>
                        </div>
                        <div class="actions">
                            <button><i class="icon icon-Hfav"></i></button>
                            <button><i class="icon icon-download"></i></button>
                        </div>
                    </div>
                </div>
            </div>`;

function createFooter( item, func1, func2, dark ) {
    let footer = INSERT.createEle( 'div', 'footer-modal' );
    let data = INSERT.createEle( 'div', 'data' );
        data.innerHTML = `<p>${ item.user }</p>
                        <p>${ item.title }</p>`;
    let actions = INSERT.createEle( 'div', 'actions');
    let but1 = INSERT.createEle( 'button', 'icon');
        but1.classList.add( 'icon-Hfav' );
        but1.onclick = () => { func1( item ) };
    let but2 = INSERT.createEle( 'button', 'icon');
        but2.classList.add( 'icon-download' );
        but2.onclick = () => { func2( item ) };
    if( dark ) {
        but1.style.backgroundColor = '#fff';
        but2.style.backgroundColor = '#fff';
    }
    actions.appendChild( but1 );
    actions.appendChild( but2 );
    footer.appendChild( data );
    footer.appendChild( actions );
    return footer;
}

