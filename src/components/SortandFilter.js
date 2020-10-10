import React, { useState, useEffect } from "react";
import moment from "moment";
import { Button, Input, Dropdown, Icon } from "semantic-ui-react";
import { filterTopics, dropdownOptions } from "../constants";

const SortAndFilterComponent = ({ children }) => {
  const [sortWay, setSortWay] = useState(1);
  const [filterValue, setfilterValue] = useState("");
  const [sortedChild, setSortedChild] = useState(
    React.Children.toArray(children)
  );
  const [activeDrapdownValue, setActiveDrapdownValue] = useState("date");
  useEffect(() => {
    setSortedChild(React.Children.toArray(children));
  }, [children]);

  const search = (element) => {
    for (const [key, value] of Object.entries(element.props)) {
      if (filterTopics.includes(key)) {
        if (String(value).toLowerCase().includes(filterValue)) {
          return true;
        }
      }
    }
    return false;
  };

  useEffect(() => {
    setSortedChild(React.Children.toArray(children).filter(search));
  }, [filterValue]);

  useEffect(() => {
    setSortedChild(React.Children.toArray(children).sort(compare));
  }, [sortWay]);

  const compare = (element1, element2) => {
    if (activeDrapdownValue === "date") {
      const date1 = moment(
        element1.props[activeDrapdownValue],
        "DD.MM.YYYY hh:mm:ss"
      );
      const date2 = moment(
        element2.props[activeDrapdownValue],
        "DD.MM.YYYY hh:mm:ss"
      );
      if (date1.isBefore(date2)) {
        return sortWay;
      } else if (date1.isAfter(date2)) {
        return sortWay * -1;
      }
      return 0;
    } else {
      const text1 = element1.props[activeDrapdownValue];
      const text2 = element2.props[activeDrapdownValue];
      if (text1 < text2) {
        return sortWay;
      } else if (text1 > text2) {
        return sortWay * -1;
      }
      return 0;
    }
  };

  if (!activeDrapdownValue) {
    // If no 'sort by property' provided, return original list
    return children;
  }
  return (
    <div>
      <Dropdown
        placeholder="Select title to Sort"
        onChange={(e, { value }) => {
          setActiveDrapdownValue(value);
        }}
        search
        selection
        options={dropdownOptions}
      />
      <Button
        onClick={() => {
          setSortWay(sortWay * -1);
        }}
        style={{
          backgroundColor: "#454F63",
          color: "white",
          width: "14vw",
        }}
      >
        Sort
        <Icon
          style={{ float: "right" }}
          name={sortWay === -1 ? "arrow down" : "arrow up"}
        />
      </Button>
      <Input
        style={{ float: "right" }}
        placeholder="Filter..."
        icon="filter"
        onChange={(e) => {
          setfilterValue(e.currentTarget.value.toLowerCase());
        }}
      />
      {sortedChild}
    </div>
  );
};

export default SortAndFilterComponent;
