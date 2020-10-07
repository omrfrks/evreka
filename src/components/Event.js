import React from 'react'
import { List, Segment } from 'semantic-ui-react'

const EventComponent = (props) => (
  <Segment onClick={props.handleClick} padded style={props.action==="-" ? {background:"linear-gradient(90deg, rgba(233,207,48,1) 0%, rgba(233,207,48,1) 1.3%, rgba(255,255,255,1) 1.3%)"}:{}}>
    <List relaxed horizontal>
      <List.Item>
        <List.Content>
          <List.Header>Date</List.Header>
          {props.date}
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>Type</List.Header>
          {props.type}
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>Bin Id</List.Header>
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
          <List.Header>Action</List.Header>
          {props.action}
        </List.Content>
      </List.Item>
    </List>
  </Segment>
)
export default EventComponent
