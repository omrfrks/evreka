import React from "react";
import { List, Segment } from "semantic-ui-react";
import { LISTTITLES } from "../constants";
const EventComponent = (props) => (
  <Segment
    onClick={props.handleClick}
    padded
    className={props.action === "-" ? "noActionEvent" : ""}
  >
    <List relaxed horizontal>
      <List.Item>
        <List.Content>
          <List.Header>{LISTTITLES.DATE}</List.Header>
          {props.date}
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>{LISTTITLES.TYPE}</List.Header>
          {props.type}
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>{LISTTITLES.BIN_ID}</List.Header>
          {props.id}
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>{props.issueHeader}</List.Header>
          {props.issueValue}
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>{LISTTITLES.ACTION}</List.Header>
          {props.action}
        </List.Content>
      </List.Item>
    </List>
  </Segment>
);
export default EventComponent;
