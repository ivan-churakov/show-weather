import {useSelector} from "react-redux";

export function Card({id}) {
  const weather = useSelector(state => state.counter.weather);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let date = new Date(weather.list[id].dt*1000);
  let dateNow = new Date(weather.list[0].dt*1000);
  let month = date.getMonth();
  let day = date.getDay();

  if(dateNow === date) {
    return;
  }
  return (
    <div
      className="flex flex-col lg:flex-row items-center rounded-full lg:rounded-2xl lg:gap-2 bg-blue-400/40 border-white/40 border-2 drop-shadow-2xl px-2 py-6 lg:py-3 lg:px-6 mt-10 text-white">
      <div className="flex flex-col lg:flex-col-reverse items-center">
        <p className="text-xl lg:text-2xl lg:hidden">{dayOfWeek[day]}</p>
        <img src={`http://openweathermap.org/img/wn/${weather.list[id].weather[0].icon}@2x.png`} alt=""
             className="w-14 lg:w-20"/>
      </div>
      <div className="flex lg:flex-col">
        <p className="text-xl hidden lg:text-2xl lg:block">{dayOfWeek[day]}</p>
        <p className="text-xl lg:text-2xl">{Math.round(weather.list[id].main.temp)}°</p>
      </div>

    </div>
  );
};