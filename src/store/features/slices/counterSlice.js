import {createSlice} from '@reduxjs/toolkit'
import {createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  status: "null",
  error: null,
  bgImage: "night",
  weather: {
    cod: "200",
    message: 0.0179,
    cnt: 96,
    list: [
      {
        dt: 1596632400,
        main: {
          temp: 289.16,
          feels_like: 288.41,
          temp_min: 289.16,
          temp_max: 289.16,
          pressure: 1013,
          sea_level: 1013,
          grnd_level: 1010,
          humidity: 78,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04n"
          }
        ],
        clouds: {
          "all": 100
        },
        wind: {
          speed: 2.03,
          deg: 252,
          gust: 5.46
        },
        visibility: 10000,
        pop: 0.04,
        sys: {
          pod: "n"
        },
        dt_txt: "2020-08-05 13:00:00"
      },
    ],
    city: {
      id: 2643743,
      name: "London",
      coord: {
        lat: 51.5085,
        lon: -0.1258
      },
      country: "GB",
      population: 10000000,
      timezone: 0,
      sunrise: 1568958164,
      sunset: 1569002733
    }
  }
}

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (position) => {
    const {lat, lon} = position;
    let apiKey = "8daf5067b5fa9cb2b12b905a3be2989a";
    // let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`;
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=ru&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
)

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    switchBg: (state, action) => {
      state.bgImage = action.payload;
    },
  },
  extraReducers: {
    [fetchWeather.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchWeather.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.weather = action.payload;
    },
    [fetchWeather.rejected]: (state, action) => {
    }
  }
})

// Action creators are generated for each case reducer function
export const {switchBg} = counterSlice.actions

export default counterSlice.reducer