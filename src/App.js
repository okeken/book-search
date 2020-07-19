import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import './index.css';
// import Quotes from './quotes';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components';
import { Canvas } from 'react-canvas-js';
import {
  faBook,
  faCalendar,
  faFile,
  faUser,
  faBuilding,
  faAngleDoubleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const particles = {
  maxParticles: 50,
  colors: ['#2E1D62', '#513D91', '#487EEF', '#11A887', '#fc5c65', '#fed330'],
  shapes: ['square', 'circle'],
  size: 10,
  minSpeed: 0.05,
  maxSpeed: 0.2,
  alpha: 0.7,
  backgroundColor: '#1E1F29',
};

function App() {
  const [resultShow, setresultShow] = useState(0);
  const [data, setData] = useState({ items: [] });
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [volumeId, setVolumeId] = useState('');
  const [volumeData, setVolumeData] = useState({ volumeInfo: {} });
  const [n, setN] = useState();
  let arr = [];

  const [moreN, setMoreN] = useState(0);
  const [access, setAccess] = useState({ accessInfo: {} });
  const [price, setPrice] = useState({ retailPrice: {} });
  const [othersVol, setOthersVol] = useState('');

  if (volumeId.length >= 2 && moreN === 1) {
    let fetchVol = async () => {
      try {
        let res = await Axios(
          `https://www.googleapis.com/books/v1/volumes/${volumeId}?key=${process.env.REACT_APP_KEY}`
        );
        setVolumeData(res.data);
        setAccess(res.data);
        setOthersVol(res.data);

        setMoreN(moreN + 1);
      } catch (e) {
        console.log('something happened', e);
      }
    };
    fetchVol();
  } else {
    console.log('');
  }

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
  arr.push({
    id: data.items
      .map((items) => items.id)
      .join(',')
      .split(','),
    author: data.items
      .map((items) => items.volumeInfo.authors)
      .join(',')
      .split(','),
    image: data.items.map((items) =>
      items.volumeInfo.imageLinks === undefined
        ? ''
        : items.volumeInfo.imageLinks.thumbnail
    ),

    title: data.items
      .map((items) => items.volumeInfo.title)
      .join(',')
      .split(','),
    subtitle: data.items
      .map((items) => items.volumeInfo.subtitle)
      .join(',')
      .split(','),
    description: data.items.map((items) => items.volumeInfo.description),
    category: data.items
      .map((items) => items.volumeInfo.categories)
      .join(',')
      .split(','),
  });
  return (
    <>
      <Canvas
        options={particles}
        className={resultShow === 0 ? 'particles' : 'hide'}
      />
      {/* <Quotes /> */}
      <div className={resultShow === 0 ? 'dark-bg' : null}>
        <div className='socials'>
          <div>
            <p>
              <a
                href='https://github.com/okeken'
                rel='noopener noreferrer'
                target='_blank'
              >
                <FontAwesomeIcon
                  icon={faGithub}
                  className='socials-icon github'
                />
              </a>
            </p>
          </div>
          <div>
            <p>
              <a
                href='https://twitter.com/okekehi'
                rel='noopener noreferrer'
                target='_blank'
              >
                <FontAwesomeIcon
                  icon={faTwitter}
                  className='socials-icon twitter'
                />
              </a>
            </p>
          </div>
        </div>
        <div className={`my-form ${!showDet ? 'not-loading' : 'loaded-res'}`}>
          <form
            onSubmit={(e) => {
              fetchData();
              e.preventDefault();
            }}
          >
            <div className='headings'>
              <h2
                className={`text-headings ${
                  resultShow === 0 ? 'home-txt-headings' : null
                }`}
              >
                Mini Online Book Search
              </h2>
            </div>
            <div className={resultShow === 0 ? 'input-div' : null}>
              <input
                type='text'
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                className='input'
                placeholder='Search a book'
              />
            </div>

            <Button
              className='btn'
              type='submit'
              color='primary'
              style={btnStyle}
            >
              {' '}
              Search
            </Button>

            {isLoading ? (
              <>
                <div className='spinner'>
                  <div className='bounce1'></div>
                  <div className='bounce2'></div>
                  <div className='bounce3'></div>
                </div>
              </>
            ) : null}

            {isError & !isLoading ? (
              <>
                <div className='error-div'>
                  <h3 className='error-text'>
                    <span className='error-first-text'>o</span>h no! Something
                    went wrong, pls try again later.
                  </h3>
                </div>
              </>
            ) : null}
          </form>
        </div>

        {!isError & !isLoading ? (
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
                        {items.volumeInfo.subtitle ? (
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
                        ) : null}

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
                        let a = arr[0];
                        let c = a.id.findIndex((i) => i === items.id);
                        setN(c);
                        setVolumeId(e.target.value);

                        setMoreN(moreN + 1);
                      }}
                    >
                      {' '}
                      Get More Info
                    </Button>
                    <hr className='hr-book-results' />

                    <div className='more-info-div'>
                      <div
                        className={`modal ${
                          volumeId === items.id ? 'is-active' : null
                        }`}
                      >
                        <div className='modal-background'></div>
                        <div className='modal-card'>
                          <header className='modal-card-head'>
                            <h2 className='modal-card-title'>
                              <p>{arr[0].title[n]} </p>
                            </h2>
                          </header>
                          <section className='modal-card-body test-mod'>
                            <div className='columns'>
                              <div className='column image-div'>
                                <img
                                  src={arr[0].image[n]}
                                  alt='selected book img not avaialable'
                                />
                              </div>
                              <div className='column more-info-sub'>
                                <p className=''>{arr[0].author[n]} </p>
                                <p className=''>{arr[0].subtitle[n]} </p>

                                <p className=''>
                                  Category: {arr[0].category[n]}{' '}
                                </p>
                                <p className=''>
                                  {volumeData.volumeInfo.ratingsCount >= 1 && (
                                    <>
                                      <span className='ratings'>
                                        {volumeData.volumeInfo.averageRating}
                                      </span>{' '}
                                      from{' '}
                                      <span className='ratings'>
                                        {volumeData.volumeInfo.ratingsCount}
                                      </span>{' '}
                                      ratings
                                    </>
                                  )}
                                </p>

                                {price.retailPrice.length === undefined ? (
                                  <>
                                    <p className='price-not-avail'>
                                      Price not available
                                    </p>
                                  </>
                                ) : (
                                  <>Price: ${price.retailPrice.currencyCode}</>
                                )}
                              </div>
                            </div>

                            <p className='book-full-desc'>
                              {arr[0].description[n]}{' '}
                            </p>
                            {price.retailPrice.length === undefined ? (
                              <>
                                <p className='price-not-avail country-not-available'>
                                  Not Available for Sale in your Country
                                </p>
                              </>
                            ) : (
                              <>
                                <button className='primary'>
                                  <a href={othersVol.buyLink}>Buy Now</a>
                                </button>
                              </>
                            )}
                          </section>
                          <footer className='modal-card-foot'>
                            <button
                              onClick={() => {
                                setVolumeId('');
                                setMoreN(0);
                              }}
                              className='button is-success'
                            >
                              <FontAwesomeIcon
                                icon={faAngleDoubleLeft}
                                className='back'
                              />
                              <p>Back</p>
                            </button>
                            {access.accessInfo.webReaderLink && (
                              <>
                                <button className='button is-pulled-right'>
                                  <a href={access.accessInfo.webReaderLink}>
                                    Read Online
                                  </a>
                                </button>
                              </>
                            )}
                          </footer>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default App;
