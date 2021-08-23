import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import GeoLocation from "./Geolocation";
import InfoPanel from "./InfoPanel";
import DayCard from "./DayCard";
import Loader from "react-loader-spinner";

//this component is the only one in the App.js
//basically at the login it will show the info
//retrieved through the API by getting the geolocation
//info from the system;
//filling the form with name of a city and the state
//will update the page with the new info

export default function Home() {
  const [city, setCity] = useState("");
  const [stateId, setStateId] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  //function to fetch data from the API, takes two params:
  // city and stateId retrieved from the Form
  // a loader will appear while the data are being retrieved
  // the weatherData hook will keep the data and will send the
  // props (as weatherObj) to both InfoPanel and DayCard components.

  const fetchWeather = async (city, stateId) => {
    if (city === "" || stateId === "") {
      alert("Please enter both the parameters");
      return;
    }
    try {
      setLoader(true);
      let response = await fetch(
        `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&country=${stateId}&key=${process.env.REACT_APP_API_KEY}`
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

  return (
    <Container>
      <Row className="d-none d-sm-block">
        <Form
          className="animate__animated animate__fadeInDown"
          onSubmit={async (e) => {
            e.preventDefault();
          }}
        >
          <Row className="mt-5">
            <Col
              sm={{ offset: 1, span: 5 }}
              md={{ offset: 2, span: 4 }}
              lg={{ offset: 2, span: 4 }}
              xl={{ offset: 3, span: 3 }}
              className="mb-3 p-0"
            >
              <Form.Group
                controlId="exampleForm.ControlInput1"
                style={{ width: "90%" }}
              >
                <Form.Control
                  type="text"
                  placeholder="Insert city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col sm={3} md={2} lg={3} xl={2} className="mb-3 mr-5 p-0">
              <Form.Group
                controlId="exampleForm.ControlInput1"
                style={{ width: "90%" }}
              >
                <Form.Control
                  type="text"
                  placeholder="Insert state"
                  value={stateId}
                  onChange={(e) => setStateId(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col
              sm={2}
              md={2}
              lg={1}
              xl={1}
              className="mb-3 p-0 d-flex justify-content-end"
            >
              <Button
                style={{
                  minWidth: "50%",
                  maxWidth: "100%",
                }}
                variant="outline-dark"
                onClick={() => fetchWeather(city, stateId)}
              >
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
      {!weatherData ? (
        <GeoLocation />
      ) : (
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
                  height={500}
                  width={500}
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
                    height={75}
                    width={75}
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
      )}
    </Container>
  );
}
