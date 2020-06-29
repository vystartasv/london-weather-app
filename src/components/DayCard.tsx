import React from 'react';
import styles from '../css/WeatherApp.module.scss';
import { Constants } from "../common/constants";
import { IDaily } from "../interfaces";

export const DayCard = (props: IDaily) => {
    const [day] = React.useState(new Date(parseInt(`${props.dt}000`)).getDay());
    return (
      <div className={styles.cardItem}>
        <div className={styles.day}>{Constants.WEEKDAYS[day]}</div>
        <div className={styles.temperature}>{Math.round(props.temp.day)}&#176;</div>
        <div className={styles.right}>
          <div className={styles.icon} style={{ backgroundImage: `url('http://openweathermap.org/img/wn/${props.weather[0].icon}@2x.png')` }}></div>
          <div className={styles.description}>{props.weather[0].description}</div>
        </div>
      </div>
    );
  }