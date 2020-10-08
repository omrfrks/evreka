import React, { useState, useEffect } from "react";
import EventComponent from "./components/Event";
import "semantic-ui-css/semantic.min.css";
import { Grid, Header } from "semantic-ui-react";
import data from "./data";
import EventDetailsComponent from "./components/EventDetails";
import "./App.css";

function App() {
  const [EventElements, setEventElements] = useState([]);
  const [eventDetails, setEventDetails] = useState({});
  let activeEvent = null;
  const handleEventClick = (event, i, e) => {
    if (activeEvent) {
      activeEvent.classList.remove("activeEvent");
    }
    e.currentTarget.classList.add("activeEvent");
    activeEvent = e.currentTarget;
    setEventDetails(event);
  };

  const createEventComponents = (data) => {
    const EventElementsTemp = [];
    data.data.forEach((event, i) => {
      EventElementsTemp.push(
        <EventComponent
          handleClick={(e) => handleEventClick(event, i, e)}
          key={[activeEvent, i]}
          date={event.details[0].value}
          type={event.type}
          id={event.id}
          issueHeader={event.type}
          issueValue={event.details[1].value}
          action={event.details[4].value}
        />
      );
    });
    setEventElements(EventElementsTemp);
  };
  useEffect(() => {
    data.data.forEach((event) => {
      event.details[0].value = new Date(
        event.details[0].value
      ).toLocaleString();
    });
    createEventComponents(data);
  }, []);
  return (
    <div
      className="App"
      style={{
        position: "relative",
        backgroundColor: "#EBECEF",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          backgroundColor: "#172C49",
          width: "100%",
          height: "9vh",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          backgroundColor: "#172C49",
          width: "4vw",
          height: "100vh",
          overflow: "hidden",
        }}
      ></div>
      <Grid
        style={{ marginLeft: "4vw", paddingTop: "13vh", marginRight: "1vw" }}
      >
        <Grid.Column width={10} style={{ overflowY: "auto", height: "89vh" }}>
          <Header as="h1">EVENTS</Header>
          {EventElements}
        </Grid.Column>
        <Grid.Column width={6} style={{ overflowY: "auto", height: "89vh" }}>
          <Header as="h1">EVENT DETAILS</Header>
          <EventDetailsComponent event={eventDetails} />
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default App;
