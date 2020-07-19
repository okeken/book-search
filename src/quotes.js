import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function Quotes() {
  const [quote, setQuote] = useState('');
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        let results = await Axios('https://quotes.rest/qod?category=inspire');
        setQuote(results.data);
      } catch {
        console.log('oopss! An error occured');
      }
    };
    // fetchQuotes();
  }, []);

  return (
    <>
      {console.log(quote)}
      <div className='quotes'>
        <h1>Quotes of the Day</h1>
        <p>
          Keep on Building And trying, it will only get better and cheers
          lotermmmm lotermmmm kkkoskdosofkoskfoisoiko.
        </p>
        <p>-Unkown</p>
      </div>
    </>
  );
}

export default Quotes;
