const imageId = new URLSearchParams(location.search).get('imageId')
console.log(imageId)

fetch('https://api.pexels.com/v1/photos/' + imageId, {
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
    console.log(data)
  })
  .catch((err) => {
    console.log('errore', err)
  })
