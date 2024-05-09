// il mio backender mi ha detto che un evento è un oggetto dotato di queste proprietà:
// name -> string
// description -> string
// price -> number | string
// time -> string (Date)

// occupiamoci di recuperare i dati del form nell'evento di submit
// e inviare una richiesta al backend per salvare il nostro nuovo concerto!

class Concert {
  constructor(_name, _description, _price, _time) {
    this.name = _name
    this.description = _description
    this.price = _price
    this.time = _time
  }
}

// !!!!!!!!
// ora la pagina di backoffice serve un DUPLICE scopo!
// 1) può CREARE una nuova risorsa (se l'indirizzo è solamente /backoffice.html)
// 2) può MODIFICARE una risorsa esistente (perchè siamo finiti qui cliccando sul tasto MODIFICA della pagina dettagli, quindi
// con un indirizzo tipo /backoffice.html?eventId=xxxxxxxxxxxxxxxxxxxx)

const addressBarContent = new URLSearchParams(location.search) // isola i parametri nel contenuto della barra degli indirizzi
const eventId = addressBarContent.get('eventId') // può esserci o può NON esserci!
console.log('EVENTID?', eventId)

let eventToModify

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
      // ora manipolo il DOM e riempio il form
      document.getElementById('name').value = event.name
      document.getElementById('description').value = event.description
      document.getElementById('price').value = event.price
      document.getElementById('time').value = event.time.slice(0, -1) // tolgo la "Z" dalla data creata a backend

      // salvo una copia di questo event in eventToModify
      eventToModify = event
    })
    .catch((err) => {
      console.log('ERRORE', err)
    })
}

if (eventId) {
  // sono arrivato nella pagina backoffice per modificare un concerto esistente!
  // devo ora RECUPERARE con una GET i dettagli esistenti dell'evento e ripopolare il form
  getEventData()
  // modifichiamo l'etichetta del bottone del form da "CREA!" a "MODIFICA!"
  document.getElementsByClassName('btn-primary')[0].innerText = 'MODIFICA!'
}

//
//
//
//

const submitEvent = function (e) {
  e.preventDefault()
  // recuperiamo dei riferimenti agli input del form
  const nameInput = document.getElementById('name') // input field del campo name
  const descriptionInput = document.getElementById('description') // input field del campo description
  const priceInput = document.getElementById('price') // input field del campo price
  const timeInput = document.getElementById('time') // input field del campo time

  const concertFromForm = new Concert(
    nameInput.value,
    descriptionInput.value,
    priceInput.value,
    timeInput.value
  )

  console.log('CONCERTO DA INVIARE ALLE API', concertFromForm)

  // ora inviamo questo concerto alle API per salvarlo permanentemente in DB
  // dovremo inviare una REQUEST (fetch) però con method 'POST' (NON GET!)

  // l'indirizzo sul quale opererete la POST (se utilizzate delle API RESTful) è IDENTICO all'indirizzo su cui
  // operereste la GET

  // !!!!!!!!
  // submitEvent deve fare cose diverse a seconda che il backoffice stia venendo utilizzato per CREARE o MODIFICARE!
  // se siamo in modalità "MODIFICA" (cioè se abbiamo un eventId) dobbiamo fare una PUT invece di una POST
  // e l'URL deve avere /_id

  let URL = 'https://striveschool-api.herokuapp.com/api/agenda'
  let methodToUse = 'POST'

  if (eventId) {
    URL = `https://striveschool-api.herokuapp.com/api/agenda/${eventToModify._id}`
    methodToUse = 'PUT'
  }

  fetch(URL, {
    // questo oggetto va indicato qualora l'operazione NON sia la default
    // già il fatto che opereremo una POST e non una GET fa in modo che questo secondo parametro vada dichiarato
    method: methodToUse,
    body: JSON.stringify(concertFromForm), // il body in una request è SEMPRE UNA STRINGA
    headers: {
      'Content-type': 'application/json', // informiamo le API che (anche se in formato stringa) stiamo inviando un OGGETTO
      // se avessimo un'API protetta, in questo oggetto headers ci andrebbe anche l'autenticazione:
      // Authorization: 'Bearer xxxxxxxxx'
    },
  })
    .then((response) => {
      if (response.ok) {
        // il concerto è stato salvato!
        alert(`Concerto ${eventId ? 'modificato' : 'creato'}!`)
      } else {
        // il concerto NON è stato salvato! -> andare nel network tab del browser e indagare lì
        throw new Error('Errore nel salvataggio della risorsa')
      }
    })
    .catch((err) => {
      console.log('ERRORE', err)
      alert(err)
    })
}

document.getElementById('event-form').addEventListener('submit', submitEvent)

// METODI CRUD
// GET su /agenda -> recupera TUTTI GLI EVENTI
// GET su /agenda/_id -> recupera UN EVENTO dotato di quell'id
// POST su /agenda -> crea un evento nuovo
// PUT su /agenda/_id -> modifica un evento esistente
// DELETE su /agenda/_id -> elimina un evento esistente
