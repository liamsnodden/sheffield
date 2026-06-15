const fs = require(‘fs’);

const weatherDescriptions = {
0:“Clear”,
1:“Mainly Clear”,
2:“Partly Cloudy”,
3:“Overcast”,
45:“Fog”,
48:“Fog”,
51:“Light Drizzle”,
53:“Drizzle”,
55:“Heavy Drizzle”,
61:“Light Rain”,
63:“Rain”,
65:“Heavy Rain”,
71:“Snow”,
73:“Snow”,
75:“Heavy Snow”,
80:“Rain Showers”,
81:“Heavy Showers”,
82:“Heavy Rain”,
95:“Thunderstorm”,
96:“Thunderstorm”,
99:“Thunderstorm”
};

const iconMap = {
0:‘01d’,
1:‘02d’,
2:‘03d’,
3:‘04d’,
45:‘50d’,
48:‘50d’,
51:‘09d’,
53:‘09d’,
55:‘09d’,
61:‘10d’,
63:‘10d’,
65:‘10d’,
71:‘13d’,
73:‘13d’,
75:‘13d’,
80:‘09d’,
81:‘09d’,
82:‘09d’,
95:‘11d’,
96:‘11d’,
99:‘11d’
};

async function updateWeather() {

const response = await fetch(
‘https://api.open-meteo.com/v1/forecast?latitude=53.3811&longitude=-1.4701&current=temperature_2m,apparent_temperature,weather_code&daily=weather_code,temperature_2m_max&forecast_days=4’
);

const data = await response.json();

const code = data.current.weather_code;
const icon = iconMap[code] || ‘04d’;

const days = data.daily.time;

const dayNames = days.map(d =>
new Date(d).toLocaleDateString(
‘en-GB’,
{ weekday:‘short’ }
).toUpperCase()
);

const icon1 = iconMap[data.daily.weather_code[1]] || ‘04d’;
const icon2 = iconMap[data.daily.weather_code[2]] || ‘04d’;
const icon3 = iconMap[data.daily.weather_code[3]] || ‘04d’;

let html = fs.readFileSync(‘jsweather.html’, ‘utf8’);

html = html.replace(’%%TEMP%%’,
Math.round(data.current.temperature_2m));

html = html.replace(’%%FEELS%%’,
Math.round(data.current.apparent_temperature));

html = html.replace(’%%CONDITION%%’,
weatherDescriptions[code] || ‘Unknown’);

html = html.replace(’%%ICON%%’,
${icon}.png);

html = html.replace(’%%DAY1%%’, dayNames[1]);
html = html.replace(’%%DAY2%%’, dayNames[2]);
html = html.replace(’%%DAY3%%’, dayNames[3]);

html = html.replace(’%%TEMP1%%’,
Math.round(data.daily.temperature_2m_max[1]));

html = html.replace(’%%TEMP2%%’,
Math.round(data.daily.temperature_2m_max[2]));

html = html.replace(’%%TEMP3%%’,
Math.round(data.daily.temperature_2m_max[3]));

html = html.replace(’%%ICON1%%’,
${icon1}.png);

html = html.replace(’%%ICON2%%’,
${icon2}.png);

html = html.replace(’%%ICON3%%’,
${icon3}.png);

fs.writeFileSync(‘jsweatherupdated.html’, html);
}

updateWeather();
