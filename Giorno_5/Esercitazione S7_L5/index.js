

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
          <div class="d-flex justify-content-around">
            <button class="btn btn-info btn-outline-dark shadow-sm">${product.price}€</button>
            <a class="btn btn-warning btn-outline-dark shadow-sm" href="backoffice.html?productId=${product._id}" id="edit-button">MODIFICA</a>
            <a class="btn btn-outline-dark btn-warning shadow-sm" href="details.html?productId=${product._id}">INFO!</a>
          </div>
        </div>
      </div>
      `
      row.appendChild(newCol)
  })
}

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
        throw new Error('Errore nella risposta del server')
      }
    })
    .then((array) => {
      console.log('ARRAY!', array)
      // creiamo le card per la landing page
      generateProductCards(array)
    })
    .catch((err) => {
      console.log('ERRORE!', err)
    })
}

getEvents()
