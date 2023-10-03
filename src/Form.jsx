import {useState} from 'react';

const Form = ({search}) => {
  const [searchText, setSearchText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (searchText === '') return;
    search(searchText);
    setSearchText('');
  };

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center' }}>
        <h1>Jammming</h1>
        <form style={{display:'flex', flexDirection:'column', alignItems:'center' }}
              onSubmit={handleSubmit} >
            <input type='text'
                   value={searchText}
                   onChange={e => setSearchText(e.target.value)} />
            <br />
            <button>Search</button>
        </form>
    </div>
  );
};

export default Form;
