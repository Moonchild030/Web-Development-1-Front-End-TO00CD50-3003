console.log("Hello World!");
alert("Hello World!");

const name = "Amina"; 
let age= 21;
const favouriteAnimal = "bunny";
console.log("My name is " + name + " and I am " + age + " years old. My favourite animal is a " + favouriteAnimal + ".");




age = parseInt(prompt("What is your age?"));
if (age >= 18) {
    console.log("You are an adult.");
} else { 
    console.log("You are under 18.");
}




const userName = prompt("What is your name?");
function greetUser(name) {
    console.log("Hello, " + name + "!");
}
greetUser(userName);



let pressCount= 0;
function myfunction() {
    pressCount++;
    alert("JavaScript works! Welcome to my cozy corner of the web ✨! You have clicked the button " + pressCount + " times.");
}


