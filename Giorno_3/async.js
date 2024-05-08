// CODICE ASINCRONO IN JS
// JS è in linguaggio basato su un sistema ad eventi "non-blocking" -> l'esecuzione di JS non si ferma mai, e per sua natura
// NON attenderà la conclusione di un'operazione asincrona (come un timeout, una chiamta di rete etc.) prima di proseguire.

const countUntilThree = function () {
  setTimeout(function () {
    console.log('conto fino a 3...')
  }, 3000)
}

const pageStart = function () {
  countUntilThree()
  console.log('FINITO!')
}

// pageStart()

// 1) risolviamo questo problema con le callback
// una callback è una funzione passata come parametro ad un'altra funzione

const countUntilThreeWithCallback = function (nextCode) {
  // lavorare con le callbacks prevede che la funziona asincrona (countUntilThreeWithCallback) venga invocata GIÀ
  // con il pezzo di istruzione successivo da eseguire
  // perchè è solo lei (countUntilThreeWithCallback) che saprà quando sarà terminata
  console.log('conto fino a 3...')

  setTimeout(() => {
    nextCode()
  }, 3000)

  // più elegantemente potrebbe venire scritto anche così
  // setTimeout(nextCode, 3000)
}

const pageStartWithCallback = function () {
  countUntilThreeWithCallback(function () {
    // questo parametro rappresenta COSA FARE DOPO IL TERMINE DELL'OPERAZIONE ASYNC (il setTimeout)
    console.log('FINITO!')
  })
}

// pageStartWithCallback()

// 2) risolviamo ora il problema con una Promise

const countUntilThreeWithPromise = function () {
  return new Promise((resolve, reject) => {
    console.log('conto fino a 3...')
    // se invece dovessi anche gestire il caso in cui l'operazione asincrona NON finisca bene, dovrei in quel
    // caso invocare reject()
    reject('si è rotto il timeout')
    setTimeout(() => {
      // una volta che arrivo alla corretta conclusione della Promise, va invocato resolve()
      resolve()
      // così la Promise viene risolta
    }, 3000)
  })
}

// stiamo sempre risolvendo lo stesso problema: trovare un modo per CONCATENARE l'esecuzione di più blocchi di codice,
// tenendo in considerazione che se uno dei blocchi è un'operazione asincrona, in JS non è sufficiente inserire il blocco
// successiva nella riga dopo!
// con le Promise è possibile concatenare il codice successivo SENZA doverlo passare come parametro all'operazione async
// (come nelle callbacks), ma invece "aggiungendolo" nei blocchi .then() e .catch(), rispettivamente gestendo i due possibili
// esiti della operazione asincrona (positivo e negativo).

const pageStartWithPromise = function () {
  countUntilThreeWithPromise()
    .then(() => {
      // finirò qui dentro SE la Promise si è risolta!
      // e quindi qui dentro inserisco le cose da fare dopo
      console.log('FINITO!')
    })
    .catch((err) => {
      // qui dentro invece finiremmo se la Promise dovesse fallire
      console.log(err)
    })
}

pageStartWithPromise()
