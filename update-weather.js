const fs = require('fs');

const weatherDescriptions = {
0:"Clear",
1:"Mainly Clear",
2:"Partly Cloudy",
3:"Overcast",
45:"Fog",
48:"Fog",
51:"Light Drizzle",
53:"Drizzle",
55:"Heavy Drizzle",
61:"Light Rain",
63:"Rain",
65:"Heavy Rain",
71:"Snow",
73:"Snow",
75:"Heavy Snow",
80:"Rain Showers",
81:"Heavy Showers",
82:"Heavy Rain",
95:"Thunderstorm",
96:"Thunderstorm",
99:"Thunderstorm"
};

async function updateWeather() {

const response = await fetch(
'https://api.open-meteo.com/v1/forecast?latitude=53.3811&longitude=-1.4701&current=temperature_2m,apparent_temperature,weather_code'
);

const data = await response.json();

let html = fs.readFileSync('jsweather.html', 'utf8');

html = html.replace(
'%%TEMP%%',
Math.round(data.current.temperature_2m)
);

html = html.replace(
'%%FEELS%%',
Math.round(data.current.apparent_temperature)
);

html = html.replace(
'%%CONDITION%%',
weatherDescriptions[data.current.weather_code] || 'Unknown'
);

fs.writeFileSync('jsweatherupdated.html', html);
}

updateWeather();
