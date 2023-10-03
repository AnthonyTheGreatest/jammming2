import React from 'react';

const PlaylistItem = ({id, name, artist, removeFromPlaylist}) => {
  return (
    <div style={{display:'flex'}}>
      <p>{name} by artist {artist}</p>
      <p onClick={() => removeFromPlaylist(id)}
         style={{marginLeft:'1em', fontWeight:900, color:'red'}} >-</p>
    </div>
  );
};

export default PlaylistItem;
