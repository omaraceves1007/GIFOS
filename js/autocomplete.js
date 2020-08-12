const DOC = window.document;
export function getSearchText() {
    const INPUT_SEARCH = DOC.getElementById('buscar');
    return INPUT_SEARCH.value;
}

export function setClass() {
    const SEARCH_BOX = DOC.querySelector('div.buscar.grid');
    SEARCH_BOX.classList.add('autocomplete');
}

export function deleteClass() {
    const SEARCH_BOX = DOC.querySelector('div.buscar.grid');
    SEARCH_BOX.classList.remove('autocomplete');
}

export function getTextBox() {
    return DOC.getElementById('buscar');
}

export function cleanText() {
    DOC.getElementById('buscar').value = '';
}