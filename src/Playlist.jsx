import {useState, useEffect} from 'react';
import PlaylistItem from './PlaylistItem';

const Playlist = ({playlistItems, removeFromPlaylist, clearPlaylist, savePlaylist}) => {
  const [playlistName, setPlaylistName] = useState(() => {
    const localValue = localStorage.getItem('PLAYLIST_NAME');
    return localValue || '';
  });

  useEffect(() => {
    localStorage.setItem('PLAYLIST_NAME', playlistName);
  }, [playlistName]);

  const handleSubmit = e => {
    e.preventDefault();
    savePlaylist(playlistName);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='playlist-name'>Playlist name: </label>
        <input type='text'
               value={playlistName}
               onChange={e => setPlaylistName(e.target.value)}
               style={{marginTop:'1em', marginBottom:'1em'}}
               id='playlist-name' />
        <br />
        {playlistItems.length ? <button onClick={clearPlaylist}
                                        style={{marginBottom:'1em'}} >Clear Playlist</button>
                              : <p>Add songs from the search results.</p>}
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
