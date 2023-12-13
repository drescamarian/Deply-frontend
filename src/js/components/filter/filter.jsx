
import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SelectComponent from '../SelectComponent.jsx';
import { EventContext } from '../../context/EventContext.jsx';
import ReactDatePicker from 'react-datepicker';
import './filter.scss';
import '../datePiker/react-datepicker.css';

const Filter = ({ open, setOpen, setSearch_btn, setEventType, setVenueType, eventType, venueType, dateStart, setDateStart, dateEnd, setDateEnd }) => {
    const { eventCategoriesFilter, eventTypesFilter, venueTypesFilter, } = useContext(EventContext);
    const [eventCategory, setEventCategory] = useState("");

    const onChange = (dates) => {
        const [start, end] = dates;
        setDateStart(start);
        setDateEnd(end);
    };

    const handleEventCategoryChange = (evt) => {
        setEventCategory(evt.target.value);
    };

    const handleEventTypeChange = (evt) => {
        setEventType(evt.target.value);
    };

    const handleVenueTypeChange = (evt) => {
        setVenueType(evt.target.value);
    };
    const handleClose = () => setOpen(false);
    const handleSubmit = () => {
        setSearch_btn(true);
        handleClose();
    }

    const handleClear = () => {
        setSearch_btn(true);
        setEventType("All");
        setVenueType("All");
        setDateStart("");
        setDateEnd("");
        handleClose();
    }


    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box className="modal_filter">
                <h2>Filter</h2>
                <button className='close' onClick={handleClose}>X</button>
                <ReactDatePicker
                    selected={dateStart ? dateStart : new Date()}
                    dateFormat="dd/MM/yyyy"
                    onChange={onChange}
                    startDate={dateStart}
                    endDate={dateEnd}
                    selectsRange
                    inline
                />
                {/* <SelectComponent 
                    title="Event-Kategorie"
                    value={eventCategory}
                    values={eventCategoriesFilter}
                    onChange={handleEventCategoryChange}
                /> */}

                <SelectComponent
                    title="Typ von Event"
                    values={eventTypesFilter}
                    onChange={handleEventTypeChange}
                    selected={eventType}
                />
                <SelectComponent
                    title="Veranstaltungsort"
                    values={venueTypesFilter}
                    onChange={handleVenueTypeChange}
                    selected={venueType}
                />
                <div className='modal_buttons'>
                    <button onClick={handleClear}>clear</button>
                    <button onClick={handleSubmit}>Suchen</button>
                </div>
            </Box>
        </Modal>
    )
};

export default Filter;