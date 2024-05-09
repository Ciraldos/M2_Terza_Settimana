// carichiamo all'avvio immagini di GABBIANI
const loadImages = function (searchKeyword) {
  fetch('https://api.pexels.com/v1/search?query=' + searchKeyword, {
    headers: {
      Authorization: '67mbMRFEUxGRNdtE1VabPtNSD9BUJ5hax1x7R38UAM4kjocYqD7IHd2o',
    },
  })
    .then((response) => {
      console.log('RESPONSE PEXELS', response)
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('pexels rip')
      }
    })
    .then((data) => {
      // data.photos
      // troviamo tutte le immagini delle card
      const allTheCardImgs = document.querySelectorAll('.card img')
      // ciclo queste immagini
      allTheCardImgs.forEach((cardImg, i) => {
        cardImg.setAttribute('src', data.photos[i].src.medium)
        cardImg.addEventListener('click', function () {
          location.assign('details.html?imageId=' + data.photos[i].id)
        })
      })
      changeAll9mins(data.photos) // sostituisce i "9mins" con gli id delle foto
      // posso richiarmarla solo qua, perchè è qui che ho accesso a "data"
    })
    .catch((err) => {
      console.log('errore', err)
    })
}

loadImages('seagulls') // all'avvio cerchiamo gabbiani
// ora seleziono i due pulsanti e gli assegno un'invocazione di loadImages
// con ricerche diverse

const primaryButton = document.getElementsByClassName('btn-primary')[0]
const secondaryButton = document.getElementsByClassName('btn-secondary')[0]

primaryButton.addEventListener('click', () => {
  loadImages('snakes')
})

secondaryButton.addEventListener('click', () => {
  loadImages('crocodiles')
})

// troviamo tutti i bottoni "Edit" nella pagina
const allEditButtons = document.querySelectorAll(
  '.card .btn-group button:nth-of-type(2)'
) // il secondo bottone dentro ogni button group dentro ogni card
console.log('allEditButtons', allEditButtons)

const deleteCard = function (btn) {
  console.log(btn) // il tag button che ho cliccato
  const col = btn.closest('.col-md-4') // la colonna contenente quel bottone
  col.classList.add('invisible')
}

allEditButtons.forEach((btn) => {
  btn.innerText = 'Hide'
  btn.addEventListener('click', function (e) {
    deleteCard(e.target)
  })
})

const changeAll9mins = function (photos) {
  // trovo tutti i tag <small> con scritto "9 mins"
  const all9mins = document.querySelectorAll('small.text-muted')
  all9mins.forEach((small, i) => {
    small.innerText = photos[i].id
  })
}

// inizializziamo la funzione di ricerca custom
// seleziono l'input
const searchInput = document.getElementById('custom-search')
const searchButton = document.getElementById('search-button')

searchButton.addEventListener('click', function () {
  loadImages(searchInput.value)
})
