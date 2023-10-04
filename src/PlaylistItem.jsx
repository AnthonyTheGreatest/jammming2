import React from 'react';

const PlaylistItem = ({id, name, artists, album, removeFromPlaylist}) => {
  return (
    <div>
      <div style={{display:'flex'}}>
        <p>{name} by artist {artists[0].name}</p>
        <p onClick={() => removeFromPlaylist(id)}
          style={{marginLeft:'1em', fontWeight:900, color:'red'}} >-</p>
      </div>
      <p>Album: {album.name} </p>
      <p>---</p>
    </div>
  );
};

export default PlaylistItem;
