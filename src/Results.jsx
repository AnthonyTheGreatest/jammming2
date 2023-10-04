import React from 'react';
import ResultItem from './ResultItem';

const Results = ({searchResults, addToPlaylist, clearResults}) => {
  return (
    <div>
        <h3>Results</h3>
        {searchResults.length ? <button onClick={clearResults}
                                        style={{marginBottom:'1em'}} >Clear Results</button>
                              : <p>Nothing to show.</p>}

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
