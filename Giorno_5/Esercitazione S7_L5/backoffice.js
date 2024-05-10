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
        throw new Error("Errore nel recupero dei dettagli del prodotto")
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
      console.log('ERRORE', err)
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
        // l'eliminazione della risorsa NON è andata a buon fine :(
        alert('ERRORE - RISORSA NON ELIMINATA')
      }
    })
    .catch((err) => {
      console.log('ERR', err)
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
  <button type="submit" class="btn btn-outline-light btn-primary me-2 id="btn-sub">Crea!</button>
  <button type="submit" class="btn btn-danger me-2" onclick="deleteProduct()" id="btn-delete">Elimina!</button>
  <button type="reset" class="btn btn-warning" id="btn-reset">Reset!</button>
  `

  console.log(document.getElementsByClassName('btn-primary')[0])
  // modifichiamo l'etichetta del bottone del form da "CREA!" a "MODIFICA!"
  document.getElementsByClassName('btn-primary')[0].innerText = 'MODIFICA!'
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
    // questo oggetto va indicato qualora l'operazione NON sia la default
    // già il fatto che opereremo una POST e non una GET fa in modo che questo secondo parametro vada dichiarato
    method: methodToUse,
    body: JSON.stringify(productForm), // il body in una request è SEMPRE UNA STRINGA
    headers: {
      'Content-type': 'application/json', // informiamo le API che (anche se in formato stringa) stiamo inviando un OGGETTO
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZGNkNjgxODQ0MjAwMTUzNzU4OWYiLCJpYXQiOjE3MTUzMzAyNjIsImV4cCI6MTcxNjUzOTg2Mn0.HzoKSqabmjuHCLy5nFws77BouB4WFCrQ3Bdj1xnhkvk",
      // se avessimo un'API protetta, in questo oggetto headers ci andrebbe anche l'autenticazione:
      // Authorization: 'Bearer xxxxxxxxx'
    },
  })
    .then((response) => {
      if (response.ok) {
        // il concerto è stato salvato!
        alert(`Prodotto ${productId ? 'modificato' : 'creato'}!`)
        location.assign('index.html')
      } else {
        // il concerto NON è stato salvato! -> andare nel network tab del browser e indagare lì
        console.log('Errore nel salvataggio della risorsa')
      }
    })
    .catch((err) => {
      console.log('ERRORE', err)
      alert(err)
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

