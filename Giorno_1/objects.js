// in JS è possibile creare un oggetto "al volo", tramite la cosiddetta "notazione letterale" (dopo l'uguale si aprono le graffe)
const dog = {
  // un oggetto è una collezione di coppie chiave: valore
  // una coppia che contiene un'informazione è detta PROPRIETÀ
  name: 'Fido',
  furColors: ['black', 'brown'],
  // ma una coppia può anche contenere come valore una FUNZIONE, che va a definire il COMPORTAMENTO dell'oggetto
  // questi sono detti METODI
  bark: function () {
    return 'bau'
  },
}

console.log(dog.name) // 'Fido'
console.log(dog.furColors[1]) // 'brown'
console.log(dog.bark()) // 'bau'

console.log(dog.__proto__) // Object, ovvero il prototipo JS da cui parte la creazione di qualsiasi oggetto

const person = {
  firstName: 'Stefano',
  lastName: 'Casasola',
  teach: function () {
    // se create un metodo dentro un oggetto, tipicamente "this" punterà a quell'oggetto
    console.log(this)
    // attenzione! se create questo metodo con una funzione freccia, "this" NON punterà più all'oggetto person!
    // una differenza tra le funzioni "normali" e le funzioni freccia, riguarda il significato della parola "this"
    // normalmente le funzioni tradizionali hanno un proprio contesto di esecuzione e assegnano "this" all'oggetto
    // in cui sono contenute... ma una funzione freccia invece NON possiede un proprio contesto di esecuzione, e di
    // conseguenza "eredita" il this dall'ambiente circostante
    // return 'Io mi chiamo ' + this.firstName + ' e insegno JS'
    return `Io mi chiamo ${this.firstName} e insegno JS`
  },
}
// TIPICAMENTE, i metodi di un oggetto sono costruiti con funzioni "classiche" (NON con le funzioni a freccia),
// in modo da mantenere correttamente il riferimento a "this"

console.log(person.teach()) // 'Io mi chiamo Stefano e insegno JS'

// LIMITAZIONI DI JS

const cat1 = {
  name: 'Fufy',
  breed: 'Siamese',
  meow: function () {
    return 'MAO'
  },
}

const cat2 = {
  name: 'Pippo',
  breed: 'European',
  meow: function () {
    return 'MAO'
  },
}

// ...

const cat43 = {
  name: 'Tom',
  bred: 'Certosino', // errore di battitura
  meows: function () {
    // errore di battitura
    return 'MAO'
  },
}

// sarebbe stato comodo avere una "fabbrica" di oggetti di tipo "cat", in questo modo non avremmo sicuramente
// fatto questi stupidi errori di distrazione/battitura

// anche in JS (come anche in altri linguaggi più "strutturati" e orientati agli oggetti) esiste la possibilità
// di automatizzare la creazione di oggetti "in serie", tramite una "fabbrica" (o stampino, o progetto, etc.)
// bisogna prendere dimestichezza con una "FUNZIONE COSTRUTTORE", ovvero delle funzioni che creeranno OGGETTI in serie!

// proseguiamo su constructor.js
