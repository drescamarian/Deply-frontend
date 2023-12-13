import React, { useState } from 'react';

import "./ArtistInputs.scss"

const ArtistInputs = ({ artist, index, onArtistChange }) => {

    // console.log(artist)

    const handleChange = (e) => {
        const updatedArtist = { ...artist, [e.target.name]: e.target.value };
        onArtistChange(index, updatedArtist);
    };

    return (
        <div id="artist-inputs">
            <div>
                <input
                    name="artistName"
                    required
                    value={artist.artistName}
                    onChange={handleChange}
                    placeholder="Künstlername"
                    className='artist-input'
                />
                <input
                    name="artistType"
                    value={artist.artistType}
                    onChange={handleChange}
                    placeholder="Genre"
                />
                <input
                    name="artistHomepage"
                    value={artist.artistHomepage}
                    onChange={handleChange}
                    placeholder="Künstler Homepage"
                />
                <input
                    name="artistImg"
                    value={artist.artistImg}
                    onChange={handleChange}
                    placeholder="Bild vom Künstler"
                />
            </div>
            <div>
                <textarea
                    size="sm"
                    placeholder="Beschreibung vom Künstler"
                    // rows="5"
                    // cols="20"
                    maxLength="2000"
                    name="artistDescription"
                    value={artist.artistDescription}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

export default ArtistInputs;
