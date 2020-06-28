import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './index.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components';

function App() {
  const [resultShow, setresultShow] = useState(0);
  const [books, setBooks] = useState('');
  const [url, setUrl] = useState('');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const results = await Axios(url);

        setBooks(results.data.items[0].volumeInfo);
        // setBooks((books) => results.data);
        console.log('results :', results.data);
      } catch (e) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  let showDet = resultShow >= 1;
  let showLoading = showDet ? (
    <div className={`spinner ${isLoading ? 'show' : 'hide'}`}>
      <div className='bounce1'></div>
      <div className='bounce2'></div>
      <div className='bounce3'></div>
    </div>
  ) : null;

  let displ = showDet ? (
    <div>
      <div className='columns'>
        <div className='column'>Image</div>
        <div className='column'>
          <h2>
            <span style={{ fontWeight: '600' }}>Title </span>: {books.title}
          </h2>
          <h3>
            <span style={{ fontWeight: '600' }}>Subtitle:</span>{' '}
            {books.subtitle}
          </h3>
          <h4>
            <span style={{ fontWeight: '600' }}>Author:</span> {books.authors}
          </h4>
          <h4>
            <span style={{ fontWeight: '600' }}>Published Date:</span>{' '}
            {books.publishedDate}
          </h4>
          <h4>
            <span style={{ fontWeight: '600' }}>Publisher: </span>
            {books.publisher}
          </h4>
          <p>
            <span style={{ fontWeight: '600' }}>Description:</span>{' '}
            {books.description}
          </p>
        </div>
      </div>
    </div>
  ) : null;

  let btnStyle = !showDet ? { margin: '1rem auto' } : { margin: '1rem 0rem' };
  return (
    <>
      <div className={`my-form ${!showDet ? 'not-loading' : 'loaded-res'}`}>
        <form
          onSubmit={(e) => {
            setUrl(
              `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.REACT_APP_KEY}`
            );
            e.preventDefault();

            setresultShow(resultShow + 1);
          }}
        >
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='input'
            placeholder='Search a book'
          />
          <Button
            className='btn'
            type='submit'
            color='primary'
            style={btnStyle}
          >
            {' '}
            Search
          </Button>
        </form>
        <div>{showLoading}</div>
        {console.log(isError)}
        {/* {isError && <div>Something went wrong ...</div>} */}
        <div>{displ}</div>
      </div>
    </>
  );
}

export default App;
