import {useDispatch, useSelector} from "react-redux";
import {fetchWeather, switchBg} from "./store/features/slices/counterSlice";
import {useEffect, useState} from "react";
import classNames from "classnames";
import {Card} from "./components/Card";

function App() {
  const weather = useSelector(state => state.counter.weather);
  const bgTheme = useSelector(state => state.counter.bgImage);
  const dispatch = useDispatch();

  function getPosition() {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });
  }

  let currentDate, sunriseTime, sunsetTime;

  function getTheme(hours, sunrise, sunset) {
    if (hours > sunrise && hours < 10) {
      dispatch(switchBg("sunrise"));
    } else if (hours >= 10 && hours < sunset) {
      dispatch(switchBg("daytime"));
    } else if (hours >= sunset && hours < 22) {
      dispatch(switchBg("sunset"));
    } else if ((hours >= 22 && hours <= 24) || (hours >= 0 && hours <= sunrise)) {
      dispatch(switchBg("night"));
    }
  }

  useEffect(() => {
    let lat = 0, lon = 0;

    getPosition().then((pos) => {
      lat = pos.coords.latitude;
      lon = pos.coords.longitude;

      let position = {
        lat: lat.toFixed(1),
        lon: lon.toFixed(1)
      }

      dispatch(fetchWeather(position)).then((item) => {
        console.log(item.payload);

        currentDate = new Date(weather.list[0].dt * 1000);
        sunriseTime = new Date(weather.city.sunrise * 1000);
        sunsetTime = new Date(weather.city.sunset * 1000);

        currentDate = Number(currentDate.getUTCHours());
        sunriseTime = Number(sunriseTime.getHours());
        sunsetTime = Number(sunsetTime.getHours());
        // console.log(currentDate + " " + sunriseTime + " " + sunsetTime);
        getTheme(currentDate, sunriseTime, sunsetTime);
      })
    })
  }, [dispatch])


  let theme = "daytime";
  if (bgTheme === "daytime") {
    theme = classNames("bg-no-repeat bg-center bg-cover bg-[url('./src/assets/bg-daytime.png')]")
  } else if (bgTheme === "sunrise") {
    theme = classNames("")
  } else if (bgTheme === "night") {
    theme = classNames("bg-no-repeat bg-center bg-cover bg-[url('./src/assets/bg-night.jpg')]")
  }

  let mainClass = classNames('w-full h-[100vh] absolute', theme)


  return (
    <div className={mainClass}>
      <div className="container mx-auto">
        <div className="flex flex-col items-center mt-10 text-white">
          <p className="text-3xl">{weather.city.name}</p>
          <p className="text-7xl font-light">{Math.round(weather.list[0].main.temp)}°</p>
          <p className="text-xl opacity-70">{weather.list[0].weather[0].main}</p>
          <div className="flex flex-row gap-4">
            <p className="text-2xl ">H:{Math.round(weather.list[0].main.temp_max)}°</p>
            <p className="text-2xl ">L:{Math.round(weather.list[0].main.temp_min)}°</p>
          </div>
        </div>
        <div className="flex flex-row justify-around">
          {weather.list.map((item, index) => {
            let hours = new Date(item.dt*1000)
            hours = Number(hours.getHours());
            if(hours === 12) {
              return <Card id={index} key={index}/>
            }
            // console.log(index)
          })}
        </div>
      </div>
    </div>

  )
}

export default App
