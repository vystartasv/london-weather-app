import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.module.scss';
import { WeatherApp } from './components';
import * as serviceWorker from './serviceWorker';
try {
  let domElement = document.getElementById('#weather-app');
  if (domElement) {
    const weatherApp = React.createElement(WeatherApp);
    ReactDOM.hydrate(weatherApp, domElement);
  } else {
    if (domElement)
      ReactDOM.unmountComponentAtNode(domElement);
  }
  serviceWorker.unregister();
} catch (err) {
  console.log("Something really went wrong! Error message:" + JSON.stringify(err));
}
