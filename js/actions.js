
(()=>{
    getHtml('header', 'data-header');
    getHtml('footer', 'data-footer');
})();

function getHtml(tag, attr){
    const head = document.getElementsByTagName(tag)[0];
    const page = head.getAttribute(attr);
    fetch(page).then(pag => pag.text())
    .then(html => {
        head.innerHTML = html;
        if(attr === 'data-header'){
            insertMenu();
            // dark();   
        }
    })
    .catch(console.error)
}

function insertMenu(){
    const OPEN = document.querySelector('img.open');
    const CLOSE = document.querySelector('img.close');
    const MENU = document.querySelector('ul.menu');
    
    OPEN.addEventListener('click', (event) => {
        event.target.style.display = 'none';
        CLOSE.style.display = 'block';
        MENU.classList.remove('fadeOutUp');
        MENU.classList.add('fadeInDown');
        MENU.style.display = 'block';
    });

    CLOSE.addEventListener('click', (event) => {
        event.target.style.display = 'none';
        MENU.classList.remove('fadeInDown');
        MENU.classList.add('fadeOutUp');
        setTimeout(() => MENU.style.display = 'none',1000);
        OPEN.style.display = 'block';
    });
}

function dark(){
    const HEADER = document.querySelector('header');
    const NAV = document.querySelector('nav.grid');
    const NAV_ICONS = document.querySelectorAll('nav img');
    const BODY = document.querySelector('body');
    const CAR = document.querySelector('section.carrousel-section');
    const CAR_B = document.querySelectorAll('.right button, .left button');
    const TEXT = document.querySelectorAll('p, footer, h1, h2, h3, h4, li');
    const SEARCH = document.querySelector('div.buscar');
    const MORE = document.querySelector('div.ver-mas button');
    const FOOTER = document.querySelector('footer');
    HEADER.classList.add('dark');
    NAV.classList.add('menu-nig');
    NAV_ICONS.forEach(ima => {
        let temp = ima.src.slice(0,ima.src.indexOf('.svg'));
        ima.src = `${temp}-dark.svg`;
    });
    BODY.classList.add('dark-b');
    CAR.classList.add('carrousel-section-b');
    CAR_B.forEach(button=>{
        button.classList.add('dark');
    });
    TEXT.forEach(el => {
        el.style.color = '#ffffff';
    });
    SEARCH.classList.add('buscar-d');
    MORE.classList.add('button-b');
    FOOTER.classList.add('dark');
}

const SEARCH = document.querySelector('.buscar > img');

SEARCH.addEventListener('click', (event) => {
    console.log('Buscar')
});