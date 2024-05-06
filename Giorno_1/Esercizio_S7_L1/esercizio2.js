
const pName = document.getElementById('petName')
const oName = document.getElementById('ownerName')
const sName = document.getElementById('species')
const bName = document.getElementById('breed')
const formTag = document.getElementsByTagName('form')[0]
const pets = []



class Pet {
    constructor  (_petname, _ownerName, _species, _breed){
    this.petname = _petname;
    this.ownerName = _ownerName;
    this.species = _species;
    this.breed = _breed;
    }
    checkOwner(other){
        if(this.ownerName===other.ownerName){
            return true
        }else{
            return false
        }
    }
}

const updatePets = function (){
    const petsRow = document.getElementById("pets-row")
    petsRow.innerHTML=""
    pets.forEach((pet) =>{
        const newDiv = document.createElement("div")
        newDiv.classList.add("col")
        newDiv.innerHTML = `
        <div class="card border border-3">
            <div class="card-body">
                <h5 class="card-title">${pet.petname}</h5>
                <h5 class="card-title">${pet.ownerName}</h5>
                <h5 class="card-title">${pet.species}</h5>
                <h5 class="card-title">${pet.breed}</h5>
            </div>
        </div>
    `
    petsRow.appendChild(newDiv)
    })   
}

formTag.addEventListener('submit', function (e) {
    e.preventDefault()
    const petFromFormValues = new Pet(
      pName.value,
      oName.value,
      sName.value,
      bName.value,
    )
    pets.push(petFromFormValues)
  
    console.log('CONTATTO CREATO', petFromFormValues)
    pName.value = ""
      oName.value = ""
      sName.value=""
      bName.value=""  
    updatePets()
  })
