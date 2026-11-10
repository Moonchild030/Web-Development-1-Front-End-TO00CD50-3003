// Store your OpenWeatherMap API key.

const apiKey= "YOUR_API_KEY_HERE";



// Find the HTML element where we display the weather data.
const weatherDataDiv= document.getElementById("weatherdata");

// Run this function when the user clicks the "Fetch data" button.
// async allows us to use await inside the function.
document.getElementById("fetchWeather").addEventListener("click", async function() {
    const city=document.getElementById("city").value;
   await getWeatherData(city);
});

document.getElementById("city").addEventListener("change", async function() {
    await getWeatherData(this.value);
});

document.getElementById("search").addEventListener("click", async function() {
    const city = document.getElementById("citysearch").value;
    if (city.trim() !== "") {
        await getWeatherData(city);
    }
});

async function getWeatherData(city) {


     // Display a loading message.
    weatherDataDiv.innerHTML = "Ladataan säätietoja...";

    // Try to fetch and process the weather data.
    try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&mode=xml&APPID=${apiKey}`);
        // Send a GET request to the weather API and wait for the response.
        // q=Helsinki selects the city.
        // units=metric gives the temperature in Celsius.
        // mode=xml requests the data in XML format.
        // ${apiKey} inserts our API key into the URL.
    
    // Check whether the API returned a successful HTTP status.
    if (!response.ok) {
        throw new Error("Kaupunkia ei löytynyt tai virhe API-pyynnössä.");
        }
        
    const xmlString = await response.text();

        // Parsitaan XML-data DOMParserilla
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");

        const cityName = xmlDoc.getElementsByTagName("city")[0].getAttribute("name");
        const temp = xmlDoc.getElementsByTagName("temperature")[0].getAttribute("value");
        const humidity = xmlDoc.getElementsByTagName("humidity")[0].getAttribute("value");
        const clouds = xmlDoc.getElementsByTagName("clouds")[0].getAttribute("name");

        // Display the XML as plain text or parsed structure on the page.
        weatherDataDiv.innerHTML = `
            <h3>Sää kaupungissa: ${cityName}</h3>
            <p>Lämpötila: ${temp} °C</p>
            <p>Pilvisyys: ${clouds}</p>
            <p>Ilmankosteus: ${humidity} %</p>
        `;

    // Handle errors from the request or the code above.
    } catch (error) {

        // Choose an error message in the page's language.
        const errorText = "Säätietojen haku epäonnistui.";

        // Display the message and details of the error.
        weatherDataDiv.innerHTML = `<span style="color: red;">${errorText} (${error.message})</span>`;
    }
}