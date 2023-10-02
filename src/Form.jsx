import {useState} from 'react';

const Form = () => {
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center' }}>
        <h1>Jammming</h1>
        <form style={{display:'flex', flexDirection:'column', alignItems:'center' }}>
            <input type='text' />
            <br />
            <button>Search</button>
        </form>
    </div>
  );
};

export default Form;
