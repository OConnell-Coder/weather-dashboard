var searchBtn = document.getElementById("search");


const searchCity = async () => {
    let city = document.getElementById("input").value;

    if(!city) return;

    let url = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial&q=${city}`;

    let weather = await (await fetch(url)).json();

    let {dt, main: {temp, humidity}, wind:{speed}, weather:[{icon}] } = weather.list[0];

    current.innerHTML = `
        <h2>${city} (${new Date(dt*1000).toDateString()}) <img src="http://openweathermap.org/img/wn/${icon}.png"> <h2>

        <h4>Temp: ${temp}</h4>
        <h4>Wind: ${speed}</h4>
        <h4>Humidity: ${humidity}</h4>
    `;

    for (let i = 7; i < weather.list.length; i+=8) {
        let {dt, main: {temp, humidity}, wind:{speed}, weather:[{icon}] } = weather.list[i];

        forecast.innerHTML += `
        <div class="card">
            <h6>${new Date(dt*1000).toDateString().slice(0,-5)} <h6>
            <img src="http://openweathermap.org/img/wn/${icon}.png">

            <h6>Temp: ${temp}</h6>
            <h6>Wind: ${speed}</h6>
            <h6>Humidity: ${humidity}</h6>
        </div>
    `;
        
    }
};

searchBtn.addEventListener("click", searchCity);




// fetch (url, {
//     method: 'GET', 
//     credentials: 'same-origin', 
//     redirect: 'follow',
// })
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     });