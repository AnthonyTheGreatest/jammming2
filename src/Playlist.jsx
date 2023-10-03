import React from 'react';
import PlaylistItem from './PlaylistItem';

const Playlist = ({playlistItems, removeFromPlaylist}) => {
  return (
    <div>
      <form>
        <input type='text'
               style={{marginTop:'1em', marginBottom:'1em'}} />
        {playlistItems.map(song => {
          return (
            <PlaylistItem {...song}
                          key={song.id}
                          removeFromPlaylist={removeFromPlaylist} />
          );
        })}
        {playlistItems.length !== 0 && <button style={{marginTop:'1em'}}>Save to Spotify</button>}
      </form>
    </div>
  );
};

export default Playlist;
