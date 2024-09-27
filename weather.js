let error = document.querySelector(".error");
let cityinput = document.querySelector(".city");
let btn = document.querySelector(".btn");
let ermsg = document.querySelector(".ermsg");
let cityname = document.querySelector(".box");
let citytemp = document.querySelector(".temp");
let cityhumidity = document.querySelector(".humidity");
let weatherdescription = document.querySelector(".description");
let icon = document.querySelector(".icon");
//btn.addEventListener('click',(evt)=>{
    // if(city.value.toLowerCase() !== "kolkata"){
    //     error.style.display = "none";
    //     ermsg.style.display = "flex";
    // }
    // else{
    //     error.style.display = "flex";
    //     ermsg.style.display = "none";
    // }
//});
let apikey = "3f75320d62ed708ca69fb9f3ee2e6997";
btn.addEventListener('click',apiwork);
async function apiwork(){
         let city = cityinput.value;
         if(city){
            try{
              const weatherdata = await getdata(city);
              showdata(weatherdata);
            }
            catch(error){
              showerror();
            }
         }
         else{
            showerror();
         }
}
async function getdata(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    let response = await fetch(apiurl);
    //console.log(response);
    if(!response.ok){
        showerror();
    }
    else
    return await response.json();
}
function showdata(data){
    //console.log(data);
    error.style.display = "flex";
    ermsg.style.display = "none";
    const {name: city, 
           main: {temp,humidity},
           weather: [{description,id}]} = data;
           console.log(city,temp,humidity,description.toUpperCase(),id);
           cityname.innerText = city;
           citytemp.innerText = Math.floor(temp - 273) + "°C";
           cityhumidity.innerText = "Humidity: " + humidity + "%";
           weatherdescription.innerText = description.toUpperCase();
           icon.innerText = geticon(id);
           console.log(icon.innerText);
}
function geticon(id){
      switch(true){
             case (id >= 200 && id < 300):
                  return "⛈️";
                  break;
             case (id >= 300 && id < 400):
                  return "🌦️";
                    break;
             case (id >= 500 && id < 600):
                  return "🌧️";
                    break;
             case (id >= 600 && id < 700):
                  return "❄️";
                    break;
             case (id === 800):
                  return "☀️";
                    break;
             case (id >= 801 && id < 810):
                  return "☁️";
                    break;
             default: 
                      return "🌤️";      
      }
}
function showerror(){
     ermsg.style.display = "flex";
     error.style.display = "none";
}
window.addEventListener('load',apiwork);