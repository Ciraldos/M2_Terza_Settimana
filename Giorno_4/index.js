// riempie lo span "year"
document.getElementById('year').innerText = new Date().getFullYear()

// riempiamo la riga con gli eventi
// https://striveschool-api.herokuapp.com/api/agenda

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
    })
    .catch((err) => {
      console.log('ERRORE!', err)
    })
}

getEvents()
