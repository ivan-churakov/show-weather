import {useDispatch, useSelector} from "react-redux";
import {fetchWeather, switchBg} from "./store/features/slices/counterSlice";
import {useEffect, useState} from "react";
import classNames from "classnames";
import {Card} from "./components/Card";

function App() {
  const weather = useSelector(state => state.counter.weather);
  const bgTheme = useSelector(state => state.counter.bgImage);
  const dispatch = useDispatch();
  const [sunriseTime, setSunriseTime] = useState();
  const [sunsetTime, setSunsetTime] = useState();

  function getPosition() {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });
  }

  let currentDate;

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
        let sunrise = new Date(weather.city.sunrise * 1000);
        let sunset = new Date(weather.city.sunset * 1000);

        currentDate = Number(currentDate.getUTCHours());
        sunrise = Number(sunrise.getHours());
        sunset = Number(sunset.getHours());
        // console.log(currentDate + " " + sunriseTime + " " + sunsetTime);
        getTheme(currentDate, sunrise, sunset);
      })
    })
  }, [dispatch])


  let theme, weatherStatus = weather.list[0].weather[0].main;
  if (bgTheme === "daytime") {
    switch(weatherStatus) {
      case 'Clouds':
        theme = classNames("bg-[url('./src/assets/bg-cloud-daytime.png')]");
        break;
      case 'Clear':
        theme = classNames("bg-[url('./src/assets/bg-daytime.png')]");
        break;
      case 'Snow':
        theme = classNames("bg-[url('./src/assets/bg-daytime.png')]");
        break;
      case 'Rain':
        theme = classNames("bg-[url('./src/assets/bg-rain-daytime.webp')]");
        break;
      case 'Drizzle':
        theme = classNames("bg-[url('./src/assets/bg-daytime.png')]");
        break;
      case 'Thunderstorm':
        theme = classNames("bg-[url('./src/assets/bg-daytime.png')]");
        break;
      case 'Mist':
        theme = classNames("bg-[url('./src/assets/bg-daytime.png')]");
        break;
      case 'Smoke':
        theme = classNames("bg-[url('./src/assets/bg-smoke.png')]");
        break;
      case 'Haze':
        theme = classNames("bg-[url('./src/assets/bg-daytime.png')]");
        break;
      case 'Dust':
        theme = classNames("bg-[url('./src/assets/bg-daytime.png')]");
        break;
      case 'Fog':
        theme = classNames("bg-[url('./src/assets/bg-daytime.png')]");
        break;
      case 'Sand':
        theme = classNames("bg-[url('./src/assets/bg-daytime.png')]");
        break;
      case 'Ash':
        theme = classNames("bg-[url('./src/assets/bg-daytime.png')]");
        break;
      case 'Squall':
        theme = classNames("bg-[url('./src/assets/bg-daytime.png')]");
        break;
      case 'Tornado':
        theme = classNames("bg-[url('./src/assets/bg-daytime.png')]");
        break;
    }
  } else if (bgTheme === "sunrise") {
    theme = classNames("bg-[url('./src/assets/bg-sunrise.webp')]")
  } else if (bgTheme === "sunset") {
    theme = classNames("bg-[url('./src/assets/bg-sunset.webp')]")
  } else if (bgTheme === "night") {
    theme = classNames("bg-[url('./src/assets/bg-night.png')]")
  }

  let mainClass = classNames('w-full h-[200vh] absolute bg-fixed bg-no-repeat bg-center bg-cover', theme)


  useEffect(() => {
    let sunriseR = new Date(weather.city.sunrise * 1000);
    let sunsetR = new Date(weather.city.sunset * 1000);

    setSunriseTime(String(sunriseR.getHours() + ":" + sunriseR.getMinutes()))
    setSunsetTime(String(sunsetR.getHours() + ":" + sunsetR.getMinutes()))
  })

  const [deg, setDeg] = useState(`rotate-[${weather.list[0].wind.deg}deg]`);
  let arrowClass = classNames("absolute w-6 left-[calc(50%-12px)] top-[calc(50%-12px)]", deg);

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
        <div className="flex flex-row justify-center gap-5 sm:gap-8">
          {weather.list.map((item, index) => {
            let hours = new Date(item.dt*1000)
            hours = Number(hours.getHours());
            if(hours === 12) {
              return <Card id={index} key={index}/>
            }
          })}
        </div>
        <div className="w-full mx-auto">
          <div className="flex flex-col items-center lg:flex-row lg:justify-center gap-6 sm:gap-8 mt-20">
            <div className="flex flex-row gap-6 sm:gap-8">
              <div className="flex flex-col justify-between relative text-white bg-white/10 drop-shadow-2xl backdrop-blur-md rounded-2xl">
                <div className="flex flex-col py-4 px-6 pr-11 sm:py-5 sm:px-9 lg:py-7 lg:pr-20">
                  <span className="flex flex-row items-center gap-2"><img src={sunriseIcon} alt="" className="w-4"/><p className="text-lg">Sunrise</p></span>
                  <p className="text-2xl sm:text-5xl font-light">{sunriseTime}</p>
                </div>
                <hr className="w-full text-white border-t-2 opacity-40"/>
                <div className="flex flex-col py-4 px-6 pr-11 sm:py-5 sm:px-9 lg:py-7 lg:pr-20 sm:pb-8">
                  <span className="flex flex-row items-center gap-2"><img src={sunsetIcon} alt="" className="w-4"/><p className="text-lg">Sunset</p></span>
                  <p className="text-2xl sm:text-5xl font-light">{sunsetTime}</p>
                </div>
              </div>
              <div className="flex flex-col relative text-white bg-white/10 drop-shadow-2xl backdrop-blur-md rounded-2xl py-4 px-12 sm:py-5 sm:px-10">
                <span className="flex flex-row items-center gap-2"><img src={windIcon} alt="" className="w-4"/><p className="text-lg">Wind</p></span>
                <p className="text-2xl sm:text-5xl font-light">{weather.list[0].wind.speed}m/s</p>
                <div className="relative w-full h-full mt-4">
                  <img src={compassIcon} alt="" className="absolute w-20 sm:w-24 left-[calc(50%-40px)] sm:left-[calc(50%-48px)] top-[calc(50%-40px)] sm:top-[calc(50%-48px)]"/>
                  <img src={arrowIcon} alt="" className={arrowClass}/>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-6 sm:gap-8">
              <div className="flex flex-col gap-6 sm:gap-8">
                <div className="flex flex-col h-fit relative text-white bg-white/10 drop-shadow-2xl backdrop-blur-md rounded-2xl py-4 px-6 sm:py-5 sm:px-10 pr-8 lg:pr-10">
                  <span className="flex flex-row items-center gap-2"><img src={cloudIcon} alt="" className="w-4"/><p className="text-lg">Clouds</p></span>
                  <p className="text-2xl sm:text-5xl font-light">{weather.list[0].clouds.all}%</p>
                </div>
                <div className="flex flex-col h-fit relative text-white bg-white/10 drop-shadow-2xl backdrop-blur-md rounded-2xl py-4 px-6 sm:py-5 sm:px-10 pr-8 lg:pr-10">
                  <span className="flex flex-row items-center gap-2"><img src={visibilityIcon} alt="" className="w-4"/><p className="text-lg">Visibility</p></span>
                  <p className="text-2xl sm:text-5xl font-light">{weather.list[0].visibility/1000}km</p>
                </div>
              </div>
              <div className="flex flex-col gap-6 sm:gap-8">
                <div className="flex flex-col h-fit relative text-white bg-white/10 drop-shadow-2xl backdrop-blur-md rounded-2xl py-4 px-6 sm:py-5 sm:px-10">
                  <span className="flex flex-row items-center gap-2"><img src={precipitationIcon} alt="" className="w-4"/><p className="text-lg">Precipitation</p></span>
                  <p className="text-2xl sm:text-5xl font-light">{weather.list[0].pop*100}%</p>
                </div>
                <div className="flex flex-col h-fit relative text-white bg-white/10 drop-shadow-2xl backdrop-blur-md rounded-2xl py-4 px-6 sm:py-5 sm:px-10">
                  <span className="flex flex-row items-center gap-2"><img src={atmPressureIcon} alt="" className="w-4"/><p className="text-lg">Atm&nbsp;pressure</p></span>
                  <p className="text-2xl sm:text-5xl font-light">{weather.list[0].main.pressure}hPa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default App
