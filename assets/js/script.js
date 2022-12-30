var searchBtn = document.getElementById("search");

const searchCity = async () => {
    let city = document.getElementById("input").value;

    if(!city) return;

    let url = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial&q=${city}`;

    let weather = await (await fetch(url)).json();

    x = weather;
    console.log(weather);

    let {dt, main: {temp, humidity}, wind:{speed}, weather:[icon] } = weather.list[0];

    current.innerHTML = `
        <h2>${city} (${new Date(dt*100).toDateString()}) <img href="https://openweathermap.com/${icon}.png"> <h2>

        <h4>Temp: ${temp}</h4>
        <h4>Wind: ${speed}</h4>
        <h4>Humidity: ${humidity}</h4>
    `;
};

searchBtn.addEventListener("click", searchCity);

