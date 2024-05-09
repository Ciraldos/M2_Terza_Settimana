// riempie lo span "year"
document.getElementById('year').innerText = new Date().getFullYear()

// riempiamo la riga con gli eventi
// https://striveschool-api.herokuapp.com/api/agenda

const generateConcertCards = function (concertsArray) {
  const row = document.getElementById('events-row')
  concertsArray.forEach((concert) => {
    const newCol = document.createElement('div')
    newCol.classList.add('col')
    newCol.innerHTML = `
      <div class="card h-100 d-flex flex-column">
        <img src="https://www.bibionebooking.com/images/galcms/2000x640c50q80/galleryone/gallery-live-concerts/zoom/img-live-concerts_39651.jpg" class="card-img-top" alt="...">
        <div class="card-body d-flex flex-column justify-content-around">
          <h5 class="card-title">${concert.name}</h5>
          <p class="card-text">${concert.description}</p>
          <p class="card-text">${concert.time}</p>
          <div class="d-flex justify-content-between">
            <button class="btn btn-primary">${concert.price}€</button>
            <a href="details.html?eventId=${concert._id}" class="btn btn-info">INFO</a>
          </div>
        </div>
      </div>
      `
    row.appendChild(newCol)
  })
}

const getEvents = function () {
  //  recuperiamo la lista di eventi attualmente nel database
  fetch('https://striveschool-api.herokuapp.com/api/agenda')
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
      generateConcertCards(array)
    })
    .catch((err) => {
      console.log('ERRORE!', err)
    })
}

getEvents()
