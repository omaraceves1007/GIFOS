// const HEADER = DOC.querySelector('header');
// const NAV = DOC.querySelector('nav.grid');
// const NAV_LIST = DOC.querySelector('ul.menu');
// const NAV_ICONS = DOC.querySelectorAll('nav img');
// const NAV_PLUS = DOC.getElementById('plus');
// const BODY = DOC.querySelector('body');
// const CAR = DOC.querySelector('section.carrousel-section');
// const CAR_B = DOC.querySelectorAll('.right button, .left button');
// const TEXT = DOC.querySelectorAll('p, footer, h1, h2, h3, h4, li');
// const SEARCH = DOC.querySelector('div.buscar');
// const SEARCH_IN = DOC.querySelector('input#buscar');
// const SEARCH_I = DOC.querySelector('div.buscar button i');
// const MORE = DOC.querySelector('div.ver-mas button');
// const FOOTER = DOC.querySelector('footer');
const DOC = window.document;
export function dark(){
    const HEADER = DOC.querySelector('header');
    // const NAV = DOC.querySelector('nav.grid');
    const NAV_LIST = DOC.querySelector('ul.menu');
    const NAV_ICONS = DOC.querySelectorAll('nav img');
    const NAV_PLUS = DOC.getElementById('plus');
    const BODY = DOC.querySelector('body');
    const CAR = DOC.querySelector('section.carrousel-section');
    const CAR_B = DOC.querySelectorAll('.right button, .left button');
    const TEXT = DOC.querySelectorAll('p, footer, h1, h2, h3, h4, li');
    const SEARCH = DOC.querySelector('div.buscar');
    const SEARCH_IN = DOC.querySelector('input#buscar');
    const SEARCH_I = DOC.querySelector('div.buscar button i');
    const MORE = DOC.querySelector('div.ver-mas button');
    const FOOTER = DOC.querySelector('footer');
    const MODAL = DOC.querySelector( '.modal' );

    HEADER.classList.add('dark');
    NAV_LIST.classList.add('menu-nig');
    NAV_ICONS.forEach(ima => {
        let temp = ima.src.slice(0,ima.src.indexOf('.svg'));
        ima.src = `${temp}-dark.svg`;
    });
    NAV_PLUS.classList.add('plus-dark');
    NAV_PLUS.children[0].classList.add('icon-plus-d');
    BODY.classList.add('dark-b', 'text-white');
    CAR.classList.add('carrousel-section-b', 'text-white');
    CAR_B.forEach(button=>{
        button.classList.add('dark');
    });
    TEXT.forEach(el => {
        el.classList.add('text-white');
    });
    SEARCH.classList.add('buscar-d');
    SEARCH_IN.classList.add('dark-in');
    SEARCH_I.classList.add('icon-plus-d');
    MORE.classList.add('button-b');
    FOOTER.classList.add('dark');
    // MODAL.classList.add('dark-b');
}

export function light(){
    const HEADER = DOC.querySelector('header');
    // const NAV = DOC.querySelector('nav.grid');
    const NAV_LIST = DOC.querySelector('ul.menu');
    const NAV_ICONS = DOC.querySelectorAll('nav img');
    const NAV_PLUS = DOC.getElementById('plus');
    const BODY = DOC.querySelector('body');
    const CAR = DOC.querySelector('section.carrousel-section');
    const CAR_B = DOC.querySelectorAll('.right button, .left button');
    const TEXT = DOC.querySelectorAll('p, footer, h1, h2, h3, h4, li');
    const SEARCH = DOC.querySelector('div.buscar');
    const SEARCH_IN = DOC.querySelector('input#buscar');
    const SEARCH_I = DOC.querySelector('div.buscar button i');
    const MORE = DOC.querySelector('div.ver-mas button');
    const FOOTER = DOC.querySelector('footer');
    const MODAL = DOC.querySelector( '.modal' );

    HEADER.classList.remove('dark');
    NAV_LIST.classList.remove('menu-nig');
    NAV_ICONS.forEach(ima => {
        let temp = ima.src.slice(0,ima.src.indexOf('-dark.svg'));
        ima.src = `${temp}.svg`;
    });
    NAV_PLUS.classList.remove('plus-dark');
    NAV_PLUS.children[0].classList.remove('icon-plus-d');
    BODY.classList.remove('dark-b', 'text-white');
    CAR.classList.remove('carrousel-section-b', 'text-white');
    CAR_B.forEach(button=>{
        button.classList.remove('dark');
    });
    TEXT.forEach((el) => {
        el.classList.remove('text-white');
    });
    SEARCH.classList.remove('buscar-d');
    SEARCH_IN.classList.remove('dark-in');
    SEARCH_I.classList.remove('icon-plus-d');
    MORE.classList.remove('button-b');
    FOOTER.classList.remove('dark');
    // MODAL.classList.remove('dark-b');
}