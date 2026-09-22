const animalarray = [
    { animal: "Bunny", habitat: "Domestic", diet: "Herbivore" },
    { animal: "Cat", habitat: "Domestic", diet: "Carnivore" },
    { animal: "Dog", habitat: "Domestic", diet: "Carnivore" }
];



function showTable() {
    var tableContainer = document.getElementById("tableContainer");
    var tableHTML = "<table border='1'><tr> <th>Animal</th><th>Habitat</th><th>Diet</th></tr>";
    for (var i = 0; i < animalarray.length; i++) {
        tableHTML += "<tr> <td>" + animalarray[i].animal + "</td> <td>" + animalarray[i].habitat + "</td> <td>" + animalarray[i].diet + "</td> </tr>";
    }
    tableHTML += "</table>";
    tableContainer.innerHTML = tableHTML;
}

function headingmouseover() {
    console.log("Stepped over me with a mouse!");
}

const heading1 = document.querySelector("h2");

heading1.addEventListener("click", function() {
    heading1.style.color = "red";
    heading1.textContent = "Bye bye mouse!";
}
)


const status = document.querySelector("#status");
const charCount = document.querySelector("#charcount");
const preview = document.querySelector("#preview");
const textarea = document.querySelector("#feedback");

textarea.addEventListener("focus", function() {
    status.innerHTML = "Typing feedback...";
    textarea.style.backgroundColor = "#6e1164";
});


textarea.addEventListener("blur", function() {
    status.innerHTML = "";
    textarea.style.backgroundColor = "";
});


textarea.addEventListener("input", function() {
    const textLength = textarea.value.length;
    
    
    charCount.innerHTML = textLength + "/200";
    
    
    if (textarea.value === "") {
        preview.innerHTML = "(The preview will appear here)";
    } else {
        preview.innerHTML = textarea.value;
    }
});

const submitButton = document.querySelector("#sendBtn");
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
    
        const feedback = textarea.value.trim();
        if (feedback.length > 10 && feedback.length < 200) {
            status.innerHTML = "Thank you for your feedback!";
        } else {
            status.innerHTML = "Feedback must be between 10 and 200 characters.";
        }
    });

    
const keybox = document.querySelector("#keybox");
const keyinfo = document.querySelector("#keyinfo");

let count = 0;

document.addEventListener("keydown", function(event) {
    console.log ("Key pressed: " + event.key);
    console.log ("Key code: " + event.code);
    keyinfo.innerHTML = "Key pressed: " + event.key + "<br>Key code: " + event.code + "<br>Alt key pressed: " + event.altKey + "<br>Ctrl key pressed: " + event.ctrlKey + "<br>Shift key pressed: " + event.shiftKey;
    keybox.innerHTML = "Key pressed: " + event.key;
    count++;
    console.log("Number of key presses: " + count);






    if (event.key === "r") {
        keybox.style.backgroundColor = "red";
    } else if (event.key === "g") {
        keybox.style.backgroundColor = "green";
    } else if (event.key === "b") {
        keybox.style.backgroundColor = "blue";
    } else if (event.key === "p") {
        keybox.style.backgroundColor = "#FFB6C1";
    } else if (event.key === "y") {
        keybox.style.backgroundColor = "yellow";
    } else if (event.altKey === true) {
        keybox.style.backgroundColor = "purple";
    } else {
        keybox.style.backgroundColor = "";
    }
});

