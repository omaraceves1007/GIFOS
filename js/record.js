import * as DOC from './buttons.js';
import * as INSERT from './inserts.js';
import * as GIPHY from './giphy.js';
import * as STORAGE from './storage.js';
import * as GIFS from './gifs.js';

const MEDIA = window.navigator;
let STREAM;
let interval;
let VIDEO;
let BLOB;

export function start() {
    let container = DOC.DOC.querySelector( 'div.frame' );
    container.innerHTML = '';
    let title = INSERT.createEle( 'h3', 'title' );
        title.innerHTML = '¿Nos das acceso <br> a tu  cámara?';
    let text = INSERT.createEle( 'p' );
        text.innerHTML = `El acceso a tu cámara séra válido sólo <br>
                            por el tiempo en el que estés creando el GIFO.`;
    container.append( title, text );
    return 1;
}

export function getMedia() {
    const constraints = { audio: false, video: { height: { max: 480 } } };
    insertVideoTag();
    MEDIA.mediaDevices.getUserMedia( constraints )
        .then( (stream) => {
            VIDEO = DOC.DOC.querySelector( "video" );
            VIDEO.srcObject = stream;
            VIDEO.play();
            STREAM = newStream( stream );
            DOC.START_B.innerText = 'GRABAR';
            DOC.START_B.classList.remove( 'hide' );
            DOC.UNO.classList.remove( 'active-round' );
            DOC.DOS.classList.add( 'active-round' );
        } )
        .catch( err => console.log(`${ err.name }: ${ err.message } `) );
}

export function startRecord() {
    STREAM.startRecording();
    timer( DOC.TIME );
    DOC.START_B.innerText = 'FINALIZAR';
    return 2;
}

export function endRecord() {
    STREAM.stopRecording(function() {
        BLOB = STREAM.getBlob();
        // invokeSaveAsDialog(blob);
        // console.log(BLOB, 'finalizo');
    });
    clearInterval( interval );
    DOC.TIME.setAttribute( 'data', 'REPETIR CAPTURA' );
    DOC.TIME.classList.add( 'again' );
    DOC.TIME.onclick = () => {  console.log( 'click para regrabar ' ); };
    // VIDEO.srcObject.stop();
    DOC.START_B.innerText = 'SUBIR GIFO';

}

export function saveBlob() {
    VIDEO.srcObject.stop();
    DOC.TIME.removeAttribute( 'data' );
    DOC.TIME.classList.remove( 'again' )
    DOC.TIME.classList.add( 'hide' );
    DOC.START_B.classList.add( 'hide' );
    let gif = createForm( BLOB );
    uploading();
    // GIPHY.getById( resp.data.id ).then( data => {
    //     setTimeout(()=>{
    //         saveMis( data );
    //         uploaded( data );
    //     },3000);
    // } );
    saveMis( resp.data );
    setTimeout(()=>{
        uploaded();
    },3000);
    GIPHY.upload( gif ).then( info => {
        GIPHY.getById( info.id ).then( data => {
            saveMis( data );
            uploaded( data );
        } );
    } );
}

function newStream( stream ) {
    return RecordRTC( stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function() {
            console.log('started')
          },
    } );
}

function insertVideoTag() {
    let container = DOC.DOC.querySelector( 'div.frame' );
        // container.innerHTML = '';
    let video = INSERT.createEle( 'div' );
        video.id = 'video';
        video.innerHTML = `<video></video>`;   
    container.append( video ); 
}

function timer( element ) {
    let s = 0, m = 0, h = 0, se, mi, ho;
    element.setAttribute( 'data', `00:00:00`);
    element.classList.remove( 'hide' );
    interval = setInterval( () => {
        s += 1;
        if( s > 59 ){ m += 1; s = 0; }
        if( m > 59 ){ h += 1; m = 0; }
        if( h > 24 ){ h = 0; }
        se = s < 10 ? `0${s}` : s ;
        mi = m < 10 ? `0${m}` : m ;
        ho = h < 10 ? `0${h}` : h ;
        element.setAttribute( 'data', `${ho}:${mi}:${se}`);
    },1000);
}

function createForm( blob ) {
    let form = new FormData();
    form.append('file', blob, new Date().getTime.toString() );
    return {
        method: 'POST',
        body: form
    };
}

function saveMis( item ) {
    let mis_storage = [];
    let gif = {
        gif: new GIFS.GIFOS( item.id, item.title, item.images.downsized_large.url, item.username ),
        exist : true
    };
    if( STORAGE.existData( 'mis' ) ) {
        mis_storage = JSON.parse( STORAGE.getData( 'mis' ) );
    }
    mis_storage.push( gif );
    STORAGE.save( {
        key: 'mis',
        data: mis_storage
    } );
}

function uploading(){
    let video = DOC.DOC.getElementById( 'video' );
    let container = INSERT.createEle( 'div', 'onload' );
        container.innerHTML = `<i class="icon icon-load"></i>`;
    video.appendChild( container );
}

function uploaded( gif ) {
    let video = DOC.DOC.getElementById( 'video' );
    let container = INSERT.createEle( 'div', 'load' );
        container.innerHTML = `<i class="icon icon-check"></i>`;
    let cont_buttons = INSERT.createEle( 'div', 'load-buttons' );
    let buttons = [ createButton( 'download', directDownload, gif ),
                    createButton( 'link', getlink, gif ) ];
        buttons.forEach( button => cont_buttons.appendChild( button) );
    container.appendChild( cont_buttons );
    DOC.DOC.querySelector( 'div.onload' ).classList.add( 'hide' );
    video.append( container );
}

function createButton( type, func, gif ) {
    let button = INSERT.createEle( 'button' );
        button.innerHTML = `<i class="icon icon-${type}"></i>`
        button.onclick = () => { func( gif ) };
    return button;
}

function getlink( gif ) {
    let link = gif.images.downsized_large.url;
    let text = INSERT.createEle( 'input' );
    DOC.DOC.body.appendChild(text);
        text.value = link;
        text.select();
        text.setSelectionRange(0, 99999);
    DOC.DOC.execCommand( 'copy' );
    alert( `Dirección copiada correctamente.` );
    text.remove();
}

function directDownload( gif ) {
    console.log('direct dounload');
    const link = DOC.DOC.createElement( 'a', 'hide' );
    INSERT.getImage( gif.images.downsized_large.url ).then( blob => {
        const url = URL.createObjectURL( blob );
        link.href = url;
        link.download = gif.title + ".gif";
        link.target = '_blank';
    DOC.DOC.body.appendChild(link);
        link.click(); 
        link.remove();
    } );
}

// response format
const resp = {
    "data": {
        "id": "YiIGgI3QblMwU"
    },
    "meta": {
        "msg": "OK",
        "status": 200
    }
}