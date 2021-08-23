import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import InfoPanel from "./InfoPanel";
import DayCard from "./DayCard";
import Loader from "react-loader-spinner";

//this component will retrieve the latitude and longitude
//and will show the info as soon as the window loads
//(allowing to use the geolocation of the system would be great!)

export default function GeoLocation() {
  const [weatherData, setWeatherData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  //a function to fetch data from the API, takes two params:
  // latitude and longitude which are retrieved from the position;
  // a script has been (found, taken, modified and)
  // gently implemented in order to use geolocation, thus
  // getting the proper latitude and longitude from the system.
  // a loader will appear while the data are being retrieved
  // the weatherData hook will keep the data and will send the
  // props (as weatherObj) to both InfoPanel and DayCard components.

  const fetchWeather = async (latitude, longitude) => {
    try {
      setLoader(true);
      let response = await fetch(
        `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${process.env.REACT_APP_API_KEY}`
      );
      //console.log(response);
      if (response.statusText === "OK") {
        let weather = await response.json();
        console.log(weather);
        setWeatherData(weather);
        setLoader(false);
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.log(error);
      setError(error);
      setLoader(false);
      setTimeout(() => {
        "Requested timeout";
      }, 3000);
    }
  };

  let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    let crd = pos.coords;
    fetchWeather(crd.latitude, crd.longitude);
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      alert("Sorry, service not available!");
    }
  }, []);

  return (
    <>
      <Row className="mt-5">
        <Col
          className="px-0 pb-0"
          xs={{ offset: 1, span: 10 }}
          md={{ offset: 2, span: 8 }}
          xl={{ offset: 3, span: 6 }}
        >
          {loader ? (
            <Loader
              type="BallTriangle"
              color="#000000"
              height={250}
              width={250}
              timeout={3000} //3 secs
            />
          ) : (
            <>
              {error && <alert>{error}</alert>}
              {weatherData && <InfoPanel weatherObj={weatherData} />}
            </>
          )}
        </Col>
      </Row>
      <Row className="mt-5 d-flex   justify-content-center">
        {loader ? (
          [0, 1, 2, 3, 4, 5, 6].map((e, index) => (
            <Col
              key={index}
              className="mb-2 px-0"
              xs={6}
              sm={3}
              md={2}
              lg={1}
              xl={1}
              style={{
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              <Loader
                type="BallTriangle"
                color="#000000"
                height={50}
                width={50}
                timeout={3000} //3 secs
              />
            </Col>
          ))
        ) : (
          <>
            {error && <alert>{error}</alert>}
            {weatherData &&
              weatherData.data
                .map((e, index) => (
                  <Col
                    key={index}
                    className="mb-2 px-0"
                    xs={6}
                    sm={3}
                    md={2}
                    lg={1}
                    xl={1}
                    style={{
                      marginLeft: "10px",
                      marginRight: "10px",
                    }}
                  >
                    <DayCard weatherObj={e} />
                  </Col>
                ))
                .slice(1, 8)}
          </>
        )}
      </Row>
    </>
  );
}
