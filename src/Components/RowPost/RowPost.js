import React, { useEffect, useState } from 'react';
import Youtube from 'react-youtube';
import './RowPost.css';
import { imageUrl, API_KEY } from '../../constants/constants';
import axios from '../../axios';

function RowPost(props) {
    const [movies, setMovies] = useState([]);
    const [urlId, setUrlId] = useState(null); // Initialize urlId as null

    useEffect(() => {
        axios.get(props.url).then(response => {
            console.log(response.data);
            setMovies(response.data.results);
        }).catch(err => {
            // alert('Network Error');
            console.error(err); // Log error to console
        });
    }, [props.url]);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };

    const handleMovie = (id) => {
        console.log(id);
        axios.get(`/movie/${id}/videos?language=en-US&api_key=${API_KEY}`).then(response => {
            if (response.data.results && response.data.results.length > 0) {
                const videoId = response.data.results[0].key; // Get the video key
                setUrlId(videoId); // Set the video ID
            } else {
                console.log('No videos found for this movie.');
            }
        }).catch(err => {
            console.error('Error fetching video:', err);
        });
    };

    return (
        <div className='row'>
            <h2>{props.title}</h2>
            <div className='posters'>
                {movies.map((obj) =>
                    <img onClick={() => handleMovie(obj.id)} className={props.isSmall ? 'smallPoster' : 'poster'} src={`${imageUrl + obj.backdrop_path}`} alt='poster' key={obj.id} />
                )}
            </div>
            {urlId && <Youtube opts={opts} videoId={urlId} />} {/* Render Youtube only if urlId exists */}
        </div>
    );
}

export default RowPost;
