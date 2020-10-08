import React from "react";
import { Button, Segment, Tab, List, Header, Image } from "semantic-ui-react";
import { Map, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import ModelComponent from "./Modal";

const EventDetailsComponent = (props) => {
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
    iconUrl:
      "https://cdn-sharing.adobecc.com/id/urn:aaid:sc:US:22ab8275-0380-44be-9bda-61aa91baa399;version=0?component_id=a26758b6-8aa6-4c4a-992c-256589600590&api_key=CometServer1&access_token=1602108496_urn%3Aaaid%3Asc%3AUS%3A22ab8275-0380-44be-9bda-61aa91baa399%3Bpublic_7eb007d7084938b7a3ab84275955e214f4be99fd",
    iconRetinaUrl:
      "https://cdn-sharing.adobecc.com/id/urn:aaid:sc:US:22ab8275-0380-44be-9bda-61aa91baa399;version=0?component_id=a26758b6-8aa6-4c4a-992c-256589600590&api_key=CometServer1&access_token=1602108496_urn%3Aaaid%3Asc%3AUS%3A22ab8275-0380-44be-9bda-61aa91baa399%3Bpublic_7eb007d7084938b7a3ab84275955e214f4be99fd",
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
    const { event } = props;
    return (
      <Segment>
        {event?.media ? (
          event.media[0].type === "image" ? (
            <Image src={event?.media[0].url} size="large" />
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
      <Button
        style={{ backgroundColor: "#454F63", color: "white", width: "14vw" }}
      >
        NO ACTION NEEDED
      </Button>
      <ModelComponent />
      <Tab
        style={{ paddingTop: "2vh" }}
        menu={{ secondary: true, pointing: true }}
        panes={panes}
      />
    </Segment>
  );
};
export default EventDetailsComponent;
