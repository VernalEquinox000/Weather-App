import React from "react";
import moment from "moment";

//this component is a card which will be used to map
//the weatherData in order to show info about the forecast
//of the next seven days
//moment has been used to convert the current time
//from the timestamp

export default function DayCard({ weatherObj }) {
  return (
    <div
      className="animate__animated animate__backInUp daycard"
      style={{ width: "100%", cover: "100%" }}
    >
      <p>{moment.unix(weatherObj.ts).format("ddd, Do")}</p>
      <img
        variant="top"
        src={`https://www.weatherbit.io/static/img/icons/${weatherObj.weather.icon}.png`}
        style={{ width: "50%", position: "center" }}
        alt={weatherObj.weather.description}
        title={weatherObj.weather.description}
      />
      <p>
        {Math.floor(weatherObj.min_temp)}
        {"° - "}
        {Math.floor(weatherObj.max_temp)}°
      </p>
    </div>
  );
}
