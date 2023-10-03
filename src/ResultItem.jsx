import React from 'react';

const ResultItem = ({id, name, artist, addToPlaylist}) => {
  return (
    <div style={{display:'flex'}}>
        <p>{name} by artist {artist}</p>
        <p onClick={() => addToPlaylist(id)}
           style={{marginLeft:'1em', fontWeight:900, color:'red'}} >+</p>
    </div>
  );
};

export default ResultItem;
