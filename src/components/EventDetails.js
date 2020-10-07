import React from "react";
import { Button, Segment, Tab, List, Header, Image } from "semantic-ui-react";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

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

    const DetailComponent = () => {
        const { event } = props;
        return (
            <List relaxed>
                {
                    event?.details?.map((detail) => <List.Item key={detail.title}>
                        <List.Content>
                            <List.Header>{detail.title}</List.Header>
                            {detail.value}
                        </List.Content>
                    </List.Item>)
                }
            </List>
        );
    };
    const LocationComponent = () => {
        const { event } = props;
        const position = [event.location.latitude, event.location.longitude];
        return (
            <Segment>
                <Header as='h3' textAlign="left">Address</Header>
                <Map center={position} zoom={13} style={{ height: "200px" }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    <Marker position={position}>
                        <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                    </Marker>
                </Map>
            </Segment>
        );
    };
    const MediaComponent = () => {
        const { event } = props;
        return (
            <Segment>
                {event?.media ? event.media[0].type === "image" ? <Image src={event?.media[0].url} size='large' />  : <audio
                    controls
                    src={event?.media[0].url} >
                    Your browser does not support the
            <code>audio</code> element.
    </audio> : <p>No Media Content</p> }
            </Segment>
        )
    };

    return (
        <Segment padded textAlign="center">
            <Button
                style={{ backgroundColor: "#454F63", color: "white", width: "14vw" }}
            >
                NO ACTION NEEDED
    </Button>
            <Button
                style={{ backgroundColor: "#3DA836", color: "white", width: "14vw" }}
            >
                TAKE ACTION
    </Button>
            <Tab
                style={{ paddingTop: "2vh" }}
                menu={{ secondary: true, pointing: true }}
                panes={panes}
            />
        </Segment>
    )
};
export default EventDetailsComponent;
