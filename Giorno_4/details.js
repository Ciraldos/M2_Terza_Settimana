// noi vogliamo recuperare i dettagli di UN SINGOLO EVENTO
// GET su "https://striveschool-api.herokuapp.com/api/agenda" -> TUTTI GLI EVENTI PRESENTI IN DB
// GET su "https://striveschool-api.herokuapp.com/api/agenda/_id" -> UN EVENTO IN PARTICOLARE

// all'avvio della pagina dettagli noi vogliamo caricare i dati FRESCHI del concerto in questione
// lo faremo con una GET molto specifica grazie all'_id del concerto che ci siamo passati nella barra degli indirizzi

const addressBarContent = new URLSearchParams(location.search) // isola i parametri nel contenuto della barra degli indirizzi
console.log(addressBarContent)
const eventId = addressBarContent.get('eventId')

const getEventData = function () {
  fetch(`https://striveschool-api.herokuapp.com/api/agenda/${eventId}`)
    // https://striveschool-api.herokuapp.com/api/agenda/663c94ccb1c77f00150684b6
    // una chiamata GET fatta così NON CI TORNA TUTTI GLI EVENTI, ma UNO nello specifico!
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Errore nel recupero dei dettagli dell'evento")
      }
    })
    .then((event) => {
      console.log('DETTAGLI RECUPERATI', event)
      // ora manipolo il DOM e riempio la card
      document.getElementById('name').innerText = event.name
      document.getElementById('description').innerText = event.description
      document.getElementById('time').innerText = event.time
      document.getElementById('price').innerText = event.price + '€'
    })
    .catch((err) => {
      console.log('ERRORE', err)
    })
}

getEventData()
