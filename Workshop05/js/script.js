// WS05 student starter / opiskelijan aloituspohja
// Complete the TODOs. This file is intentionally unfinished.
// Täydennä TODO-kohdat. Tämä tiedosto on tarkoituksella keskeneräinen.

const animalForm = document.getElementById("animalForm");
const animalName = document.getElementById("animalName");
const animalSpecies = document.getElementById("animalSpecies");
const careNote = document.getElementById("careNote");
const nameError = document.getElementById("nameError");
const speciesError = document.getElementById("speciesError");
const noteError = document.getElementById("noteError");
const formResult = document.getElementById("formResult");

// Exercises 1 and 3 / Harjoitukset 1 ja 3
animalForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // TODO: Clear previous errors / Tyhjennä edelliset virheet.
    // TODO: Read and trim values / Lue ja trimmaa kenttien arvot.
    // TODO: Validate and show errors / Validoi ja näytä virheet.
    // TODO: If valid, show the result / Näytä hyväksytty tulos.
    // TODO: Create { name, species, note } and save it as JSON.
    // TODO: Luo { name, species, note } ja tallenna se JSON-tekstinä.

nameError.textContent = "";
speciesError.textContent = "";
noteError.textContent = "";
formResult.textContent = "";    


const nameVal = animalName.value.trim();
const speciesVal = animalSpecies.value.trim();
const noteVal = careNote.value.trim();


let isValid = true;
if (nameVal === "") {
        nameError.textContent = "Name cannot be empty.";
        isValid = false;

}

if (speciesVal === "") {
        speciesError.textContent = "Species cannot be empty.";
        isValid = false;
}

if (noteVal.length < 1 || noteVal.length > 150) {
        noteError.textContent = "Note must be between 1 and 150 characters.";
        isValid = false;
}

if (isValid) {
        formResult.textContent = `Success! Added ${nameVal} (${speciesVal}).`;
        
const animalObj = {
        name: nameVal,
        species: speciesVal,
        note: noteVal
    };

        localStorage.setItem("ws05Animal", JSON.stringify(animalObj));
        animalForm.reset();
        loadAnimal(); 
    }
});





// Exercise 2 / Harjoitus 2
const sponsorForm = document.getElementById("sponsorForm");
const animalType = document.getElementById("animalType");
const yearsInput = document.getElementById("years");
const cost = document.getElementById("cost");
const discountMessage = document.getElementById("discountMessage");

sponsorForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // TODO: Convert input values with Number().
    // TODO: Muunna syötteet numeroiksi Number()-funktiolla.
    // TODO: Calculate the price and apply discounts.
    // TODO: Laske hinta ja alennukset.
    // TODO: Show the result / Näytä tulos.

const fee = Number(animalType.value);
const years = Number(yearsInput.value);

if (years < 1) {
        cost.textContent = "Please enter at least 1 year.";
        discountMessage.textContent = "";
        return;
    }

let total = fee * years;
    let message = "";


if (years > 2 && years < 5) {
        total = total * 0.8;
        message = "20% discount applied!";
    } else if (years >= 5) {
        total = (total * 0.8) - 5;
        message = "20% discount + 5€ extra discount applied!";
    }

cost.textContent = "Total: " + total.toFixed(2) + " €";
    discountMessage.textContent = message;
});

// Exercise 4 / Harjoitus 4
const loadButton = document.getElementById("loadAnimal");
const clearButton = document.getElementById("clearAnimal");
const savedAnimal = document.getElementById("savedAnimal");

function loadAnimal() {
    // TODO: Read ws05Animal. Handle null before using JSON.parse().
    // TODO: Lue ws05Animal. Tarkista null ennen JSON.parse()-muunnosta.
    // TODO: Display name, species and note with textContent.
    // TODO: Näytä nimi, laji ja muistio textContent-ominaisuudella.

const savedData = localStorage.getItem("ws05Animal");
if (savedData === null) {
        savedAnimal.textContent = "No saved animal yet.";
    } else {
        // TODO: Display name, species and note with textContent.
        // TODO: Näytä nimi, laji ja muistio textContent-ominaisuudella.
        const animal = JSON.parse(savedData);
        savedAnimal.textContent = `Saved: ${animal.name} (${animal.species}) Note: ${animal.note}`;
    }
}


loadButton.addEventListener("click", loadAnimal);
clearButton.addEventListener("click", function () {
    // TODO: Remove ws05Animal and update the displayed result.
    // TODO: Poista ws05Animal ja päivitä sivulla näkyvä tulos.
localStorage.removeItem("ws05Animal");
    savedAnimal.textContent = "Saved animal details will appear here.";

});




// TODO: Call loadAnimal() here to restore data when the page opens.
// TODO: Kutsu loadAnimal() tässä, jotta tiedot palautuvat sivun avautuessa.
addEventListener("DOMContentLoaded", loadAnimal);


