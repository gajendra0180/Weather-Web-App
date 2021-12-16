var total_cards = 0;

if (total_cards == 0) {
  fetch(
    `https://source.unsplash.com/1600x900/?night`
  ).then((response) => {
    document.getElementById("append_here").innerHTML += `
  <div style="margin-right: 2vw;margin-top:2vh; 
  cursor:pointer;font-size:2em;border-radius:20px;background-image: url(${response.url});height:400px;width:300px;display:flex;flex-direction:column;text-align:center;align-items:center;justify-content:center;">
  <h1>Place: No Cards Yet</h1>
  <br/>
  </div>
`;
  });
}

function handleSubmit() {
  var temperature_temp, temperature_humidity, weather_type, weather_icon;

  const name = document.getElementById("location").value;
  console.log("Location @ " + name);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=52fbfd16084cb849b4bab407c67677ea&units=metric`;

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((responseJson) => {
      console.log(responseJson);
      temperature_temp = responseJson.main.temp;
      temperature_humidity = responseJson.main.humidity;
      weather_type = responseJson.weather[0].description;
      weather_icon = responseJson.weather[0].icon;
      console.log(temperature_temp);

      fetch(
        `https://source.unsplash.com/1600x900/?${weather_type}`
      ).then((response) => {
        console.log(response.url);
        if (total_cards == 0) {
          document.getElementById("append_here").innerHTML = ``;
          total_cards++;
        }

        document.getElementById("append_here").innerHTML += `
      <div style="margin-right: 2vw;margin-top:2vh; 
      cursor:pointer;font-size:2em;border-radius:20px;background-image: url(${response.url});height:400px;width:300px;display:flex;flex-direction:column;text-align:center;align-items:center;justify-content:center;">
      <h1>Place: ${name}</h1>
      <h4>Temperature:${temperature_temp}</h4>
      <h4>Humidity:${temperature_humidity}</h4>
      <h4>Weather Type:${weather_type}</h4>
      <br/>
      </div>
    `;
      });
    })
    .catch((error) => {
      alert("No such Place Exist");
      console.log(error);
    });
  document.getElementById("location_form").reset();

  return false;
}
