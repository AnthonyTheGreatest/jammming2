import {useState, useEffect} from 'react';
import Form from './Form';
import Results from './Results';
import Playlist from './Playlist';
import axios from 'axios';

const App = () => {

  // States with localStorage:
  const [searchResults, setSearchResults] = useState(() => {
    const localValue = localStorage.getItem('SEARCH_RESULTS');
    return localValue ? JSON.parse(localValue) : [];
  });

  useEffect(() => {
    localStorage.setItem('SEARCH_RESULTS', JSON.stringify(searchResults));
  }, [searchResults]);

  const [playlistItems, setPlaylistItems] = useState(() => {
    const localValue = localStorage.getItem('PLAYLIST_ITEMS');
    return localValue ? JSON.parse(localValue) : [];
  });

  let playlistUriList = [];

  useEffect(() => {
    localStorage.setItem('PLAYLIST_ITEMS', JSON.stringify(playlistItems));
    playlistItems.forEach(song => playlistUriList.push(song.uri));
  }, [playlistItems]);

  const [token, setToken] = useState('');

  useEffect(() => {
    const hash = location.hash;
    let token = localStorage.getItem('TOKEN');
    if (!token && hash) {
      token = hash.substring(1)
                  .split('&')
                  .find(string => string.startsWith('access_token'))
                  .split('=')[1];
      location.hash = '';
      localStorage.setItem('TOKEN', token);
    }
    setToken(token);
  }, []);

  // Helpers:

  const search = async text => {
    const {data} = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${token}` 
      },
      params: {
        q: text,
        type: 'track'
      }
    });
    // console.log(data);
    const result = data.tracks.items.map(item => ({...item}));
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
    setSearchResults(prev => prev.filter(s => s.id !== songId));
  };

  const removeFromPlaylist = (songId) => {
    setPlaylistItems(prev => {
      return prev.filter(song => song.id !== songId);
    })
  };

  const clearResults = () => {
    setSearchResults([]);
  };

  const clearPlaylist = () => {
    setPlaylistItems([]);
  }

  const savePlaylist = async name => {
    const {data: user} = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });
    const {data: playlist} = await axios.post(
      `https://api.spotify.com/v1/users/${user.id}/playlists`,
      {
        name: name,
        description: 'A playlist created with the Jammming app.'
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlist.id}/tracks?uris=${encodeURIComponent(playlistUriList.join(','))}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    // 404 error
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('TOKEN');
  };

  const CLIENT_ID = 'b0899ba81f4e4dc5a6c9bbd0f71ca5b6';
  const REDIRECT_URI = 'http://127.0.0.1:5173/';
  const RESPONSE_TYPE = 'token';
  const SCOPE = 'playlist-modify-public playlist-modify-private playlist-read-private';

  let loginUrl = 'https://accounts.spotify.com/authorize';
  loginUrl += '?client_id=' + encodeURIComponent(CLIENT_ID);
  loginUrl += '&redirect_uri=' + encodeURIComponent(REDIRECT_URI);
  loginUrl += '&response_type=' + encodeURIComponent(RESPONSE_TYPE);
  loginUrl += '&scope=' + encodeURIComponent(SCOPE);

  return (
    <div>
      { !token ?
      <a href={loginUrl}>Login to Spotify</a>
      : <button onClick={logout} >Logout</button> }
      <div style={{display:'flex', justifyContent:'center', margin:'5em'}}>
        <Form search={search} />
      </div>
      <div style={{display:'flex', justifyContent:'space-evenly'}}>
        <Results searchResults={searchResults}
                 addToPlaylist={addToPlaylist}
                 clearResults={clearResults} />
        <Playlist playlistItems={playlistItems}
                  removeFromPlaylist={removeFromPlaylist}
                  clearPlaylist={clearPlaylist}
                  savePlaylist={savePlaylist} />
      </div>
    </div>
  );
};

export default App;
