import L from "leaflet";
import React from "react";
import {
  Header,
  Icon,
} from "semantic-ui-react";

export const pointerIcon = new L.Icon({
  iconUrl: "https://i.ibb.co/jHWv9BX/Primary-Pin.png",
  iconRetinaUrl: "https://i.ibb.co/jHWv9BX/Primary-Pin.png",
  iconAnchor: [5, 55],
  iconSize: [35, 50],
});

export const STRINGS = {
  NO_ACTION: "No Action Needed",
  NO_LOCATION: "There is no map information",
  NO_MEDIA: "No Media Content",
};

export const LISTTITLES = {
  DATE: "Date",
  TYPE: "Type",
  BIN_ID: "Bin Id",
  ACTION: "Action",
};

export const actionResponses = [
  <div className={"actionResponse"}>
    <Icon size="huge" name="check circle outline" color="green" />
    <Header as="h2" style={{ color: "#3DA836" }}>
      ACTION HAS BEEN TAKEN!
    </Header>
    <p>You can see the action details from details tab.</p>
  </div>,
  <div className={"actionResponse"}>
    <Icon size="huge" name="times circle outline" color="red" />
    <Header as="h2" style={{ color: "#D92323" }}>
      A PROBLEM OCCURED!
    </Header>
    <p>We cannot continue due to a problem. Please try again later.</p>
  </div>,
];

export const actionContent = [
  <div>
    <Header as="h4" className={"actionContent"} content={"Mark As Resolved"} />
    <p>Mark this event as resolved and enter the details of the resolution.</p>
  </div>,
  <div>
    <Header as="h4" className={"actionContent"} content={"Change Asset"} />
    <p>Change the asset with another one.</p>
  </div>,
];

export const filterTopics = ["date", "type", "id", "issueValue", "action"];

export const dropdownOptions = [
    { key: 1, text: "Date", value: "date" },
    { key: 2, text: "Type", value: "type" },
    { key: 3, text: "Bin id", value: "id" },
    { key: 4, text: "Action", value: "action" },
  ];
