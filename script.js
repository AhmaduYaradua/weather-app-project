const SEARCH_INPUT = document.getElementById("search--input");
const WEATHER_INFO_DIV = document.getElementById("weather--info-div");
const SEARCH_BTN = document.getElementById("search-btn");
const LOADER = document.getElementById("loader");
const h1Display = document.getElementById("location--display");

SEARCH_BTN.addEventListener("click", async (e) => {
  e.preventDefault();
  const place = SEARCH_INPUT.value.trim();
  if (!place) {
    alert("Search for a location");
    return;
  }
  console.log(place);
  LOADER.innerText = "Fetching weather details...";

  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=67b6facae2064b4c835183939242311&q=${place}`
    );
    let data = await response.json();
    console.log(data.e);

    if (data.error && data.error.message === "No matching location found.") {
      alert("Sorry, place not found");
      SEARCH_INPUT.value = "";
      return;
    }

    const location = data.location.name;
    const country = data.location.country;
    const temperature = data.current.temp_c;
    const condition = data.current.condition.text;
    const dateAndTime = data.location.localtime;
    const img = data.current.condition.icon;

    WEATHER_INFO_DIV.innerHTML = `<div>
        <h1>location: ${location}, ${country}</h1>
        
        <h4>current time and date: ${dateAndTime}</h4>
        <p>temperature: ${temperature}°C</p>
        <img src="${img}"/>
        <p>condition: ${condition}</p>
        
        
      </div>`;

    SEARCH_INPUT.value = "";

    console.log(`Location: ${location}, ${country}`);
    console.log(`Temperature: ${temperature}°C`);
    console.log(`Condition: ${condition}`);
    console.log(`current time: ${dateAndTime}`);
  } catch (error) {
    console.log(error);
    console.log("Sorry an error occured");
  } finally {
    LOADER.innerText = "";
  }
});
