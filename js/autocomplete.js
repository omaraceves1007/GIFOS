export function getSearchText() {
    const INPUT_SEARCH = document.getElementById('buscar');
    return INPUT_SEARCH.value;
}

export function setClass() {
    const SEARCH_BOX = document.querySelector('div.buscar.grid');
    SEARCH_BOX.classList.add('autocomplete');
}

export function deleteClass() {
    const SEARCH_BOX = document.querySelector('div.buscar.grid');
    SEARCH_BOX.classList.remove('autocomplete');
}

export function getTextBox() {
    return document.getElementById('buscar');
}

export function cleanText() {
    document.getElementById('buscar').value = '';
}