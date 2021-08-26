//api.openweathermap.org/data/2.5/weather?q=pune&appid=e76ed151a2515e160e10e9ee40bbd2a9

import React, { useState, useEffect } from 'react'
import WeatherCard from './WeatherCard';
const Weather = () => {
    const [searchValue, setSearchValue] = useState("Chandigarh");
    const [tempInfo, setTempInfo] = useState({})
    const getWwatherInfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=e76ed151a2515e160e10e9ee40bbd2a9`
            const res = await fetch(url);
            const data = await res.json();
            const { temp, pressure, humidity } = data.main;
            const { main: weatherMood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;

            const myWeatherInfo = {
                temp, humidity, pressure, weatherMood, name, speed, sunset, country
            }
            setTempInfo(myWeatherInfo);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getWwatherInfo();
    }, [])

    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input type="search" placeholder="search..."
                        autoFocus id="search"
                        className="searchTerm"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)} />
                    <button className="searchButton" type="button" onClick={getWwatherInfo}>
                        Search
                    </button>
                </div>
            </div>
            <WeatherCard tempInfo={tempInfo}/>
        </>
    )
}

export default Weather
