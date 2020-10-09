import React from "react";
import moment from "moment";
const Sort = ({ children, by }) => {
  const compare = (a, b) => {
    if (by === "date") {
      const date1 = moment(a.props[by], "DD.MM.YYYY hh:mm:ss");
      const date2 = moment(b.props[by], "DD.MM.YYYY hh:mm:ss");
      if (date1.isBefore(date2)) {
        return 1;
      } else if (date1.isAfter(date2)) {
        return -1;
      }
      return 0;
    }
  };

  if (!by) {
    // If no 'sort by property' provided, return original list
    return children;
  }
  return React.Children.toArray(children).sort(compare);
};

export default Sort;
