import { useNavigate } from "react-router-dom";
import "./EventCard.scss";
export default function EventCard({
  event: {
    _id,
    eventTitle,
    artists,
    eventType,
    eventCategory,
    img,
    description,
    homepage,
    dateStart,
    dateEnd,
    timeStart,
    timeEnd,
    venueName,
    venueType,
    venues,
    organizer,
    isActive,
  },
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/event/${_id}`);
  };
  // console.log(artists)
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

  return (
    <div key={_id} onClick={isActive ? handleClick : () => { }} className={!isActive ? 'isCanceled gallery-card' : 'gallery-card'}>
      <div className="gallery-card-image-container">
        {/* <p className="eventType">{venues[0].venueType}</p> */}
        <p className="eventType">{eventType}</p>
        <img className="gallery-card-image" alt="Bild vom Event" src={img} />
      </div>
      <div className="card-content">
        <div className="dateStart">
          {`${dateStart.split("T")[0]} - ${dateEnd.split("T")[0]}`}
        </div>
        {/* <div className="artists">{artists[0].artistName.toUpperCase()} </div> */}
        <div className="artists">
          {artists.length > 0 && formatArtistNames(artists)}
        </div>
        <div className="eventTitle">{eventTitle}</div>

        {/* <div className="organizer">{venueName} {organizer[0] && organizer[0].organization}</div> */}
        {venues.map((venue) => {
          return (
            <p id="venue" key={venue._id}>
              {venue.venueName.toString().includes(venue.venueType) ? `${venue.venueName}` : `${venue.venueType} ${venue.venueName}` }
            </p>
          )
        })}
      </div>
    </div>
  );
}
