import React, { useState, useEffect } from "react";
import moment from "moment";
import { Button, Input } from "semantic-ui-react";

const Sort = ({ children, by }) => {
  const filterTopics = ["date", "type", "id", "issueValue", "action"];
  const [sortWay, setSortWay] = useState(1);
  const [filterValue, setfilterValue] = useState("");
  const [sortedChild, setSortedChild] = useState(
    React.Children.toArray(children)
  );
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
  const compare = (a, b) => {
    if (by === "date") {
      const date1 = moment(a.props[by], "DD.MM.YYYY hh:mm:ss");
      const date2 = moment(b.props[by], "DD.MM.YYYY hh:mm:ss");
      if (date1.isBefore(date2)) {
        return sortWay;
      } else if (date1.isAfter(date2)) {
        return sortWay * -1;
      }
      return 0;
    } else {
      const text1 = a.props[by];
      const text2 = b.props[by];
      if (text1 < text2) {
        return sortWay;
      } else if (text1 > text2) {
        return sortWay * -1;
      }
      return 0;
    }
  };

  if (!by) {
    // If no 'sort by property' provided, return original list
    return children;
  }
  return (
    <div>
      <Button
        onClick={() => {
          setSortedChild(React.Children.toArray(children).sort(compare));
          setSortWay(sortWay * -1);
        }}
        style={{
          backgroundColor: "#454F63",
          color: "white",
          width: "14vw",
        }}
      >
        Sort
      </Button>
      <Input
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

export default Sort;
