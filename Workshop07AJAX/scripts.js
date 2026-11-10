/** Exercise 1 */

let text =
  '{ "employees" : [' +
  '{ "firstName":"John" , "lastName":"Doe" },' +
  '{ "firstName":"Anna" , "lastName":"Smith" },' +
  '{ "firstName":"Peter" , "lastName":"Jones" } ]}';

let employeesObj = JSON.parse(text);

let namesOnlyButton = document.getElementById("namesOnly");
namesOnlyButton.addEventListener("click", function () {
  let namesOnly = employeesObj.employees.map(function (employee) {
    return employee.firstName + " " + employee.lastName;
  });
  document.getElementById("jsondata").innerHTML = namesOnly.join("<br>");
});

let allDetailsButton = document.getElementById("allDetails");
allDetailsButton.addEventListener("click", function () {
  let allDetails = employeesObj.employees.map(function (employee) {
    return JSON.stringify(employee);
  });
  document.getElementById("jsondata").innerHTML = allDetails.join("<br>");
});

/** Exercise 2 */

let dataUrl = "http://www.omdbapi.com/?s=star+wars&apikey=cbbc6750";

let loadRawDataButton = document.getElementById("loadRawData");
loadRawDataButton.addEventListener("click", function () {
  sendXHRRequest("GET", dataUrl, null, function (err, data) {
    if (err) {
      console.error(err);
    } else {
      document.getElementById("rawdata").innerHTML = JSON.stringify(data);
    }
  });
});

let loadParsedDataButton = document.getElementById("loadParsedData");
loadParsedDataButton.addEventListener("click", function () {
  sendXHRRequest("GET", dataUrl, null, function (err, data) {
    if (err) {
      console.error(err);
    } else {
      let parsedData = createTableFromJSON(data.Search);
      let rawDataDiv = document.getElementById("rawdata");
      rawDataDiv.innerHTML = "";
      rawDataDiv.appendChild(parsedData);
    }
  });
});

function createTableFromJSON(jsonData) {
  let table = document.createElement("table");
  let headerRow = document.createElement("tr");
  let headers = Object.keys(jsonData[0]);
  headers.forEach(function (header) {
    let th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);
  jsonData.forEach(function (item) {
    let row = document.createElement("tr");
    headers.forEach(function (header) {
      let td = document.createElement("td");
      td.appendChild(parseCellContent(header, item[header]));
      row.appendChild(td);
    });
    table.appendChild(row);
  });
  return table;
}

function parseCellContent(header, content) {
  if (header === "Poster") {
    let img = document.createElement("img");
    img.src = content;
    img.alt = "Poster";
    img.width = 100;
    return img;
  }
  return document.createTextNode(content);
}

/** Exercise 3 */

let weatherAPiUrl =
  "http://api.openweathermap.org/data/2.5/weather?q=Helsinki&units=metric&mode=JSON&APPID=ff64c247a136f706923d1ee0d55d71e2";

let fetchWeatherButton = document.getElementById("fetchWeatherRaw");
fetchWeatherButton.addEventListener("click", function () {
  sendXHRRequest("GET", weatherAPiUrl, null, function (err, data) {
    if (err) {
      console.error(err);
    } else {
      document.getElementById("weatherdata").innerHTML = JSON.stringify(data);
    }
  });
});

let fetchWeatherParsedButton = document.getElementById("fetchWeatherParsed");
fetchWeatherParsedButton.addEventListener("click", function () {
  sendXHRRequest("GET", weatherAPiUrl, null, function (err, data) {
    if (err) {
      console.error(err);
    } else {
      let weatherInfo = `${data.name}:<br>Temperature: ${data.main.temp} °C<br>Clouds: ${data.clouds.all}%<br>Humidity: ${data.main.humidity}%`;
      document.getElementById("weatherdata").innerHTML = weatherInfo;
    }
  });
});

let selectCity = document.getElementById("city");
selectCity.addEventListener("change", function () {
  let selectedCity = selectCity.value;
  let weatherAPiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=metric&mode=JSON&APPID=ff64c247a136f706923d1ee0d55d71e2`;
  sendXHRRequest("GET", weatherAPiUrl, null, function (err, data) {
    if (err) {
      console.error(err);
    } else {
      let weatherInfo = `${data.name}:<br>Temperature: ${data.main.temp} °C<br>Clouds: ${data.clouds.all}%<br>Humidity: ${data.main.humidity}%`;
      document.getElementById("weatherdata").innerHTML = weatherInfo;
    }
  });
});

let citySearchInput = document.getElementById("citysearch");
let CitySearchButton = document.getElementById("search");

CitySearchButton.addEventListener("click", function () {
  let cityName = citySearchInput.value;
  let weatherAPiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&mode=JSON&APPID=ff64c247a136f706923d1ee0d55d71e2`;

  sendXHRRequest("GET", weatherAPiUrl, null, function (err, data) {
    if (err) {
      console.error(err);
    } else {
      let weatherInfo = `${data.name}:<br>Temperature: ${data.main.temp} °C<br>Clouds: ${data.clouds.all}%<br>Humidity: ${data.main.humidity}%`;
      document.getElementById("weatherdata").innerHTML = weatherInfo;
    }
  });
});

/** Helper function to send an XHR request and handle the response. */

function sendXHRRequest(method, url, data, callback) {
  fetch(url, {
    method: method,
    body: data ? JSON.stringify(data) : null,
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.json();
    })
    .then(function (data) {
      callback(null, data);
    })
    .catch(function (err) {
      callback(err, null);
    });
}
