import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import './index.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components';
import {
  faHome,
  faLanguage,
  faBook,
  faAddressBook,
  faCalendar,
  faFile,
  faUser,
  faBuilding,
  faTemperatureHigh,
} from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  const [resultShow, setresultShow] = useState(0);
  const [data, setData] = useState({ items: [] });
  const [query, setQuery] = useState('');
  const [url, setUrl] = useState(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.REACT_APP_KEY}`
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [countMe, setCountMe] = useState(0);
  const [volumeID, setVolumeID] = useState('L4HOcQAACAAJ');
  const [volumeData, setVolumeData] = useState({});
  const [isLoadingB, setIsLoadingB] = useState(false);
  const [n, setN] = useState();

  let fetchVolumeInfo = async () => {
    setIsLoadingB(true);
    try {
      let volResult = await Axios(
        `https://www.googleapis.com/books/v1/volumes/${volumeID}?key=${process.env.REACT_APP_KEY}`
      );
      setVolumeData(volResult.data);
    } catch (e) {
      console.log('error occured', e);
    }
    setIsLoadingB(false);
  };

  let fetchData = async () => {
    setIsLoading(true);
    try {
      let results = await Axios(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.REACT_APP_KEY}`
      );
      setIsError(false);
      setresultShow(resultShow + 1);
      setData(results.data);
    } catch (e) {
      setIsError(true);
      console.log('error occurs', isError);
    }
    setIsLoading(false);
  };

  let showDet = resultShow >= 1;
  let showLoading = showDet ? (
    <div className={`spinner ${isLoading ? 'show' : 'hide'}`}>
      <div className='bounce1'></div>
      <div className='bounce2'></div>
      <div className='bounce3'></div>
    </div>
  ) : null;

  let btnStyle = !showDet ? { margin: '1rem auto' } : { margin: '1rem 0rem' };
  let arr = [];
  let newArr = [];

  return (
    <>
      <div className={resultShow === 0 ? 'dark-bg' : null}>
        <div className={`my-form ${!showDet ? 'not-loading' : 'loaded-res'}`}>
          <form
            onSubmit={(e) => {
              fetchData();
              e.preventDefault();
            }}
          >
            <div className='headings'>
              <h2>Mini Online Book Search</h2>
            </div>
            <input
              type='text'
              onChange={(e) => {
                setQuery(e.target.value);
              }}
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
            {isLoading && (
              <div className='spinner'>
                <div className='bounce1'></div>
                <div className='bounce2'></div>
                <div className='bounce3'></div>
              </div>
            )}

            {isError & !isLoading && (
              <>
                <div className='error-div'>
                  <h3 className='error-text'>
                    <span className='error-first-text'>o</span>h no! Something
                    went wrong, pls try again later.
                  </h3>
                </div>
              </>
            )}
          </form>
        </div>
        {arr.push({
          id: data.items
            .map((items) => items.id)
            .join(',')
            .split(','),
          author: data.items
            .map((items) => items.volumeInfo.authors)
            .join(',')
            .split(','),
          title: data.items
            .map((items) => items.volumeInfo.title)
            .join(',')
            .split(','),
          description: data.items.map((items) => items.volumeInfo.description),

          category: data.items
            .map((items) => items.volumeInfo.title)
            .join(',')
            .split(','),
        })}
        {newArr.push(arr)}
        {!isError & !isLoading && (
          <>
            <div className='book-search-section'>
              {data.items.map((items) => (
                <>
                  <div className='books-results'>
                    <h2 className='book-title'>{items.volumeInfo.title}</h2>
                    <div className='image-plus-book-info columns'>
                      <div className='column image-div'>
                        <img
                          className='book-images'
                          src={
                            items.volumeInfo.imageLinks === undefined
                              ? ''
                              : 'https' +
                                items.volumeInfo.imageLinks.smallThumbnail
                                  .split('')
                                  .slice(4)
                                  .join('')
                          }
                          alt={
                            'Image not available for ' + items.volumeInfo.title
                          }
                        />
                      </div>
                      <div className='column icon-section'>
                        {items.volumeInfo.subtitle && (
                          <>
                            <div>
                              <p>
                                {' '}
                                <FontAwesomeIcon
                                  icon={faBook}
                                  className='icon'
                                />
                                {items.volumeInfo.subtitle}
                              </p>
                            </div>
                          </>
                        )}

                        <p>
                          <FontAwesomeIcon icon={faUser} className='icon' />
                          {items.volumeInfo.authors === undefined
                            ? 'No author'
                            : items.volumeInfo.authors.join(', ')}
                        </p>

                        {items.volumeInfo.publisher && (
                          <>
                            <div>
                              <p>
                                <FontAwesomeIcon
                                  icon={faBuilding}
                                  className='icon'
                                />

                                {items.volumeInfo.publisher}
                              </p>
                            </div>
                          </>
                        )}

                        {items.volumeInfo.publishedDate && (
                          <>
                            <div>
                              <p>
                                <FontAwesomeIcon
                                  icon={faCalendar}
                                  className='icon'
                                />
                                {items.volumeInfo.publishedDate}
                              </p>
                            </div>
                          </>
                        )}

                        {items.volumeInfo.pageCount && (
                          <>
                            <div>
                              <p>
                                <FontAwesomeIcon
                                  icon={faFile}
                                  className='icon'
                                />
                                {items.volumeInfo.pageCount}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className='book-description'>
                        {items.volumeInfo.description === undefined
                          ? ''
                          : items.volumeInfo.description.slice(0, 200) + '...'}
                      </p>
                    </div>

                    <Button
                      className='btn-results'
                      type='submit'
                      color='primary is-light'
                      value={items.id}
                      onClick={(e) => {
                        setVolumeID(e.target.value);
                        fetchVolumeInfo();
                        let a = arr[0];
                        let c = a.id.findIndex((i) => i === items.id);
                        setN(c);
                      }}
                    >
                      {' '}
                      Get More Info
                    </Button>
                    <hr className='hr-book-results' />

                    <div className='more-info-div'>
                      <div
                        className={`modal ${
                          volumeID === items.id ? 'is-active' : null
                        }`}
                      >
                        <div class='modal-background'></div>
                        <div class='modal-card'>
                          <header className='modal-card-head'>
                            <p className='modal-card-title'>
                              <p>{arr[0].title[n]} </p>
                            </p>
                            <button
                              onClick={() => {
                                setVolumeID('');
                              }}
                              className='delete'
                              aria-label='close'
                            ></button>
                          </header>
                          <section className='modal-card-body'>
                            <p>{arr[0].description[n]} </p>
                          </section>
                          <footer className='modal-card-foot'>
                            <button className='button is-success'>
                              Save changes
                            </button>
                            <button className='button'>Cancel</button>
                          </footer>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
