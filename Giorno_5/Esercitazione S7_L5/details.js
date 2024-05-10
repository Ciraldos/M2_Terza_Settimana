// noi vogliamo recuperare i dettagli di UN SINGOLO EVENTO
// GET su "https://striveschool-api.herokuapp.com/api/agenda" -> TUTTI GLI EVENTI PRESENTI IN DB
// GET su "https://striveschool-api.herokuapp.com/api/agenda/_id" -> UN EVENTO IN PARTICOLARE

// all'avvio della pagina dettagli noi vogliamo caricare i dati FRESCHI del concerto in questione
// lo faremo con una GET molto specifica grazie all'_id del concerto che ci siamo passati nella barra degli indirizzi

const addressBarContent = new URLSearchParams(location.search) // isola i parametri nel contenuto della barra degli indirizzi
console.log(addressBarContent)
const productId = addressBarContent.get('productId')

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
        throw new Error("Errore nel recupero dei dettagli dell'evento")
      }
    })
    .then((product) => {
      console.log('DETTAGLI RECUPERATI', product)
      // ora manipolo il DOM e riempio la card
      document.getElementById('name').innerText = product.name
      document.getElementById('description').innerText = product.description
      document.getElementById('brand').innerText = product.brand
      document.getElementById('imgProduct').setAttribute("src", product.imageUrl) 
      document.getElementById('price').innerText = "€ " + product.price 
    })
    .catch((err) => {
      console.log('ERRORE', err)
    })
}

getProductData()

