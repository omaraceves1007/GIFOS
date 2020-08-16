var constraints = { audio: true, video: { width: 1280, height: 720 } };

navigator.mediaDevices.getUserMedia(constraints)
    .then(function (mediaStream) {
        var video = document.querySelector('video');
        video.srcObject = mediaStream;
        video.onloadedmetadata = function (e) {
            video.play();
        };
    })
    .catch(function (err) { console.log(err.name + ": " + err.message); });









// CODIGO para descarga directa

let urlImage = "https://media1.giphy.com/media/dwLKHNAH13CkA8yYQO/giphy.gif?cid=53af4d4931cb7d5758f1592b56ae5b5ca5cc302be6556c20&rid=giphy.gif";
​
async function getImage(urlImage) {
    let response = await fetch(urlImage);
    let gifBlob = await response.blob();
    console.info(gifBlob);
    return gifBlob;
}
​
getImage(urlImage).then(blob => {
    const url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = 'myGiphy.gif';
    a.title = 'Descargar';
    a.textContent = 'Descargar';
    document.body.appendChild(a); 
}).catch(console.error);