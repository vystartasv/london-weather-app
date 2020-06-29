
import React from 'react';
import styles from '../css/WeatherApp.module.scss';
import { Time } from ".";

export interface IHeaderTop { temperature: number, now: string }

export const HeaderTop = (props: IHeaderTop) => (
    <div className={styles.top}>
        <div className={styles.city}>London</div>
        <Time now={props.now} />
        <div className={styles.temperature}>{props.temperature}&#176;</div>
    </div>
);