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

// creo la funzione per generare la lista
const generateList = function (users) {
  // prendo un riferimento alla UL
  const list = document.getElementById('users-list')
  arrayOfUsers.forEach((user) => {
    // per ogni utente...
    // creo un <li></li>
    const newLi = document.createElement('li')
    // gli aggiungo le classi necessarie di BS
    newLi.classList.add('list-group-item')
    // aggiungo all'li il contenuto
    newLi.innerText = `${user.name} - ${user.phone}`
    // il <li> è pronto!
    // lo appendo alla lista
    list.appendChild(newLi)
  })
}

// creiamo una funzione che opererà una fetch da JSONPlaceholder (cioè che inizializzerà una REQUEST)
const getUsers = function () {
  fetch('https://jsonplaceholder.typicode.com/users', {
    // questo secondo parametro serve a definire eventuali proprietà aggiuntive
    // method: 'GET' // è il default!
    // body: // non c'è perchè stiamo facendo una GET
    // l'autenticazione NON c'è perchè JSONPlaceholder è un sito free
    // ...abbiamo capito che questo oggetto di configurazione in questo caso non servirerebbe proprio!
  })
    .then((response) => {
      // lieto fine! il server ci ha risposto!
      // occhio che finite nel .then() anche in caso di 400, 404, 500 etc.
      if (response.ok) {
        console.log('LIETO FINE!', response)
        // in questo modo siamo sicuri non solo di aver ottenuto una risposta ma che anche lo status code della risposta
        // appartiene alla famiglia dei 200

        // io vorrei creare una lista di utenti a partire dall'array di utenti ottenuto dalla risposta
        // dove trovo l'array di utenti?
        // l'array di oggetti è il PAYLOAD della Response
        // come lo tiro fuori dalla response?
        return response.json() // "jsonifizza" la response, tornandone il body dentro una Promise
        // se il server tornasse puramente una stringa, potremmo recuperarla con response.text()
      } else {
        // finiamo qui quando abbiamo ottenuto una risposta ma lo status code è es. 400, 401, 404, 500, ecc.
        // nel caso finissimo qui, la cosa giusta da fare è auto-lanciarsi nel blocco catch
        if (response.status === 404) {
          throw new Error('La risorsa richiesta non è stata trovata')
        } else if (response.status === 500) {
          throw new Error('La risposta del server è stata negativa') // creo un errore e sollevo un'eccezione
        }
      }
    })
    .then((arrayOfUsers) => {
      console.log(
        'Ho estratto il body dalla Response! Ecco il risultato:',
        arrayOfUsers
      )
      // a questo punto, dentro questo blocco then ho accesso ai dati remoti
      // ora manipolo il DOM
      generateList(arrayOfUsers) // passo arrayOfUsers ad una funzione che si occuperà di manipolare il DOM e
      // creare i list-items sulla base dei miei utenti
    })
    .catch((err) => {
      // bad ending!
      // c'è stato un errore e non siamo riusciti a contattare il server!
      // abbiamo internet? il server va a fuoco?
      console.log('ERRORE', err)
    })
}

getUsers()
