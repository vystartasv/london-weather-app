
import React from 'react';
import styles from '../css/WeatherApp.module.scss';

export interface IHeaderBottom { countdown: number }

export const HeaderBottom = (props: IHeaderBottom) => (
    <div className={styles.bottom}>
        <div className={styles.reloadLabel}>{props.countdown === 0 ? `now` : `Reloading in ${props.countdown}s`}</div>
        <div className={styles.outer}>
            <div className={styles.inner}
                style={{ width: `${props.countdown === 0 ? `100%` : `0%`}`, transition: `${props.countdown === 0 ? `width 500ms linear` : ``}` }}
            ></div>
        </div>
    </div>
);