import {useState, useEffect} from 'react';
import Form from './Form';
import Results from './Results';
import Playlist from './Playlist';

const App = () => {
  // const [searchResults, setSearchResults] = useState(() => {
  //   const localValue = localStorage.getItem('SEARCH_RESULTS');
  //   return localValue === null ? [] : JSON.parse(localValue);
  // });

  // useEffect(() => {
  //   localStorage.setItem('SEARCH_RESULTS', JSON.stringify(searchResults));
  // }, [searchResults]);

  // const [playlistItems, setPlaylistItems] = useState(() => {
  //   const localValue = localStorage.getItem('PLAYLIST_ITEMS');
  //   return localValue === null ? [] : JSON.parse(localValue);
  // });

  // useEffect(() => {
  //   localStorage.setItem('PLAYLIST_ITEMS', JSON.stringify(playlistItems));
  // }, [playlistItems]);

  return (
    <div >
      <div style={{display:'flex', justifyContent:'center', margin:'5em'}}>
        <Form />
      </div>
      <div style={{display:'flex', justifyContent:'space-evenly'}}>
        <Results />
        <Playlist />
      </div>
    </div>
  );
};

export default App;
