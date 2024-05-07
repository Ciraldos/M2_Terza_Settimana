// riempio il footer con l'anno corrente
const currentYear = new Date().getFullYear()
document.getElementById('year').innerText = currentYear

const textAreaTag = document.getElementById('content')

// 2 modi di assegnare una funzione ad un button
// 1) tramite "onclick" via HTML, vedi index.html
const save = function () {
  console.log('premuto salva!')
  // quello che vogliamo fare è prelevare il contenuto della textarea e salvarlo come stringa nel localStorage
  // a) prelevo il contenuto della textarea

  const textAreaContent = textAreaTag.value
  console.log(textAreaContent)
  // b) lo salvo nel localStorage
  localStorage.setItem('notepad-content', textAreaContent) // niente JSON.stringify(), è già una stringa!

  // abilito il pulsante carica
  toggleLoadButton('enable')
}
// 2) via JS, selezionado il bottone e operando un addEventListener di "click"

const load = function () {
  console.log('premuto carica!')
  // a) recuperiamo dal localStorage il valore di 'notepad-content'
  const savedValue = localStorage.getItem('notepad-content')
  // e rimettiamolo nella textarea
  textAreaTag.value = savedValue
}

const loadButton = document
  .getElementsByClassName('btn-info')[0]
  .addEventListener('click', load)

const toggleLoadButton = function (str) {
  if (str === 'enable') {
    document.getElementsByClassName('btn-info')[0].removeAttribute('disabled')
  } else {
    document
      .getElementsByClassName('btn-info')[0]
      .setAttribute('disabled', true)
  }
}

// evitiamo di rendere cliccabile il bottone "CARICA" se il localStorage non contiene una chiave "notepad-content"
if (localStorage.getItem('notepad-content')) {
  // il bottone è disabilitato di default
  // ma se siamo entrati in questo if vuol dire che ABBIAMO un contenuto caricabile!
  // ...quindi TOGLIAMO l'attributo disabled dal pulsante CARICA
  toggleLoadButton('enable')
}

const deleteMemory = function () {
  // devo:
  // 1) elimina la chiave 'notepad-content' dal localStorage
  localStorage.removeItem('notepad-content')
  // 2) ri-disabilita il pulsante CARICA
  toggleLoadButton('disable')
}
