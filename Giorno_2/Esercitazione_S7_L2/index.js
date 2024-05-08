const input = document.getElementById("content");

const save = function(){
    console.log("Premuto")
   const inputValue=input.value;
    localStorage.setItem("text-content", inputValue)
}

const deleteMemory = function(){
    console.log("Premuto")
    localStorage.removeItem("text-content")
    input.value=""
}

window.onload = function() {
    const savedText = localStorage.getItem("text-content");
    if (savedText) {
        input.value = savedText;
    }
};

//contatore
var contatore = sessionStorage.getItem("contatore");

// Funzione per aggiornare il contatore e mostrare il tempo trascorso
 function aggiornaContatore() {
    contatore++; // Incrementa il contatore
    document.getElementById("contatore").innerHTML = contatore + " secondi"; // Mostra il tempo trascorso
    sessionStorage.setItem("contatore", contatore); // Salva il valore del contatore nella sessionStorage
}

// Avvia il contatore
setInterval(aggiornaContatore, 1000);