// Le WebStorage API nascono con la standardizzazione di HTML5, al fine di migliorare una tecnologia esistente (cookie).
// Migliorano i cookie superando le loro due principali limitazioni:
// 1) I cookie possono memorizzano fino a 4KB di dati (localStorage è limitato invece a 5MB)
// 2) I cookie non possedevano il concetto di "sessione"

// La soluzione è stata introdurre due nuove tecnologie per la memorizzazione dei dati in locale nel browser, a breve/medio
// termine:
// a) localStorage (che mmorizza i dati fino alla loro esplicita eliminazione)
// b) sessionStorage (che permane solamente per la durata della "sessione", quindi si autodistrugge quando chiudete il tab/browser)

// localStorage e sessionStorage memorizzano informazioni separatamente per ogni dominio, sono completamente esposti all'utente
// (per di più in chiaro)

// nonostante localStorage e sessionStorage siano tecnologie separate, con spazi di memorizzazione dedicati per ogni browser
// i metodi per interagirvi sono sempre gli stessi e sono i seguenti:

// - setItem(key, value) -> salva nel motore selezionato una coppia chiave/valore, sotto formato STRINGA
// - getItem(key) -> ritorna il value di una coppia salvata nel motore selezionato
// - removeItem(key) -> elimina la coppia chiave valore tramite la chiave esplicitata
// - clear() -> elimina interamente il contenuto del motore selezionato per il dominio corrente

// DISCLAIMER: ricordiamoci che queste tecnologie di storage sono IN CHIARO e COMPLETAMENTE ESPOSTE agli utenti!
// è il caso di NON salvarci dentro informazioni preziose, confidenziali, pw etc.

localStorage.setItem('myName', 'Stefano')
// setto nel localStorage una coppia chiave/valore "myName: Stefano"

const showName = localStorage.getItem('myName') // 'Stefano'
document.getElementById('main-title').innerText = showName
// mostro nella pagina all'interno dell'<h1> il contenuto della chiave "myName" salvata precedentemente in localStorage

localStorage.setItem('myNumber', 100) // setto un NUMERO nel localStorage

const maybeANumber = localStorage.getItem('myNumber')
// '100'
console.log(maybeANumber + 50) // -> '100' + 50 --> '10050'

console.log(parseInt(localStorage.getItem('myNumber')))

localStorage.setItem('myBool', true) // "true"
console.log(typeof localStorage.getItem('myBool'))

// OGGETTO
localStorage.setItem('myObj', { dog: 'Fufy' }) // ?? "[object Object]"
// ARRAY
localStorage.setItem('myArr', [{ dog: 'Fufy' }]) // ?? "[object Object]"

// -> non è possibile nativamente salvare entità complesse (array e/o oggetti) dentro il localStorage
// è però possibile "stringhifizzare" correttamente un array o un oggetto utilizzando JSON.stringify()
localStorage.setItem('correctObj', JSON.stringify({ dog: 'Fufy' })) // '{"dog": "Fufy"}'
localStorage.setItem('correctArr', JSON.stringify([{ dog: 'Fufy' }])) // ?? "[{"dog": "Fufy"}]"

console.log(JSON.parse(localStorage.getItem('correctObj')).dog)

localStorage.setItem('testBoolean', JSON.stringify(false))
console.log(JSON.parse(localStorage.getItem('testBoolean')))

localStorage.removeItem('correctArr') // elimina la coppia con chiave "correctArr" nel localStorage
// localStorage.clear() // piallo tutto!
