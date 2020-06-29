import React from 'react';
import styles from '../css/WeatherApp.module.scss';
import { Bubbles } from ".";

export interface ITime { now: string }

export const Time = (props: ITime) => (
    <div className={styles.time}>
        <Bubbles />
        <div className={styles.label}>{props.now}</div>
        <Bubbles />
    </div>
);