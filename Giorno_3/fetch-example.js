// :)
// Il metodo fetch() inizializza una REQUEST dal nostro browser.
// fetch(), se tutto va bene, ritornerà la RESPONSE ottenuta dal server; attenzione però, la ritornerà circondata da una PROMISE.

// come funziona fetch()?
// fetch può accettare fino a DUE parametri (il primo è obbligatorio, il secondo no)
// parametri:
// 1) URL da contattare (stringa)
// 2) un oggetto di configurazione, che serve a specificare il metodo, il payload, gli headers etc.

// METODI HTTP:
// - GET -> recupera dati (default)
// - POST -> crea un nuovo dato
// - PUT -> modifica un dato che esiste già
// - DELETE -> elimina un dato che esiste già

// creiamo una funzione che opererà una fetch da JSONPlaceholder (cioè che inizializzerà una REQUEST)
const getUsers = function () {
  fetch('https://jsonplaceholder.typicode.com/users', {
    // questo secondo parametro serve a definire eventuali proprietà aggiuntive
    // method: 'GET' // è il default!
    // body: // non c'è perchè stiamo facendo una GET
    // l'autenticazione NON c'è perchè JSONPlaceholder è un sito free
    // ...abbiamo capito che questo oggetto di configurazione in questo caso non servirerebbe proprio!
  })
    .then(() => {
      // lieto fine! il server ci ha risposto!
      console.log('LIETO FINE!')
    })
    .catch(() => {
      // bad ending!
      // c'è stato un errore e non siamo riusciti a contattare il server!
      // abbiamo internet? il server va a fuoco?
      console.log('ERRORE')
    })
}

getUsers()
