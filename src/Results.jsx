import React from 'react';
import ResultItem from './ResultItem';

const Results = ({searchResults, addToPlaylist}) => {
  return (
    <div>
        <h3>Results</h3>
        {searchResults.length === 0 && <p>No songs available with that name.</p>}
        {searchResults.map(song => {
          return (
            <ResultItem {...song}
                        key={song.id}
                        addToPlaylist={addToPlaylist} />
          )
        })}
    </div>
  );
};

export default Results;
