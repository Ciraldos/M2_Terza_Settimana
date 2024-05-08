
const generateBooks = function(array){
    const div = document.getElementById("div-cards")
    array.forEach((book)=>{
        const newDiv = document.createElement("div")
        newDiv.classList.add("col-3")
        newDiv.innerHTML = `
        <div class="card border border-3 mt-3">
            <div class="card-body">
                <div>
                    <img src="${book.img}" alt="logo" class="img-fluid">
                </div>
                <h5 class="card-title">Title: €${book.title}</h5>
                <h5 class="card-title">Price: €${book.price}</h5>
                <div class="text-center mt-3">
                    <button type="button" class="btn btn-success">Compra Ora</button>
                    <button type="button" class="btn btn-danger scarta-btn">Scarta</button>
                </div>
            </div>
        </div>
    `
    div.appendChild(newDiv)

    const scartaButton = newDiv.querySelector('.scarta-btn');
        scartaButton.addEventListener('click', function() {
            div.removeChild(newDiv);
        });
    })
}


const getBooks = function (){
    fetch(" https://striveschool-api.herokuapp.com/books")
    .then((response)=>{
        if (response.ok){
            console.log("Risposta ok", response)
            return response.json()
        } else {
             if (response.status === 404) {
              throw new Error('La risorsa richiesta non è stata trovata')
            } else if (response.status === 500) {
              throw new Error('La risposta del server è stata negativa') 
            }
          }
            
        })
        .then((arrayOfBooks)=>{
            console.log("Ho generato la lista dei libri", arrayOfBooks)
            generateBooks(arrayOfBooks)
        })
        .catch((error)=>{
            console.log("ERRORE", error)
        })
    }
    
getBooks()
