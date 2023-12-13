import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import "./react-datepicker.css";

const Calendar = ({dateStart, dateEnd}) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    };
    useEffect(() => {
        dateStart(startDate ? startDate.toISOString().split("T")[0] : null);
        dateEnd(endDate ? endDate.toISOString().split("T") : null )
    }, [startDate, endDate])
    return (
      <DatePicker
        selected={startDate ? startDate : new Date() }
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />
    );
  };
export default Calendar;