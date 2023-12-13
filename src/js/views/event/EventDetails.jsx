
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import "./EventDetails.scss"



export default function EventDetails() {
    const { eventId } = useParams();
    const [event, setEvent] = useState({
        _id: "",
        eventTitle: "",
        artist: "",
        eventCategory: "",
        eventType: "",
        img: "",
        description: "",
        homepage: "",
        dateStart: "",
        dateEnd: "",
        timeStart: "",
        timeEnd: "",
        organizerId: "",
        venues: [],
        artists: [],
        createdAt: "",
        updatedAt: ""
    }
    );

    // TO DO: Add Loading

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`/api/event/${eventId}`);
                setEvent(response.data);
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };
        fetchEventDetails();
    }, [eventId]);


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

    const formattedEventHomepage = formatURL(event.homepage);

    const formatArtistNames = (artists) => {
        // Check if artists is defined and has elements
        if (!artists || artists.length === 0) {
            return "Keine Künstler verfügbar";
        }
        if (artists.length > 3) {
            return "MEHRERE KÜNSTLER";
        }
        return artists.map(artist => {
            // Check if artistName is defined and a string before converting to uppercase
            return artist.artistName ? artist.artistName.toUpperCase() : "Kein Künstlername angegeben";
        }).join(', ');
    };


    // TO DO: Labels (bzw <span> Elemente, z.B. "Von:", "Bis:", etc) löschen, wenn alles richtig positioniert ist.
    return (
        <section className="event-details-container__section" >

            {/* <h2>Event Details</h2> */}

            <div className="event-details-container">
                <div className="img-container">
                    <img className="event-image" alt="Bild vom Event" src={event.img} />
                </div>


                <article className="event-details__article" >
                    <div className="event-details-content" >

                        {/* TO DO: Später Organizer anzeigen (vor allem für Musik-Kategorie) */}
                        {/* {event.venues.map((venue) => {
                            return (
                                <p id="venue" key={venue._id}>
                                    {venue.venueName}
                                </p>
                            )
                        })} */}


                        <div className="date-and-time-container">
                            <div className="dates-container">
                                <p className="date-start" >
                                    {/* <span className="font-weight-bold">Von:</span> */}
                                    {`${event.dateStart.split("T")[0]}`}

                                </p>

                                <pre> - </pre>

                                <p className="date-end" >
                                    {/* <span className="font-weight-bold">Von:</span> */}
                                    {`${event.dateEnd.split("T")[0]}`}

                                </p>
                            </div>

                            <pre className="pipe"> | </pre>


                            <div className="hours-container">
                                <p className="time-start" >
                                    {/* <span className="font-weight-bold">Von:</span> */}
                                    {`${event.timeStart}`}
                                </p>

                                <pre> - </pre>

                                <p className="time-end" >
                                    {/* <span className="font-weight-bold">Von:</span> */}
                                    {`${event.timeEnd}`}
                                </p>
                            </div>

                        </div>




                        <div className="artists">
                            {formatArtistNames(event.artists)}
                        </div>




                        <h2 id="event-title" >
                            {/* <span className="font-weight-bold">Event Title:</span> */}
                            {event.eventTitle}
                        </h2>

                        {/* <span className="font-weight-bold">
                        Beschreibung:
                    </span> */}
                        <p id="event-description">
                            {event.description}
                        </p>

                        {/* <p id="event-type" >
                        <span className="font-weight-bold">Event Typ:</span>
                        {event.eventType}
                    </p> */}

                        {/* <p id="event-category">
                        <span className="font-weight-bold">Kategorie:</span>
                        {event.eventCategory}
                    </p> */}

                        <div id="event-details-content-footer">
                            {event.venues.map((venue) => {
                                return (
                                    <div id="venue-info" key={venue._id}>
                                        <p id="venue-name" >
                                            {/* <span className="font-weight-bold">Ort:</span> */}
                                            {venue.venueName.toString().includes(venue.venueType) ? `${venue.venueName}` : `${venue.venueType} ${venue.venueName}` }
                                        </p>

                                        {/* <p id="venue-type" >
                                    <span className="font-weight-bold">Typ von Veranstaltungsort:</span>
                                    {venue.venueType}
                                    </p> */}

                                        <div id="venue-address-container">
                                            {/* <span className="font-weight-bold">Adresse:</span> */}
                                            {(venue.street && venue.houseNumber) && `${venue.street} ${venue.houseNumber}`}
                                            <br></br>
                                            {venue.zipCode} {venue.city}

                                            {
                                                venue.additionalAddressInfo && (
                                                    <p id="additional-address-info">
                                                        {/* <span className="font-weight-bold">
                                                        Adresszusatz:
                                                    </span> */}
                                                        {venue.additionalAddressInfo}
                                                    </p>
                                                )
                                            }
                                        </div>

                                    </div>
                                );
                            })}
                        </div>

                        <div id="event-homepage">
                            {/* <span className="font-weight-bold">Event-Homepage:</span> */}
                            <a href={formattedEventHomepage} target="_blank" rel="noopener noreferrer">
                                {/* {event.homepage} */}
                                Event Homepage
                            </a>
                        </div>

                        {/* <p className="font-weight-bold font-size-big">
                            <span className="font-weight-bold">Artist(s):</span>
                        </p> */}

                        {/* {event.artists.map((artist) => {
                            return (
                                <div id="artist-info-container" key={artist._id}>
                                    <p id="artist-name" >
                                        <span className="font-weight-bold">Artist Name: </span>
                                        {artist.artistName}
                                    </p>
                                    <p id="artist-type" >
                                        <span className="font-weight-bold">Artist Type: </span>
                                        {artist.artistType}
                                    </p>
                                    <p id="artist-homepage" >
                                        <span className="font-weight-bold">Artist Homepage: </span>
                                        {artist.artistHomepage}
                                    </p>
                                    <p id="artist-description" >
                                        <span className="font-weight-bold">Artist Description: </span>
                                        {artist.artistDescription}
                                    </p>


                                    <p>Artist image</p>
                                    <img src={artist.artistImg} id="artist-img" width="200em" />
                                </div>
                            );
                        })} */}
                    </div>
                </article>
            </div>
        </section >
    )
}