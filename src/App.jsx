import {useState, useEffect} from 'react';
import Form from './Form';
import Results from './Results';
import Playlist from './Playlist';

const songs = [
  {name: 'a', artist: 'a'},
  {name: 'a', artist: 'b'},
  {name: 'b', artist: 'a'},
  {name: 'b', artist: 'b'},
  {name: 'c', artist: 'a'},
  {name: 'c', artist: 'b'}
];

const App = () => {
  // States without localStorage:
  const [searchResults, setSearchResults] = useState([]);
  const [playlistItems, setPlaylistItems] = useState([]);

  // States with localStorage:
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

  const search = text => {
    const result = songs.filter(s => s.name === text).map(s => {
      return {
        id: crypto.randomUUID(),
        ...s
      };
    });
    setSearchResults(result);
  };

  const addToPlaylist = (songId) => {
    const songToAdd = searchResults.find(s => s.id === songId);
    setPlaylistItems(prev => {
      return [
        ...prev,
        songToAdd
      ];
    });
  };

  const removeFromPlaylist = (songId) => {
    setPlaylistItems(prev => {
      return prev.filter(song => song.id !== songId);
    })
  };

  return (
    <div >
      <div style={{display:'flex', justifyContent:'center', margin:'5em'}}>
        <Form search={search} />
      </div>
      <div style={{display:'flex', justifyContent:'space-evenly'}}>
        <Results searchResults={searchResults}
                 addToPlaylist={addToPlaylist} />
        <Playlist playlistItems={playlistItems}
                  removeFromPlaylist={removeFromPlaylist} />
      </div>
    </div>
  );
};

export default App;
