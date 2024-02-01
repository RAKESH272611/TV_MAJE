import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../css/ShowList.css'


const ShowList = () => {

  // State to store the list of shows
  const [shows, setShows] = useState([]);

  const fetchShows = async () => {
    try {
        const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
        // Axios response.data contains the actual response data
        console.log(response.data);
        setShows(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  // Fetch data from the TVMaze API when the component mounts
  useEffect(() => {
    fetchShows();
  }, []);

  return (
    <div>
      <h1>Tv Maje</h1>
      <div className='container'>
      {shows.map((sw) => (
  // Check if the image is present before rendering the div
  (sw.show.image && sw.show.image.medium) ? (
    <div className='list' key={sw.show.id}>
      <h2>{sw.show.name}</h2>
      <img src={sw.show.image.medium} alt={sw.show.name} />
      <p>Type: {sw.show.type}</p>
      <p>Language: {sw.show.language}</p>
      <p>Genres: {sw.show.genres.join(', ')}</p>
      <p>Runtime: {sw.show.runtime} minutes</p>
      {/* Link to the ShowSummary component with show ID as a parameter */}
      <Link to={`/show/${sw.show.id}`}>
        <button>View Summary</button>
      </Link>
      <hr />
    </div>
      ) : null
   ))}
      </div>
    </div>
  );
};

// Export the ShowList component
export default ShowList;
