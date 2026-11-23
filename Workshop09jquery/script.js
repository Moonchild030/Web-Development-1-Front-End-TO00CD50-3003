let apiKey = "YOUR_API_KEY"; 
let tempChart = null; // Global chart reference
let chartData = {}; // Store data and labels for reuse
let city = "";
const language = document.documentElement.lang === "en" ? "en" : "fi";
let forecast= [];


async function getForecast(city, apiKey) {
  const locations = await axios.get("https://api.openweathermap.org/geo/1.0/direct", {
    params: { q: city, limit: 1, appid: apiKey }
  });

  const place = locations.data[0];
  if (!place) return [];

  const response = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
    params: { lat: place.lat, lon: place.lon, units: "metric", appid: apiKey }
  });
  return response.data.list;
}

async function haeSaa() {
  city = document.getElementById("kaupunki").value.trim();
  apiKey = document.getElementById("apiKey").value.trim();
  const errorMessage = document.getElementById("errorMessage");

  errorMessage.textContent = "";

  if (!city || !apiKey) {
    errorMessage.textContent = "Please enter both a city and an API key.";
    return;
  }
  localStorage.setItem("city", city);


  try {
    forecast = await getForecast(city, apiKey);

    if (forecast.length === 0) {
      errorMessage.textContent = "City not found.";
      document.getElementById("tempChart").style.display = "none";
      return;
    }

    document.getElementById("cityTitle").textContent =
      `Weather forecast for ${city}`;

    // Get all 40 temperature readings (five days).
    const temperatures = forecast.map(item => item.main.temp);

    // Calculate minimum and maximum temperatures.
    const lowest = Math.min(...temperatures);
    const highest = Math.max(...temperatures);

    document.getElementById("forecastSummary").textContent =
      `Lowest: ${lowest.toFixed(1)} °C | Highest: ${highest.toFixed(1)} °C`;

    // Create labels for the chart.
    const labels = forecast.map(item => {
      const aika = new Date(item.dt_txt);
      return `${aika.getDate()}.${aika.getHours()}:00`;
    });

    const weatherCounts = {};

forecast.forEach(item => {
  const condition = item.weather[0].main;
  weatherCounts[condition] = (weatherCounts[condition] || 0) + 1;
});

chartData = {
  labels,
  temperatures,
  weatherLabels: Object.keys(weatherCounts),
  weatherValues: Object.values(weatherCounts)
};

    const type = document.getElementById("chartType").value;
    piirraKaavio(labels, temperatures, city, type);

  } catch (error) {
    console.error("Error fetching data:", error);
    errorMessage.textContent =
      "Could not fetch weather data. Check the city name or API key.";
  }
}

// Load the weather data when the page loads if a city is saved in localStorage.
function piirraKaavio(labels, data, city, type) {
  document.getElementById("tempChart").style.display = "block";
  const ctx = document.getElementById("tempChart").getContext("2d");

  // Destroy the previous chart before creating a new one.
  if (tempChart) {
    tempChart.destroy();
  }

  // If Pie is selected, show weather conditions instead of temperatures.
  if (type === "pie") {
    tempChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: chartData.weatherLabels,
        datasets: [{
          label: "Weather conditions",
          data: chartData.weatherValues,
          backgroundColor: [
            "#66c2a5",
            "#fc8d62",
            "#8da0cb",
            "#e78ac3",
            "#a6d854",
            "#ffd92f"
          ]
        }]
      },
      options: {
        responsive: true
      }
    });

  } else {
    // Keep the original temperature charts for Line and Bar.
    tempChart = new Chart(ctx, {
      type: type,
      data: {
        labels: labels,
        datasets: [{
          label: `${language === "en" ? "Temperature" : "Lämpötila"} (${city}) °C`,
          data: data,
          borderWidth: 2,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: false,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }
}

function paivitaKaavio() {
  // Check if forecast data exists.
  if (chartData.labels === undefined) {
    return;
  }

  // Get the selected chart type.
  let type = document.getElementById("chartType").value;

  // Redraw the chart using the selected type.
  piirraKaavio(chartData.labels, chartData.temperatures, city, type);
}

document.querySelector("#haeSaaPainike")
  .addEventListener("click", haeSaa);
 // $("#haeSaaPainike").on("click", haeSaa);

//   $("#haeSaaPainike").on("click", function () {
//    $("#saaYllatys").stop(true, true).hide()
//      .fadeIn(200).delay(1000).fadeOut(400);
//    haeSaa();
//  });

const savedCity = localStorage.getItem("city");
if (savedCity) {
  document.getElementById("kaupunki").value = savedCity;
}
