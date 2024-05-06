console.log('la funzione costruttore (o constructor in ENG)')

// la funzione constructor permette una facile creazione IN SERIE di oggetti dotati delle stesse proprietà e caratteristiche

const person = {
  firstName: 'Mario',
  lastName: 'Bros',
  address: 'Mushroom Kingdom',
  email: 'mariobros@nintendo.com',
  greet: function () {
    return `wa-hoo! io mi chiamo ${this.firstName} ${this.lastName}`
  },
}

// se mi trovassi a dover "generalizzare" la struttura di quest'oggetto al fine di poterne creare delle "copie" in serie
// invece di copiare/incollare e cambiarne i valori, esiste un metodo migliore: creare una FUNZIONE COSTRUTTORE
// (sempre secondo il principio DRY (don't repeat yourself))

const Person = function () {
  // camelCase viene utilizzato per le normali funzioni e metodi
  // PascalCase viene utilizzato per le funzioni costruttore
  // this è un riferimento all'ISTANZA generata dalla funzione costruttore: il gatto che esce dalla fabbrica di gatti
  this.firstName = ''
  this.lastName = ''
  this.address = ''
  this.email = ''
  this.greet = function () {
    return `wa-hoo! io mi chiamo ${this.firstName} ${this.lastName}`
  }
}

const luigi = new Person()
// abbiamo creato luigi, un OGGETTO dotato delle proprietà firstName, lastName, address, email e del metodo greet()
console.log('LUIGI', luigi)
luigi.firstName = 'Luigi'
luigi.lastName = 'Bros'
luigi.address = 'Mushroom Kingdom'
luigi.email = 'luigibros@nintendo.com'
console.log(luigi.greet())
console.log(luigi)

// funziona! però questo approccio di obbliga a invocare la funzione costruttore per creare un "guscio" vuoto,
// e dopo dover andare a sovrascrivere manualmente tutte le proprietà!
// sarebbe bello poter creare un oggetto GIÀ con tutti i valori al loro posto...

// ...creiamo ora una funzione costruttore "più furba",, che accetterà dei parametri nella sua invocazione

const NamedPerson = function (_firstName, _lastName, _address, _email) {
  this.firstName = _firstName
  this.lastName = _lastName
  this.address = _address
  this.email = _email
  this.greet = function () {
    return `wa-hoo! io mi chiamo ${this.firstName} ${this.lastName}`
  }
}

const toad = new NamedPerson(
  'Toad',
  'Toadstool',
  'Mushroom Kingdom',
  'toad@nintendo.com'
)

console.log('toad', toad)

const wario = new NamedPerson(
  'Wario',
  'Bros',
  'Mushroom Kingdom',
  'wario@nintendo.com'
)

console.log('wario', wario)

const NamedPersonWithRealAddress = function (
  _firstName,
  _lastName,
  _street,
  _country,
  _email
) {
  this.firstName = _firstName
  this.lastName = _lastName
  this.address = {
    street: _street,
    country: _country,
  }
  this.email = _email
  this.greet = function () {
    return `wa-hoo! io mi chiamo ${this.firstName} ${this.lastName}`
  }
}

const bowser = new NamedPersonWithRealAddress(
  'Bowser',
  'Koopa',
  'Inferno st.',
  'World 8',
  'bowser@nintendo.com'
)

console.log(bowser)

// JS da sempre ha utilizzato le funzioni costruttore per generare, tramite il proprio sistema di ereditarietà basato sui
// prototipi, degli oggetti "predefiniti" fatti in un determinato modo
// passano gli anni, e il web diventa sempre più popolare, e JS diventa sempre più famoso!
// gli sviluppatori dei linguaggi più OOP vorrebbero saltare a bordo, ma si trovano un po' frenati dall'approccio
// ereditario di JS basato sui prototipi, fondamentalmente diverso dall'approccio basato sulle classi...
// allora JS, evolvendosi, introduce tra le proprie funzionalità la keyword "class", che funziona sostanzialmente
// come i costruttori dei linguaggi OOP, pur però mantenendo di base l'ereditarietà a prototipi di JS
// è stata un cosiddetto "SUGAR COATING" delle funzioni costruttore
