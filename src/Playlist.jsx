import React from 'react';
import PlaylistItem from './PlaylistItem';

const Playlist = () => {
  return (
    <div>
      <form>
        <input type='text'
               style={{marginTop:'1em', marginBottom:'1em'}} />
        <PlaylistItem />
        <button style={{marginTop:'1em'}}>Save to Spotify</button>
      </form>
    </div>
  );
};

export default Playlist;
