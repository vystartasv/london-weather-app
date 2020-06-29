import React from 'react';
import styles from '../css/WeatherApp.module.scss';

export const Bubbles = () => (
    <>
      <div className={styles.bubble}>
        <div className={styles.first}></div>
      </div>
      <div className={styles.bubble}>
        <div className={styles.second}></div>
      </div>
      <div className={styles.bubble}>
        <div className={styles.third}></div>
      </div>
    </>
  );
  