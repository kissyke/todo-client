import React from "react";
import "./EditForm.css";
import DatePicker, { setDefaultLocale } from "react-datepicker";
import hu from "date-fns/locale/hu";
import "react-datepicker/dist/react-datepicker.css";
setDefaultLocale("hu", hu);

function EditForm({
  handleSubmit,
  handleReset,
  name,
  selectedDate,
  setName,
  setSelectedDate,
  isEditing,
}) {
  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <div className="form-control">
        <input
          type="text"
          className="name-box"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="What to do..."
        />
        <div className="date-box">
          <DatePicker
            selected={selectedDate ? new Date(selectedDate) : null}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy. MMM dd. HH:mm"
            showTimeInput
            timeFormat="HH:mm"
            locale={hu}
            placeholderText="When..."
            isClearable
          />
        </div>
        <button type="submit" className="submit-btn">
          {isEditing ? "update" : "add"}
        </button>
        <button type="reset" className="reset-btn">
          cancel
        </button>
      </div>
    </form>
  );
}

export default EditForm;
