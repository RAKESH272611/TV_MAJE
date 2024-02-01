// ShowDetails.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieBooking from './MovieBooking';
import '../css/ShowDetails.css';
import { useParams } from 'react-router-dom';

const ShowDetails = () => {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [previousEpisode, setPreviousEpisode] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const removeTags = (html) => {
    return html.replace(/<[^>]*>/g, ''); // Remove all HTML tags
  };

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const showResponse = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        setShowDetails(showResponse.data);

        if (showResponse.data._links && showResponse.data._links.previousepisode) {
          const prevEpisodeResponse = await axios.get(showResponse.data._links.previousepisode.href);
          setPreviousEpisode(prevEpisodeResponse.data);
        }
      } catch (error) {
        console.error('Error fetching show details:', error);
      }
    };

    fetchShowDetails();
  }, [id]);

  const handleBookTickets = () => {
    // Open the booking form
    setIsBookingOpen(true);
  };

  const handleBookingClose = () => {
    // Close the booking form
    setIsBookingOpen(false);
  };

  return (
    <div className="show-details-container">
      <h1>Show Details</h1>
      {(showDetails && !isBookingOpen) ? (
        <div className="details-wrapper">
          <div className="show-details">
            <h2 className='show-name'>{showDetails.name}</h2>
            {showDetails.image && (
              <img
                src={showDetails.image.original || showDetails.image.medium}
                alt={showDetails.name}
                className="show-image"
              />
            )}
            <p>Type: {showDetails.type}</p>
            <p>Language: {showDetails.language}</p>
            <p>Genres: {showDetails.genres.join(', ')}</p>
            <p>Runtime: {showDetails.runtime} minutes</p>
            <p>Summary: {removeTags(showDetails.summary)}</p>
            <p>Official Site: {showDetails.officialSite}</p>
            <button onClick={handleBookTickets} className="booking-button">
              Book Tickets
            </button>
          </div>
          {previousEpisode && (
            <div className="previous-episode">
              <h3>Previous Episode</h3>
              <p>Name: {previousEpisode.name}</p>
              <p>Season: {previousEpisode.season}</p>
              <p>Number: {previousEpisode.number}</p>
              <p>Airdate: {previousEpisode.airdate}</p>
              <p>Airtime: {previousEpisode.airtime}</p>
              {previousEpisode.rating.average && 
              <p>Rating: {previousEpisode.rating && previousEpisode.rating.average}</p>}
              {previousEpisode.image && (
                <img
                  src={previousEpisode.image.original || previousEpisode.image.medium}
                  alt={previousEpisode.name}
                  className="episode-image"
                />
              )}
              {previousEpisode.summary && 
              <p>Summary: {removeTags(previousEpisode.summary)}</p>}
            </div>
          )}
        </div>
      ) : (
        <MovieBooking onClose={handleBookingClose} showId={id} />
      )}
  
   
    </div>
  );
};

export default ShowDetails;
