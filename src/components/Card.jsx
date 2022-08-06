import {useSelector} from "react-redux";

export function Card({id}) {
  const weather = useSelector(state => state.counter.weather);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let date = new Date(weather.list[id].dt * 1000);
  let dateNow = new Date(weather.list[0].dt * 1000);
  let month = date.getMonth();
  let day = date.getDay();

  if (dateNow === date) {
    return;
  }
  return (
    <div
      className="flex flex-col items-center rounded-full lg:rounded-2xl bg-white/10 drop-shadow-2xl backdrop-blur-md px-2 py-6 sm:py-9 lg:py-5 lg:px-6 xl:px-8 mt-10 text-white">
      <div className="flex flex-col items-center">
        <p className="text-xl sm:text-2xl lg:text-3xl">{dayOfWeek[day]}</p>
        <img src={`http://openweathermap.org/img/wn/${weather.list[id].weather[0].icon}@2x.png`} alt=""
             className="w-14 sm:w-20 lg:w-36"/>
      </div>
      <p className="font-light text-xl sm:text-2xl lg:text-4xl xl:text-5xl">{Math.round(weather.list[id].main.temp)}°</p>
      <div className="hidden lg:flex justify-between w-full mt-6">
        <p className="text-lg xl:text-xl opacity-70">H:{Math.round(weather.list[id].main.temp_max)}°</p>
        <p className="text-lg xl:text-xl opacity-70">L:{Math.round(weather.list[id].main.temp_min)}°</p>
      </div>
    </div>
  );
};