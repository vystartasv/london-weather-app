import React from 'react';
import styles from '../css/WeatherApp.module.scss';
import { IWeather } from "../interfaces";
import { Constants } from "../common/constants";
import { HeaderTop, HeaderBottom, DayCard } from ".";

export const WeatherApp = () => {
  const [now, setNow] = React.useState<string>("");
  const [weather, setWeather] = React.useState<IWeather>();
  let value = localStorage.getItem("getTheWeather-data");
  if (value && !!!weather) {
    console.log("Cached data")
    const weatherData: IWeather = JSON.parse(value);
    setWeather(weatherData);
  }
  const [runOnce, setRunOnce] = React.useState<boolean>(false);
  const [userTimezone] = React.useState<string>(new Date().toUTCString().split(" ").reverse()[0]);
  const [offset] = React.useState<number>(new Date().getSeconds());
  const [countdown, setCountdown] = React.useState<number>(0);
  const updateOnceAMinute = async () => {
    let currentDate: Date = new Date();
    let hours = currentDate.getHours() < 10 ? `0${currentDate.getHours()}` : `${currentDate.getHours()}`;
    let minutes = currentDate.getMinutes() < 10 ? `0${currentDate.getMinutes()}` : `${currentDate.getMinutes()}`;
    setNow(`${hours}:${minutes} ${userTimezone}`);
  }
  const updateEverySecond = async () => {
    let dt: Date = new Date();
    let s = dt.getSeconds();
    let updateCountdown = s > offset ? 60 - s + offset : -(s - offset);
    setCountdown(updateCountdown);
    if (!runOnce) {
      let hours = dt.getHours() < 10 ? `0${dt.getHours()}` : `${dt.getHours()}`;
      let minutes = dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : `${dt.getMinutes()}`;
      setNow(`${hours}:${minutes} ${userTimezone}`);
    }
  }
  const getTheWeather = async () => {
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${Constants.LONDON.lat}&lon=${Constants.LONDON.lon}&%20&exclude=hourly,minutely&units=metric&appid=${Constants.API_KEY}`;
    let response = await fetch(url);
    if (response.status === 200) {
      let data: IWeather = await response.json();
      setWeather(data);
      localStorage.setItem("getTheWeather-data", JSON.stringify(data));
    } else {
      console.log(`Error ocurred while making request, request status: ${response.status} and message: "${response.statusText}"`);
    }
  }

  React.useMemo(() => {
    if (!runOnce && countdown - offset === 0) {
      updateOnceAMinute();
    }
    if (runOnce && countdown === 0) {
      getTheWeather();
    }

    if (!runOnce && countdown === 0) {
      getTheWeather();
    }
    if (!runOnce && countdown - offset === 0) {
      setRunOnce(true);
      const timer = setInterval(updateOnceAMinute, 60000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  React.useMemo(() => {
    const timer2 = setInterval(updateEverySecond, 1000);
    return () => clearInterval(timer2);
  }, []);

  return (
    <React.StrictMode>
      <div className={styles.weatherApp}>
        <div className={styles.header}>
          <HeaderTop now={now} temperature={weather && weather.current && weather.current.temp ? Math.round(weather.current.temp) : 0} />
          <HeaderBottom countdown={countdown} />
        </div>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            {weather && weather.daily && weather.daily.length > 1 ? weather.daily.slice(1, 6).map((day) => {
              return day.dt !== 0 ?
                <DayCard {...day} key={day.dt} /> : null
            }) : <div className={styles.loading}>Loading...</div>}
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
}
