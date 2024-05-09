

const getPhotos = function (keyWord) {
    fetch("https://api.pexels.com/v1/search?query=" + keyWord, {  
        headers: { 
            Authorization: "4BBKISgFgHO4AXQ9wsFVeOWMXK50TP2dgogfDiiGruEYM6qr7jTG3HTQ"  
        } 
    })
    .then((response) => {
        console.log("Immagini caricate", response);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Le immagini non sono state caricate");
        }
    })

    .then((arrayOfPhotos) => {
        const allTheCardsImgs = document.querySelectorAll(".card img")
        allTheCardsImgs.forEach((card, i)=>{
            card.setAttribute("src", arrayOfPhotos.photos[i].src.medium)
        })
        
    })
    .catch((error) => {
        console.log("Errore", error);
    });
}

getPhotos("cockatiels")

