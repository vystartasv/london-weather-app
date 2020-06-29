export interface IWeather {
    lat: number;
    lon: number;
    timezone: string;
    timezoneOffset: number;
    current: ICurrent;
    daily: IDaily[];
}

export interface ICurrent {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feelsLike: number;
    pressure: number;
    humidity: number;
    dewPoint: number;
    uvi: number;
    clouds: number;
    visibility: number;
    windSpeed: number;
    windDeg: number;
    weather: IConditions[];
    rain: IRain;
}

export interface IRain {
    the1H: number;
}

export interface IConditions {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface IDaily {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: ITemp;
    feelsLike: IFeelsLike;
    pressure: number;
    humidity: number;
    dewPoint: number;
    windSpeed: number;
    windDeg: number;
    weather: IConditions[];
    clouds: number;
    rain?: number;
    uvi: number;
}

export interface IFeelsLike {
    day: number;
    night: number;
    eve: number;
    morn: number;
}

export interface ITemp {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}