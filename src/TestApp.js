import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TestApp() {
  const [selectedDate, setSelectedDate] = React.useState(null);

  return (
    <div>
      <DatePicker
        selected={new Date(selectedDate)}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy-MMM-dd HH:mm"
        showTimeInput
      />
    </div>
  );
}

export default TestApp;
