// Creo una classe per l'oggetto che inserirò all'interno del DB

class Product {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name
    this.description = _description
    this.brand = _brand
    this.imageUrl = _imageUrl
    this.price = _price
  }
}

// prendo i arametri dalla barra degli indirizzi
const addressBarContent = new URLSearchParams(location.search) 
const productId = addressBarContent.get('productId') 
console.log('Product id?', productId)


// FUNZIONE CHE RECUPERA I VALORI DI UN PRODOTTO E LI INSERISCE NEL FORM PER LA MODIFICA

const getProductData = function () {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
    headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZGNkNjgxODQ0MjAwMTUzNzU4OWYiLCJpYXQiOjE3MTUzMzAyNjIsImV4cCI6MTcxNjUzOTg2Mn0.HzoKSqabmjuHCLy5nFws77BouB4WFCrQ3Bdj1xnhkvk"
    }
    })

    .then((response) => {
      if (response.ok) {
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
    .then((product) => {
      console.log('DETTAGLI RECUPERATI', product)
      document.getElementById('name').value = product.name
      document.getElementById('description').value = product.description
      document.getElementById('brand').value = product.brand
      document.getElementById('url').value = product.imageUrl
      document.getElementById('price').value = product.price
    })
    .catch((err) => {
      console.log('ERRORE!', err)
      alert(`An error occurred: ${err.message}`);
    })
}

// FUNZIONE ELIMINA PRODOTTO

const deleteProduct = function () {
  const msgConfirm = confirm("Sei sicuro che vuoi eliminare il prodotto?");

  // Verifica se l'utente ha confermato l'eliminazione
  if (msgConfirm){
  fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
    method: "DELETE",
    headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZGNkNjgxODQ0MjAwMTUzNzU4OWYiLCJpYXQiOjE3MTUzMzAyNjIsImV4cCI6MTcxNjUzOTg2Mn0.HzoKSqabmjuHCLy5nFws77BouB4WFCrQ3Bdj1xnhkvk"
    }
    })
    .then((response) => {
      if (response.ok) {
        // abbiamo eliminato con successo la risorsa!
        alert('RISORSA ELIMINATA')
        location.assign('index.html') // torniamo in home
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
    .catch((err) => {
      console.log('ERRORE!', err)
      alert(`An error occurred: ${err.message}`);
    })
  }else {
    alert("Eliminazione annullata");
  }
}


if (productId) {
  
  // SE ESISTE IL PRODUCT ID, ALLORA RICHIAMO LA FUNZIONE GETPRODUCTID() PER RICOMPILARE IL FORM E FAR SI CHE VENGA 
  // MODIFICATO IL PRODOTTO E NON CREATO

  getProductData()
  const divbuttons = document.getElementById("buttons")

  divbuttons.innerHTML = `
  <button type="submit" class="btn btn-outline-light btn-primary me-2" id="btn-sub">CREA</button>
  <button type="submit" class="btn btn-danger me-2" onclick="deleteProduct()" id="btn-delete">ELIMINA</button>
  <button type="reset" class="btn btn-warning" id="btn-reset">RESET</button>
  `

  console.log(document.getElementsByClassName('btn-primary')[0])
  // modifichiamo l'etichetta del bottone del form da "CREA!" a "MODIFICA!"
  document.getElementsByClassName('btn-primary')[0].innerText = 'MODIFICA'
}


const submitProduct = function (e) {
  e.preventDefault()
  // recuperiamo dei riferimenti agli input del form
  const nameInput = document.getElementById('name') // input field del campo name
  const descriptionInput = document.getElementById('description') // input field del campo description
  const brandInput = document.getElementById('brand') // input field del campo description
  const urlInput = document.getElementById('url') // input field del campo price
  const priceInput = document.getElementById('price') // input field del campo price
  
  const productForm = new Product(
    nameInput.value,
    descriptionInput.value,
    brandInput.value,
    urlInput.value,
    priceInput.value,
  )

  console.log('PRODOTTO DA INVIARE ALLE API', productForm)

  let URL = 'https://striveschool-api.herokuapp.com/api/product/'
  let methodToUse = 'POST'

  if (productId) {
    URL = `https://striveschool-api.herokuapp.com/api/product/${productId}`
    methodToUse = 'PUT'
  }

 

  // Verifica se l'utente ha confermato l'eliminazione

  fetch(URL, {
    method: methodToUse,
    body: JSON.stringify(productForm), 
    headers: {
      'Content-type': 'application/json', 
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZGNkNjgxODQ0MjAwMTUzNzU4OWYiLCJpYXQiOjE3MTUzMzAyNjIsImV4cCI6MTcxNjUzOTg2Mn0.HzoKSqabmjuHCLy5nFws77BouB4WFCrQ3Bdj1xnhkvk",
    },
  })
    .then((response) => {
      if (response.ok) {
        // il concerto è stato salvato!
        alert(`Prodotto ${productId ? 'modificato' : 'creato'}!`)
        location.assign('index.html')
      } else {
        {
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
      }
    })
    .catch((err) => {
      console.log('ERRORE!', err)
      alert(`An error occurred: ${err.message}`);
    })
}

document.getElementById('product-form').addEventListener('submit', submitProduct)

if (productId) {
  let btnReset = document.getElementById("btn-reset");
  if (btnReset) {
    btnReset.addEventListener("click", function (event) {
      const msgConfirm = confirm(
        "Sei sicuro di voler resettare i campi del form?"
      );
      if (!msgConfirm) {
        event.preventDefault();
      }
    });
  }
}

