import React, { useState } from "react";
import {
  Button,
  Tab,
  Modal,
  Menu,
  Label,
  Segment,
  Header,
  TextArea,
  Loader,
  Dimmer,
} from "semantic-ui-react";
import { actionResponses, actionContent } from "../constants";

const ModelComponent = (props) => {
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedAction, setSelectedAction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resolutionValue, setResolutionValue] = useState("");

  const handleTakeActionClick = () => {
    setLoading(true);
    if (resolutionValue !== "") {
      const action =
        actionContent[selectedAction].props.children[0].props.content;
      const data = JSON.parse(window.localStorage.getItem("data"));
      data[props.activeEventIndex].details[4].value = action;
      window.localStorage.setItem("data", JSON.stringify(data));
      props.storageChange();
    }
    setFirstOpen(false);
    setSecondOpen(true);
    setTimeout(function () {
      setLoading(false);
    }, 1000);
  };

  const handleChange = (event) => {
    setResolutionValue(event.target.value);
  };

  const TakeActionComponent = () => {
    return (
      <div>
        {actionContent[selectedAction]}
        <Header as="h5">Resolution Detail*</Header>
        <TextArea
          onChange={handleChange}
          maxLength="300"
          rows={10}
          style={{ width: "100%", resize: "none", marginBottom: "2vh" }}
          placeholder="Enter resolution detail..."
          value={resolutionValue}
        />
        <Button
          onClick={() => setActiveIndex(0)}
          style={{
            backgroundColor: "#454F63",
            color: "white",
            width: "8vw",
            marginLeft: "30%",
          }}
        >
          BACK
        </Button>
        <Button
          onClick={() => handleTakeActionClick()}
          style={{
            backgroundColor: "#3DA836",
            color: "white",
            width: "12vw",
          }}
        >
          TAKE ACTION
        </Button>
      </div>
    );
  };

  const SelectActionComponent = () => {
    return (
      <div>
        {actionContent.map((action, i) => (
          <Segment
            onClick={() => setSelectedAction(i)}
            key={i}
            size={"mini"}
            className={selectedAction === i ? "activeAction" : "action"}
          >
            {action}
          </Segment>
        ))}
        <Button
          onClick={() => setActiveIndex(1)}
          className={"nextButton"}
          disabled={selectedAction == null ? true : false}
        >
          Next
        </Button>
      </div>
    );
  };
  const modalPanes = [
    {
      menuItem: (
        <Menu.Item
          key="selectAction"
          style={
            activeIndex !== 0
              ? { opacity: ".45", marginLeft: "25%" }
              : { marginLeft: "25%" }
          }
        >
          <Label
            circular
            style={{ backgroundColor: "#172C49", marginRight: "5px" }}
          >
            1
          </Label>
          SELECT ACTION
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          <SelectActionComponent />
        </Tab.Pane>
      ),
    },
    {
      menuItem: (
        <Menu.Item
          key="takeAction"
          style={activeIndex !== 1 ? { opacity: ".45" } : {}}
        >
          <Label
            circular
            style={{ backgroundColor: "#172C49", marginRight: "5px" }}
          >
            2
          </Label>
          TAKE ACTION
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          <TakeActionComponent />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <React.Fragment>
      <Modal
        style={{ width: "30vw", height: "35vh" }}
        onClose={() => setSecondOpen(false)}
        open={secondOpen}
        size="small"
      >
        <Modal.Content>
          {loading ? (
            <Dimmer active={loading} inverted>
              <Loader size="large" />
            </Dimmer>
          ) : resolutionValue !== "" ? (
            actionResponses[0]
          ) : (
            actionResponses[1]
          )}
        </Modal.Content>
      </Modal>
      <Modal
        closeIcon
        style={{ width: "50%" }}
        open={firstOpen}
        trigger={
          <Button
            style={{
              backgroundColor: "#3DA836",
              color: "white",
              width: "14vw",
            }}
          >
            TAKE ACTION
          </Button>
        }
        onClose={() => {
          setFirstOpen(false);
          setActiveIndex(0);
          setSelectedAction(null);
          setResolutionValue("");
        }}
        onOpen={() => setFirstOpen(true)}
      >
        <Modal.Content>
          <Tab
            style={{ paddingTop: "2vh" }}
            menu={{ secondary: true, pointing: true }}
            activeIndex={activeIndex}
            panes={modalPanes}
          />
        </Modal.Content>
      </Modal>
    </React.Fragment>
  );
};

export default ModelComponent;
