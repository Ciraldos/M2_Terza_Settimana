

const generateProductCards = function (products) {
  const row = document.getElementById('products-row')
  products.forEach((product) => {
    const newCol = document.createElement('div')
    newCol.classList.add('col')
    newCol.innerHTML = `
      <div class="card h-100 d-flex flex-column rounded-4 shadow">
        <img src="${product.imageUrl}" class="card-img-top p-4" alt="Immagine">
        <div class="card-body d-flex flex-column justify-content-around">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text fw-semibold">Brand: ${product.brand}</p>
          <p class="card-text">${product.description}</p>
          <div class="d-flex justify-content-around" id="btn-group">
            <button class="btn btn-info btn-outline-dark shadow-sm">${product.price}€</button>
            <a class="btn btn-warning btn-outline-dark shadow-sm" href="backoffice.html?productId=${product._id}" id="edit-button">MODIFICA</a>
            <a class="btn btn-outline-dark btn-warning shadow-sm" href="details.html?productId=${product._id}">INFO</a>
          </div>
        </div>
      </div>
      `
      row.appendChild(newCol)
  })
}

document.addEventListener("DOMContentLoaded", function () {
  const spinner = document.getElementById("loadingSpinner");
const getEvents = function () {
  //  recuperiamo la lista di eventi attualmente nel database
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZGNkNjgxODQ0MjAwMTUzNzU4OWYiLCJpYXQiOjE3MTUzMzAyNjIsImV4cCI6MTcxNjUzOTg2Mn0.HzoKSqabmjuHCLy5nFws77BouB4WFCrQ3Bdj1xnhkvk"
        }
    })
    .then((response) => {
      if (response.ok) {
        console.log(response)
        return response.json()
      } else {
        switch (response.status) {
          case 401:
            throw new Error(
              "Errore 401: Non autorizzato. Assicurati di avere le credenziali corrette."
            );
          case 403:
            throw new Error(
              "Errore 403: Accesso negato. Non hai i permessi per accedere a questa risorsa."
            );
          case 404:
            throw new Error(
              "Errore 404: Risorsa non trovata. Verifica l'URL e riprova."
            );
          case 500:
            throw new Error(
              "Errore 500: Errore interno del server. Riprova più tardi."
            );
          case 502:
            throw new Error(
              "Errore 502: Il server ha ricevuto una risposta non valida."
            );
          case 503:
            throw new Error(
              "Errore 503: Il server non è attualmente disponibile (sovraccarico o in manutenzione)."
            );
          case 504:
            throw new Error(
              "Errore 504: Il server ha impiegato troppo tempo a rispondere."
            );
          default:
            if (response.status >= 400 && response.status < 500) {
              throw new Error(
                `Errore client ${response.status}: ${response.statusText}`
              );
            } else if (response.status >= 500 && response.status < 600) {
              throw new Error(
                `Errore server ${response.status}: ${response.statusText}`
              );
            }
            throw new Error(`${response.status}: ${response.statusText}`);
        }
      }
    })
    .then((array) => {
      console.log('ARRAY!', array)
      // creiamo le card per la landing page
      generateProductCards(array)
      spinner.style.visibility = "hidden";
    })
    .catch((err) => {
      console.log('ERRORE!', err)
      alert(`An error occurred: ${err.message}`);
    })
}

getEvents()
})
