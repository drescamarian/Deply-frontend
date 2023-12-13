// EditEvent.jsx
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import { useAuthStore } from "../hooks/useAuthStore"
import SelectComponent from '../components/SelectComponent';
import "./EditEvent.scss"
import ArtistInputs from '../components/ArtistInputs/ArtistInputs';

export default function EditEvent() {

    const { eventId } = useParams();
    const { userData } = useAuthStore();
    // EventContext konsumieren
    const { eventCategories, eventTypes, venueTypes } = useContext(EventContext);

    // State for form inputs
    const [eventType, setEventType] = useState(eventTypes[0]);
    const [venueType, setVenueType] = useState(venueTypes[0]);
    const [organizerName, setOrganizerName] = useState(userData.username);
    const [artists, setArtists] = useState([{
        artistName: '',
        artistType: '',
        artistDescription: '',
        artistHomepage: '',
        artistImg: '',
    }]);
    const navigate = useNavigate();

    const [event, setEvent] = useState({
        eventTitle: '',
        eventCategory: '',
        eventType: '',
        img: '',
        description: '',
        homepage: '',
        dateStart: '',
        dateEnd: '',
        timeStart: '',
        timeEnd: '',
        isActive: true,
        venues: [
            {
                venueName: '',
                venueType: '',
                street: '',
                houseNumber: '',
                zipCode: '',
                city: '',
                additionalAddressInfo: ''
            }
        ],
        artists: [
            {
                artistName: '',
                artistType: '',
                artistImg: '',
                artistHomepage: '',
                artistDescription: ''
            }
        ],
    });




    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`/api/event/${eventId}`);

                // console.log(response.data);
                setEvent(response.data);
                setArtists(response.data.artists);
                setVenueType(response.data.venues[0].venueType);
                setEventType(response.data.eventType);
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };
        fetchEventDetails();
    }, [eventId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEvent({ ...event, [name]: value });
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();

        const inputValues = {
            organizerName,
            eventTitle: event.eventTitle,
            // artistName,
            eventType: eventType || event.eventType || eventTypes[0],
            img: event.img,
            // eventCategory: eevent.eventCategory || eventCategories[0],
            description: event.description,
            homepage: event.homepage,
            dateStart: event.dateStart,
            dateEnd: event.dateEnd,
            timeStart: event.timeStart,
            timeEnd: event.timeEnd,
            venueName: event.venues[0].venueName,
            venueType: venueType || event.venues[0].venueType || venueTypes[0],
            city: event.venues[0].city,
            street: event.venues[0].street,
            houseNumber: event.venues[0].houseNumber,
            additionalAddressInfo: event.venues[0].additionalAddressInfo,
            zipCode: event.venues[0].zipCode,
            artists,
        };

        try {
            // console.log("Request Body before sending: ", inputValues)
            const response = await axios.patch(`/api/event/${eventId}`, inputValues, {
                withCredentials: true
            });
            navigate(`/mydata`)
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteEvent = async () => {
        if (window.confirm('Sind Sie sicher, dass sie dieses Event löschen möchten?')) {
            try {
                const response = await axios.put(`/api/events/deactivate/${eventId}`, {
                    withCredentials: true
                });
                // Handle the response, for example, redirect to another page or update the state
                alert('Event deleted successfully:', response.data.message);
                navigate(`/mydata`)
            } catch (error) {
                // Handle the error, for example, show an error message
                console.error('Error deleting event:', error.response.data);
            }
        }
    };

    const handleVenueChange = (index, field, value) => {
        // Create a new array of venues
        const updatedVenues = event.venues.map((venue, i) => {
            if (i === index) {
                // Update the specific venue object
                return { ...venue, [field]: value };
            }
            return venue;
        });

        // Update the event state with the new venues array
        setEvent(prevEvent => ({ ...prevEvent, venues: updatedVenues }));
    };

    const handleArtistChange = (index, updatedArtist) => {
        const newArtists = artists.map((artist, i) => {
            if (i === index) {
                return { ...artist, ...updatedArtist };
            }
            return artist;
        });
        setArtists(newArtists);
    };

    // Function to add a new artist input
    const addArtistInput = () => {
        setArtists([
            ...artists,
            { artistName: "", artistType: "", artistDescription: "", artistHomepage: "", artistImg: "" }
        ]);
    };

    // Function to remove an artist input
    const removeArtistInput = (index) => {
        const newArtists = [...artists];
        newArtists.splice(index, 1);
        setArtists(newArtists);
    };

    // Function to ensure the URL starts with http:// or https://
    const formatURL = (url) => {
        if (!url) return '';

        // Check if URL already starts with http:// or https://
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }

        // Prepend https:// if it's missing
        return `https://${url}`;
    };

    const handleEventTypeChange = (evt) => {
        setEventType(evt.target.value);
    };

    const handleVenueTypeChange = (evt) => {
        setVenueType(evt.target.value);
    };

    const handleOrganizerNameChange = (evt) => {
        setOrganizerName(evt.target.value);
    };

    const formattedEventHomepage = formatURL(event.homepage);
    const formattedImgUrl = formatURL(event.img);

    return (

        <section className="event-details-container__section" >
            <h2>Event bearbeiten</h2>

            <div className="event-details-container">

                <div className="img-container">
                    <img className="event-image" alt="Bild vom Event" src={formattedImgUrl} />
                </div>

                <article className="event-details__article" >
                    <form id="editEvent_form" onSubmit={handleSaveChanges}>

                        <div className="event-details-content" >

                            <label htmlFor="organizerName">Veranstalter</label>

                            <input name="organizerName" type="text" placeholder="Veranstalter" value={organizerName} onChange={handleOrganizerNameChange} />


                            {/* {event.venues.map((venue, index) => {
                                return (
                                    <div key={venue._id}>
                                        <label htmlFor="venueName">Veranstaltungsort</label>
                                        <input name="venueName" type="text" placeholder="Veranstaltungsort" value={venue.venueName} onChange={(e) => handleVenueChange(index, 'venueName', e.target.value)} />
                                    </div>
                                )
                            })} */}

                            <div className="date-and-time-container">

                                <div className="dates-container">
                                    <label htmlFor="dateStart">Datum</label>
                                    <input className="date-start_input" name="dateStart" type="date" required value={event.dateStart.split("T")[0]} onChange={handleInputChange} />

                                    <pre> - </pre>

                                    <input className="date-end_input" name="dateEnd" type="date" required value={event.dateEnd.split("T")[0]} onChange={handleInputChange} />
                                </div>

                                <pre className="pipe"> | </pre>

                                <div className='hours-container'>
                                    <label htmlFor="timeStart">Startzeit </label>
                                    <input name="timeStart" type="time" required value={event.timeStart} onChange={handleInputChange} />

                                    <pre> - </pre>
                                    <label htmlFor="timeEnd">Endzeit </label>
                                    <input name="timeEnd" type="time" required value={event.timeEnd} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="event-title-container">
                                {/* <h2>Eventname</h2> */}
                                <label htmlFor="eventTitle">Title </label>
                                <input id="eventName_input" name="eventTitle" type="text" required placeholder="Eventname" value={event.eventTitle} onChange={handleInputChange} />
                            </div>
                            <label htmlFor="img">Bild-URL - </label>
                            <input id="event-image-input" name="img" type="text" placeholder="Bild-URL" value={event.img} onChange={handleInputChange} />
                            <label htmlFor="description">Description</label>
                            <textarea
                                className="eventDescription_textarea"
                                size="sm"
                                required
                                name="description"
                                placeholder="Geben Sie eine Beschreibung für diese Veranstaltung an"
                                rows="5"
                                // cols="5"
                                maxLength="2000"
                                value={event.description}
                                onChange={handleInputChange}
                            />
                            <div className="category-and-eventType-container">
                                <SelectComponent
                                    title="Event-Typ"
                                    values={eventTypes}
                                    onChange={handleEventTypeChange}
                                    selected={event.eventType}
                                />

                                <SelectComponent
                                    title="Art des Veranstaltungsorts"
                                    values={venueTypes}
                                    onChange={handleVenueTypeChange}
                                    selected={event.venues[0].venueType}
                                />
                            </div>

                            {event.venues.map((venue, index) => {
                                return (
                                    <div id="event-details-content-footer">
                                        <div key={venue._id} id="venue-info" >

                                            <div id="venue-address-container">

                                                <p>
                                                    <span className="font-weight-bold font-size-big">Adresse</span>
                                                </p>
                                                <label htmlFor="venueName"> Veranstaltungsort</label>
                                                <input name="venueName" type="text" placeholder="Veranstaltungsort" value={venue.venueName} onChange={(e) => handleVenueChange(index, 'venueName', e.target.value)} />
                                                {/* <label htmlFor="venueType"> Veranstaltungsorttyp</label>
                                                <input name="venueType" type="text" placeholder="Veranstaltungsorttyp" required value={venue.venueType} onChange={(e) => handleVenueChange(index, 'venueType', e.target.value)} /> */}

                                                <div>
                                                    <label htmlFor="street">Straße</label>
                                                    <input name="street" type="text" placeholder="Straße" required value={venue.street} onChange={(e) => handleVenueChange(index, 'street', e.target.value)} />
                                                    <label htmlFor="houseNumber">Hausnummer</label>
                                                    <input className="no-border-left" name="houseNumber" type="text" placeholder="Hausnummer" required value={venue.houseNumber} onChange={(e) => handleVenueChange(index, 'houseNumber', e.target.value)} />
                                                </div>

                                                <div>
                                                    <label htmlFor="zipCode">PLZ</label>
                                                    <input name="zipCode" type="text" placeholder="Postleitzahl" required value={venue.zipCode} onChange={(e) => handleVenueChange(index, 'zipCode', e.target.value)} />
                                                    <label htmlFor="city">Stadt</label>
                                                    <input className="no-border-left" name="city" type="text" placeholder="Stadt" required value={venue.city} onChange={(e) => handleVenueChange(index, 'city', e.target.value)} />
                                                </div>

                                                <div>
                                                    <label htmlFor="additionalAddressInfo">Zusätzliche Adressinformationen</label>
                                                    <input name="additionalAddressInfo" type="text" placeholder="Adresszusatz" value={venue.additionalAddressInfo} onChange={(e) => handleVenueChange(index, 'additionalAddressInfo', e.target.value)} />

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                );
                            })}

                            {/* <div id="event-homepage">
                                    <span className="font-weight-bold">Event-Homepage:</span>
                                    <a href={formattedEventHomepage} target="_self" rel="noopener noreferrer">
                                        {event.homepage}
                                        Event Homepage
                                    </a>
                                </div> */}
                            <label htmlFor="homepage">Startseite - </label>
                            <input id="homepage-URL-input" name="homepage" type="text" placeholder="Event Homepage" value={event.homepage} onChange={handleInputChange} />


                            <p className="font-weight-bold font-size-big">
                                <span className="font-weight-bold">Künstler:</span>
                                {/* {event.artist} */}
                            </p>
                            <div>
                                {artists.map((artist, index) => {
                                    return (
                                        <div key={index}>
                                            <ArtistInputs
                                                artist={artist}
                                                index={index}
                                                onArtistChange={handleArtistChange}
                                            />

                                            {index > 0 && (
                                                <button type="button" onClick={() => removeArtistInput(index)}>
                                                    Entfernen
                                                </button>
                                            )}
                                        </div>
                                    )
                                })}

                                <button type="button" onClick={addArtistInput}>+ Hinzufügen</button>
                            </div>

                        </div>
                        <div className='filter_button'>
                            <button onClick={handleDeleteEvent}>{event.isActive ? 'Deaktivieren' : 'Aktivieren'}</button>
                            <button type="submit" >Speichern</button>
                        </div>
                    </form>
                </article>
            </div>

        </section >
    );
}