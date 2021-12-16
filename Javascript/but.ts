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
      })
      .catch((error) => {
        console.log(error);
      });
    document.getElementById("location_form").reset();
  
    document.getElementById("append_here").innerHTML +=
      "Temperature" + temperature_temp;
  
    return false;
  }
  