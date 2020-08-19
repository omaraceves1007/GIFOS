const DOC = window.document;
export function dark(){
    let selectors = getSelectors();
    selectors.HEADER.classList.add('dark');
    selectors.NAV_LIST.classList.add('menu-nig');
    selectors.NAV_ICONS.forEach(ima => {
        let temp = ima.src.slice(0,ima.src.indexOf('.svg'));
        ima.src = `${temp}-dark.svg`;
    });
    selectors.NAV_PLUS.classList.add('plus-dark');
    selectors.NAV_PLUS.children[0].classList.add('icon-plus-d');
    selectors.BODY.classList.add('dark-b', 'text-white');
    selectors.CAR.classList.add('carrousel-section-b', 'text-white');
    selectors.CAR_B.forEach(button=>{
        button.classList.add('dark');
    });
    selectors.TEXT.forEach(el => {
        el.classList.add('text-white');
    });
    selectors.SEARCH.classList.add('buscar-d');
    selectors.SEARCH_IN.classList.add('dark-in');
    selectors.SEARCH_I.classList.add('icon-plus-d');
    selectors.MORE?.classList.add('button-b');
    selectors.FOOTER.classList.add('dark');
    selectors.RECORD.classList.add( 'dark-b' );
    selectors.FRAME.classList.add( 'frame-d' );
    selectors.CAMERA.src = 'img/camara-modo-noc.svg';
    selectors.CINT.src = 'img/pelicula-modo-noc.svg';
    selectors.UNO.classList.add( 'circle-d' );
    selectors.DOS.classList.add( 'circle-d' );
    selectors.TRES.classList.add( 'circle-d' );
    selectors.BAR.classList.add( 'bar-d' );
    selectors.BUTON_END.classList.add( 'button-d' );
    if( selectors.UNO.classList.contains('active-round') ) { selectors.UNO.classList.add( 'active-round-d' ); }
    if( selectors.DOS.classList.contains('active-round') ) { selectors.DOS.classList.add( 'active-round-d' ); }
    if( selectors.TRES.classList.contains('active-round') ) { selectors.TRES.classList.add( 'active-round-d' ); }
}

export function light(){
    let selectors = getSelectors();
    selectors.HEADER.classList.remove('dark');
    selectors.NAV_LIST.classList.remove('menu-nig');
    selectors.NAV_ICONS.forEach(ima => {
        let temp = ima.src.slice(0,ima.src.indexOf('-dark.svg'));
        ima.src = `${temp}.svg`;
    });
    selectors.NAV_PLUS.classList.remove('plus-dark');
    selectors.NAV_PLUS.children[0].classList.remove('icon-plus-d');
    selectors.BODY.classList.remove('dark-b', 'text-white');
    selectors.CAR.classList.remove('carrousel-section-b', 'text-white');
    selectors.CAR_B.forEach(button=>{
        button.classList.remove('dark');
    });
    selectors.TEXT.forEach((el) => {
        el.classList.remove('text-white');
    });
    selectors.SEARCH.classList.remove('buscar-d');
    selectors.SEARCH_IN.classList.remove('dark-in');
    selectors.SEARCH_I.classList.remove('icon-plus-d');
    selectors.MORE?.classList.remove('button-b');
    selectors.FOOTER.classList.remove('dark');
    selectors.RECORD.classList.remove( 'dark-b' );
    selectors.FRAME.classList.remove( 'frame-d' );
    selectors.CAMERA.src = 'img/camara.svg';
    selectors.CINT.src = 'img/pelicula.svg';
    selectors.UNO.classList.remove( 'circle-d' );
    selectors.DOS.classList.remove( 'circle-d' );
    selectors.TRES.classList.remove( 'circle-d' );
    selectors.BAR.classList.remove( 'bar-d' );
    selectors.BUTON_END.classList.remove( 'button-d' );
    if( selectors.UNO.classList.contains('active-round') ) { selectors.UNO.classList.remove( 'active-round-d' ); }
    if( selectors.DOS.classList.contains('active-round') ) { selectors.DOS.classList.remove( 'active-round-d' ); }
    if( selectors.TRES.classList.contains('active-round') ) { selectors.TRES.classList.remove( 'active-round-d' ); }
}

function getSelectors() {
    return {
        HEADER : DOC.querySelector('header'),
        NAV_LIST : DOC.querySelector('ul.menu'),
        NAV_ICONS : DOC.querySelectorAll('nav img'),
        NAV_PLUS : DOC.getElementById('plus'),
        BODY : DOC.querySelector('body'),
        CAR : DOC.querySelector('section.carrousel-section'),
        CAR_B : DOC.querySelectorAll('.right button, .left button'),
        TEXT : DOC.querySelectorAll('p, footer, h1, h2, h3, h4, li'),
        SEARCH : DOC.querySelector('div.buscar'),
        SEARCH_IN : DOC.querySelector('input#buscar'),
        SEARCH_I : DOC.querySelector('div.buscar button i'),
        MORE : DOC.querySelector('div.ver-mas button'),
        FOOTER : DOC.querySelector('footer'),
        MODAL : DOC.querySelector( '.modal' ),
        RECORD : DOC.getElementById('record-section'),
        FRAME : DOC.querySelector( '.frame' ),
        CAMERA : DOC.querySelector( '.camera' ),
        CINT : DOC.querySelector( '.cint' ),
        UNO : DOC.getElementById('1'),
        DOS : DOC.getElementById('2'),
        TRES : DOC.getElementById('3'),
        BAR : DOC.querySelector( '.bar' ),
        BUTON_END : DOC.querySelector( '.button-end button' )
    };
}