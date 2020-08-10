export let storage = window.localStorage;

export function existData( key ) {
    if ( storage.getItem( key ) )
        return true;
    return false;
}

export function save( object ) {
    storage.setItem( object.key, object.data );
}

export function getData( key ) {
    return storage.getItem( key );
}