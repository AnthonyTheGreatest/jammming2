import React from 'react';

const ResultItem = ({id, name, artists, album, addToPlaylist}) => {
  return (
    <div>
      <div style={{display:'flex'}}>
          <p>{name} by {artists[0].name}</p>
          <p onClick={() => addToPlaylist(id)}
            style={{marginLeft:'1em', fontWeight:900, color:'red'}} >+</p>
      </div>
      <p>Album: {album.name} </p>
      <p>---</p>
    </div>
  );
};

export default ResultItem;
