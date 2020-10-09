import React, { useState } from "react";
import {
  Button,
  Segment,
  Tab,
  List,
  Header,
  Image,
  Modal,
} from "semantic-ui-react";
import { Map, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import ModelComponent from "./Modal";

const EventDetailsComponent = (props) => {
  const noActionHandle = () => {
    const data = JSON.parse(window.localStorage.getItem("data"));
    data[props.activeEventIndex].details[4].value = "No Action Needed";
    window.localStorage.setItem("data", JSON.stringify(data));
    props.storageChange();
  };
  const panes = [
    {
      menuItem: "DETAILS",
      render: () => (
        <Tab.Pane>
          <DetailComponent />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "LOCATION",
      render: () => (
        <Tab.Pane>
          <LocationComponent />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "MEDIA",
      render: () => (
        <Tab.Pane>
          <MediaComponent />
        </Tab.Pane>
      ),
    },
  ];

  const pointerIcon = new L.Icon({
    iconUrl: "https://i.ibb.co/jHWv9BX/Primary-Pin.png",
    iconRetinaUrl: "https://i.ibb.co/jHWv9BX/Primary-Pin.png",
    iconAnchor: [5, 55],
    iconSize: [35, 50],
  });

  const DetailComponent = () => {
    const { event } = props;
    return (
      <List relaxed>
        {event?.details?.map((detail) => (
          <List.Item key={detail.title}>
            <List.Content>
              <List.Header>{detail.title}</List.Header>
              {detail.value}
            </List.Content>
          </List.Item>
        ))}
      </List>
    );
  };

  const LocationComponent = () => {
    const { event } = props;
    const position = [event?.location?.latitude, event?.location?.longitude];
    return (
      <Segment>
        <Header as="h3" textAlign="left">
          Address
        </Header>
        {event?.location ? (
          <Map center={position} zoom={13} style={{ height: "200px" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} icon={pointerIcon}></Marker>
          </Map>
        ) : (
          <p>There is no map information</p>
        )}
      </Segment>
    );
  };

  const MediaComponent = () => {
    const [open, setOpen] = useState(false);
    const { event } = props;
    return (
      <Segment>
        <Modal onClose={() => setOpen(false)} open={open}>
          <Modal.Content>
            <Image
              centered
              fluid
              src={event?.media[0].url}
              label={{
                as: "a",
                basic: true,
                attached: "bottom right",
                icon: "compress",
                onClick: () => setOpen(false),
                size: "huge",
              }}
            />
          </Modal.Content>
        </Modal>
        {event?.media ? (
          event.media[0].type === "image" ? (
            <Image
              fluid
              src={event?.media[0].url}
              label={{
                as: "a",
                basic: true,
                attached: "bottom right",
                icon: "expand",
                onClick: () => setOpen(true),
                size: "huge",
              }}
            />
          ) : (
            <audio controls src={event?.media[0].url}>
              Your browser does not support the
              <code>audio</code> element.
            </audio>
          )
        ) : (
          <p>No Media Content</p>
        )}
      </Segment>
    );
  };

  return (
    <Segment padded textAlign="center">
      {props.event.details[4].value === "-" ? (
        <div>
          <Button
            onClick={noActionHandle}
            style={{
              backgroundColor: "#454F63",
              color: "white",
              width: "14vw",
            }}
          >
            NO ACTION NEEDED
          </Button>
          <ModelComponent
            activeEventIndex={props.activeEventIndex}
            storageChange={props.storageChange}
          />
        </div>
      ) : (
        ""
      )}
      <Tab
        style={{ paddingTop: "2vh" }}
        menu={{ secondary: true, pointing: true }}
        panes={panes}
      />
    </Segment>
  );
};
export default EventDetailsComponent;
