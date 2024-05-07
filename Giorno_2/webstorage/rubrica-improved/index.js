// utilizziamo il form per creare dei contatti
// prima cosa: prendiamo i riferimenti nel DOM dei vari input
// campo nome
const nameInput = document.getElementById('name')
// campo telefono
const phoneInput = document.getElementById('phone')
// checkbox preferiti
const favCheckbox = document.getElementById('favourite')
// riferimento generico al form
const formTag = document.getElementsByTagName('form')[0]

// creiamo ora l'array che memorizzerà i nostri contatti
let contacts = []

// classe Contact
class Contact {
  constructor(_name, _phone, _fav) {
    this.name = _name
    this.phone = _phone
    this.fav = _fav
  }
}

const updateContacts = function () {
  // prendo un riferimento alla riga dove sono contenute le colonne
  const contactsRow = document.getElementById('contacts-row')
  // prima della creazione delle cards dovrà svuotare i contenuti esistenti
  contactsRow.innerHTML = ''
  // adesso, per ogni elemento di contacts, creo una colonna con dentro il contatto
  contacts.forEach((contact) => {
    // cosa faccio con ogni contatto?
    // creo un div vuoto
    const newDiv = document.createElement('div') // <div></div>
    // rendiamo questo div una col di bootstrap
    newDiv.classList.add('col')
    // riempio newDiv con una card
    newDiv.innerHTML = `
        <div class="card${
          contact.fav ? ' border border-success border-3' : ''
        }">
            <div class="card-body">
                <h5 class="card-title">${contact.name}</h5>
                <h5 class="card-title">${contact.phone}</h5>
                <button class="btn btn-danger" onclick="deleteCard(event)">ELIMINA</button>
            </div>
        </div>
    `
    // appendo ora la col alla row
    contactsRow.appendChild(newDiv)
  })
}

const deleteCard = function (e) {
  console.log('ELIMINO CARD', e)
  // come faccio a capire QUALE degli n bottone elimina mi ha portato qui? devo capire QUALE card eliminare...
  // e.target sarà il bottone che abbiamo cliccato
  console.log(e.target.closest('.card'))
  // eliminiamo dal DOM la card
  e.target.closest('.col').remove() // rimuove la card dalla pagina
  // aggiorniamo il localStorage, così al riavvio sucessivo la card non si ri-genererà da capo
  // riprendiamo l'array dal localStorage
  const arrayFromLocalStorage = JSON.parse(localStorage.getItem('contacts'))
  // filtriamo ora l'array rimuovendo l'elemento che abbiamo deciso di eliminare
  const filteredArray = arrayFromLocalStorage.filter((contact) => {
    return (
      contact.name !==
      e.target.closest('.card').querySelector('.card-title').innerText
    )
  })
  localStorage.setItem('contacts', JSON.stringify(filteredArray))
}

// ora occupiamoci dell'evento di submit del form
formTag.addEventListener('submit', function (e) {
  e.preventDefault() // NON aggiornare la pagina e perdere i dati
  // ora posso scrivere le mie istruzioni
  // voglio creare un oggetto a partire da una classe
  // con i dati provenienti dal form
  const contactFromFormValues = new Contact(
    nameInput.value,
    phoneInput.value,
    favCheckbox.checked
    // "checked" nelle checkboxes è true/false
  )

  // aggiungere contactFromFormValues ai contatti correnti
  contacts.push(contactFromFormValues)

  // ora dovrei anche occuparmi di salvare una copia dell'array contacts aggiornato nel localStorage
  // localStorage.setItem('contacts', contacts) // [object Object] :(((
  localStorage.setItem('contacts', JSON.stringify(contacts)) // :)

  console.log('CONTATTO CREATO', contactFromFormValues)
  // azzeriamo il form
  nameInput.value = ''
  phoneInput.value = ''
  favCheckbox.checked = false

  // aggiorniamo la riga con le colonne con un nuovo elemento per il mio nuovo contatto
  updateContacts()
})

// queste righe sono al di fuori delle funzioni, verranno eseguite all'avvio
// recupero l'array di contatti dal localStorage
const contactsFromLocalStorage = JSON.parse(localStorage.getItem('contacts'))
console.log(contactsFromLocalStorage)

// utilizzare questo contenuto come valore iniziale dell'array contacts, che normalmente parte da [ ]
if(contactsFromLocalStorage){
contacts = contactsFromLocalStorage // abbiamo anche reso contacts un "let", perchè ora dobbiamo riassegnarne il valore!
}
updateContacts() // svuota la riga con le card, cicla l'array contacts (che adesso non parte più da array vuoto) e genera le col
