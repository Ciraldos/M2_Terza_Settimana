// le classi in JS sono un metodo ALTERNATIVO per la creazione di funzioni costruttore
// lo scopo è sempre il medesimo: creare in modo robusto molti oggetti dello stesso tipo in serie

class NamedPerson {
  constructor(_firstName, _lastName, _address, _email) {
    // l'assegnazione dei valori dai parametri alle proprietà dell'oggetto è identica
    // la funzione constructor di fatto ci permette di attingere ai parametri utilizzati per l'invocazione della classe
    // questo significa che se una proprietà dell'oggetto deve venire inizializzata tramite uno di questi parametri,
    // dovete scriverla qua!
    this.firstName = _firstName
    this.lastName = _lastName
    this.address = _address
    this.email = _email
  }

  // qui NON AVETE più accesso ai parametri del costruttore!
  // qui invece potete definire delle proprietà con un valore fisso!
  numberOfLegs = 2
  greet = function () {
    return `wa-hoo! io mi chiamo ${this.firstName} ${this.lastName}`
  }
}

const mario = new NamedPerson(
  'Mario',
  'Bros',
  'Mushroom Kingdom',
  'mariobros@nintendo.com'
)

// mario ora ha 6 proprietà: 4 il cui valore deriva dai parametri, firstName, lastName, address, email e due "fisse": numberOfLegs e greet()
console.log('mario', mario)

// tramite il costrutto "class" è possibile in JS riutilizzare classi precedentemente create al fine di espanderle
// per facilitare la creazione di ulteriori "sottovarianti" dell'oggetto originale

class Computer {
  constructor(_brand) {
    // accetto nell'inizializzazione dell'oggetto Computer un brand, ovvero la marca del computer
    this.brand = _brand
  }

  keyboard = 'Italian'

  static internalId = '05739823'
  // "internalId" è una proprietà STATICA di Computer
  // una proprietà statica NON viene trasmessa nelle istanze generate da Computer

  showBrand() {
    return `Io sono un computer di marca ${this.brand}`
  }
}

const c1 = new Computer('Apple')
console.log('C1', c1)
console.log(c1.showBrand()) // 'Io sono un computer di marca Apple'
const c2 = new Computer('Microsoft')

console.log(Computer.internalId) // '05739823'

// in JS, come in praticamente TUTTI i linguaggi OOP, le classi possono essere ESTESE

class ComputerWithModel extends Computer {
  // ora creo una classe NON da zero, ma partendo già da quello che era un Computer
  // questo mi permette di riciclare codice vecchio --> D R Y
  // ComputerWithModel viene definita SOTTOCLASSE di Computer
  // Computer, per ComputerWithModel, è la sua SUPERCLASSE
  // per merito dell'extends, ogni ComputerWithModel erediterò TUTTI i metodi e le proprietà già definiti in Computer
  constructor(_brand, _model) {
    // this.brand = _brand <-- non lo voglio riscrivere!
    // quello che dovrei fare, prima di tutto, è creare un Computer...
    // ...poi lo estenderò con anche il modello
    // per cominciare INVOCO il constructor della superclasse (Computer)
    super(_brand) // super è come se fosse Computer.constructor()
    // ora mi è arrivata come per magia la proprietà brand!
    this.model = _model
  }

  showModel() {
    return super.showBrand() + ', il mio modello è ' + this.model
    // 'Io sono un computer di marca Apple, il mio modello è Macbook pro'
  }
}

const c3 = new ComputerWithModel('Apple', 'Macbook Pro')
console.log('C3', c3)
console.log(c3.showBrand())
console.log(c3.showModel())

class ComputerWithColor extends ComputerWithModel {
  constructor(_brand, _model, _color) {
    super(_brand, _model)
    this.color = _color
  }
}

const c4 = new ComputerWithColor('Microsoft', 'Surface Pro 9', 'black')
console.log(c4)
