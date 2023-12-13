import { createContext, useState, useEffect } from "react";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  // TO DO: Fetch eventTypes, venueTypes and eventCategories from an API

  // const [eventTypes, setEventTypes] = useState("");
  // const [venueTypes, setVenueTypes] = useState("");

  // useEffect(() => {
  // ...
  // }, []);

  // OR
  // define them here, for example:
  const eventCategories = ["Kunst", "Musik", "Clubs", "Sport", "Bildung", "Politik"]
  const eventTypes = ["Ausstellung", "Auktion", "Messe", "Vortrag", "Festival"];
  const venueTypes = ["Museum", "Galerie", "Messe", "Auktionshaus", "Akademie"];

  const eventCategoriesFilter = ["All", "Kunst", "Musik", "Clubs", "Sport", "Bildung", "Politik"]
  const eventTypesFilter = ["All", "Ausstellung", "Auktion", "Messe", "Vortrag", "Festival"];
  const venueTypesFilter = ["All", "Museum", "Galerie", "Messe", "Auktionshaus", "Akademie"];


  return (
    <EventContext.Provider value={{ eventCategories, eventCategoriesFilter, eventTypes, eventTypesFilter, venueTypes, venueTypesFilter }}>
      {children}
    </EventContext.Provider>
  );
};
