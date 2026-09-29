1// MuOKATAAN OTSIKKOA KUN NAPPIA PAINETAAN
// MuOKATAAN OTSIKKOA KUN NAPPIA PAINETAAN
const changeHeadingButton = document.querySelector("#changeHeadingButton");
const taskOneHeading = document.querySelector("#taskOneHeading");

changeHeadingButton.addEventListener("click", function () {
    taskOneHeading.textContent = "Muokattu otsikko!";
}); 


const changeStyleButton = document.querySelector("#changeStyleButton");
changeStyleButton.addEventListener("click", function () {       
taskOneHeading.classList.toggle("highlight");
});


const changeTextButton = document.querySelector("#changeTextButton");
changeTextButton.addEventListener("click", function () {
    const animalText = document.querySelector("#animalText");
    animalText.textContent = "Bunnies are cute and cuddly";
});


const animalContent = document.querySelector("#animalContent");
const animalHeading = document.createElement("h3");

animalHeading.textContent="Animal of The Day";
animalContent.appendChild(animalHeading);

const animalParagraph = document.createElement("p");
    animalParagraph.textContent = "Bunny: Their large ears can turn 180 degrees to pinpoint sounds, and they also help cool them down on hot days.";
    animalContent.appendChild(animalParagraph);

const animalImage = document.createElement("img");
    animalImage.src = "images/Bunny.jpeg";
    animalImage.alt = "Picture of a Bunny";

    animalContent.appendChild(animalImage);

animalHeading.classList.add("animal-heading")

const hideAnimalButton = document.querySelector("#hideAnimalButton");
hideAnimalButton.addEventListener("click", function() {
animalContent.style.display = "none";
});

const showAnimalButton = document.querySelector("#showAnimalButton")
showAnimalButton.addEventListener("click", function( ) {
animalContent.style.display = "block";
});

const animalSelect = document.querySelector("#animalSelect");
const animalName = document.querySelector("#animalName");
const animalImage2 = document.querySelector("#animalImage");
const animalDescription = document.querySelector("#animalDescription");

animalSelect.addEventListener("change", function () {
    const choice = animalSelect.value;

if (choice === "elephant") {
        animalName.textContent = "Elephant";
        animalImage2.src = "images/elephant.png";
        animalImage2.alt = "Elephant";
        animalDescription.textContent = "Elephants are the world's largest land animals.";

    } else if (choice === "tiger") {
        animalName.textContent = "Tiger";
        animalImage2.src = "images/tiger.png";
        animalImage2.alt = "Tiger";
        animalDescription.textContent = "Tigers are the largest wild cats in the world.";

    } else if (choice === "penguin") {
        animalName.textContent = "Penguin";
        animalImage2.src = "images/penguin.png";
        animalImage2.alt = "Penguin";
        animalDescription.textContent = "Penguins are a group of aquatic, flightless birds.";


    } else if (choice === "panda") {
        animalName.textContent = "Panda";
        animalImage2.src = "images/panda.png";
        animalImage2.alt = "Panda";
        animalDescription.textContent = "Giant pandas are bears native to south-central China.";
    }
});


animalImage2.addEventListener("mouseenter", function ()  {
    animalImage2.classList.add("image-highlight");
});

animalImage2.addEventListener("mouseleave", function () {
    animalImage2.classList.remove("image-highlight");
});



const animalForm = document.querySelector("#animalForm");
const observationAnimal = document.querySelector("#observationAnimal");
const observationLocation = document.querySelector("#observationLocation");
const observationDate = document.querySelector("#observationDate");
const observationTableBody = document.querySelector("#observationTableBody");


animalForm.addEventListener("submit", (event) => {
    event.preventDefault();

const animal = observationAnimal.value.trim();
const location = observationLocation.value.trim();
const date = observationDate.value.trim();

if (!animal, !location, !date) {
    alert("Please fill all the fields!");
    return;
}

const newRow = document.createElement("tr");

const animalCell = document.createElement("td");
animalCell.textContent= animal;

const locationCell = document.createElement("td");
locationCell.textContent = location;

const dateCell = document.createElement("td")
dateCell.textContent= date;

newRow.appendChild(animalCell);
newRow.appendChild(locationCell);
newRow.appendChild(dateCell);

observationTableBody.appendChild(newRow);

});




























// listener for the select element from the drop down list.


    // function to update the DOM based on the selected animal
