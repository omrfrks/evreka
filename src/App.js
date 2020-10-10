import React, { useState, useEffect } from "react";
import EventComponent from "./components/Event";
import "semantic-ui-css/semantic.min.css";
import { Grid, Header } from "semantic-ui-react";
import example from "./data";
import EventDetailsComponent from "./components/EventDetails";
import "./App.css";
import SortAndFilterComponent from "./components/SortandFilter";

function App() {
  //store data at localstorage
  const [data, setData] = useState(
    JSON.parse(window.localStorage.getItem("data")) || null
  );
  const [EventElements, setEventElements] = useState([]);
  const [eventDetails, setEventDetails] = useState(null);
  const [activeEventIndex, setActiveEventIndex] = useState(null);

  let activeEvent = null;

  const handleEventClick = (event, i, e) => {
    setActiveEventIndex(i);
    if (activeEvent) {
      activeEvent.classList.remove("activeEvent");
    }
    e.currentTarget.classList.add("activeEvent");
    activeEvent = e.currentTarget;
    setEventDetails(event);
  };

  const createEventComponents = (data) => {
    const EventElementsTemp = [];
    data.forEach((event, i) => {
      EventElementsTemp.push(
        <EventComponent
          handleClick={(e) => handleEventClick(event, i, e)}
          key={i}
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

  const storageChange = () => {
    setData(JSON.parse(window.localStorage.getItem("data")));
  };

  useEffect(() => {
    if (!window.localStorage.getItem("data")) {
      window.localStorage.setItem("data", JSON.stringify(example.data));
      setData(example.data);
    }
    if (data) {
      setEventDetails(data[activeEventIndex]);
      data.forEach((event) => {
        event.details[0].value = new Date(
          event.details[0].value
        ).toLocaleString();
      });
      createEventComponents(data);
    }
  }, [data]);

  return (
    <div className="App">
      <div className={"upperBar"}></div>
      <div className={"leftBar"}></div>
      <Grid className={"mainContainer"}>
        <Grid.Column width={10} style={{ overflowY: "auto", height: "89vh" }}>
          <Header as="h1">EVENTS</Header>
          <SortAndFilterComponent children={EventElements} />
        </Grid.Column>
        <Grid.Column width={6} className={"eventDetailsContainer"}>
          <Header as="h1">EVENT DETAILS</Header>
          {eventDetails ? (
            <EventDetailsComponent
              event={eventDetails}
              storageChange={storageChange}
              activeEventIndex={activeEventIndex}
            />
          ) : (
            <p>Select event to see details</p>
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default App;
