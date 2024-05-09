const generatePhotos = function(array) {
    array.forEach((photo, i) => {
        const photoElement = document.querySelectorAll(".card-img-top")[i];
        console.log('Photo Element:', photoElement); // Aggiunto per debug
        if (photoElement) {
            photoElement.setAttribute("src", photo.url);
        }
    });
}


const getPhotos = function () {
    fetch("https://api.pexels.com/v1/search?query=dog", { 
        method: "GET", 
        headers: { 
            Authorization: 'Bearer 4BBKISgFgHO4AXQ9wsFVeOWMXK50TP2dgogfDiiGruEYM6qr7jTG3HTQ'  
        } 
    })
    .then((response) => {
        if (response.ok) {
            console.log("Immagini caricate", response);
            return response.json();
        } else {
            throw new Error("Le immagini non sono state caricate");
        }
    })
    .then((arrayOfPhotos) => {
        console.log("Ho generato la lista delle foto", arrayOfPhotos);
        generatePhotos(arrayOfPhotos.photos);
    })
    .catch((error) => {
        console.log("Errore", error);
    });
}

