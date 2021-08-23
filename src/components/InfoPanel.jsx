import React from "react";
import moment from "moment";

//this component will be used to show the info
//about today's weather, retrieved from the API
//moment has been used to convert the current time
//from the timestamp

export default function InfoPanel({ weatherObj }) {
  return (
    <div className="animate__animated animate__backInLeft panel">
      <h1>
        <i className="fas fa-map-marker-alt"></i> {weatherObj.city_name},{" "}
        {weatherObj.country_code}
      </h1>{" "}
      <br />
      <p>{moment.unix(weatherObj.data[0].ts).format("dddd, MMMM Do YYYY")}</p>
      <img
        variant="center"
        src={`https://www.weatherbit.io/static/img/icons/${weatherObj.data[0].weather.icon}.png`}
        style={{ width: "20%", position: "center" }}
        alt={weatherObj.data[0].weather.description}
        title={weatherObj.data[0].weather.description}
      />
      <p>
        {Math.floor(weatherObj.data[0].temp)}°
        <br />
      </p>
      <p>
        {weatherObj.data[0].weather.description}
        <br />
        Humidity: {weatherObj.data[0].rh} %
      </p>
    </div>
  );
}
