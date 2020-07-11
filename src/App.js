import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import './index.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components';
import {
  faHome,
  faBook,
  faCalendar,
  faFile,
  faUser,
  faBuilding,
  faAngleDoubleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  const [resultShow, setresultShow] = useState(0);
  const [data, setData] = useState({ items: [] });
  const [query, setQuery] = useState('');
  //const [volUrl, setVolUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [countMe, setCountMe] = useState(0);
<<<<<<< HEAD
  const [volumeId, setVolumeId] = useState('');
  const [volumeData, setVolumeData] = useState({});
  const [isLoadingB, setIsLoadingB] = useState(false);
  const [id, setId] = useState('');

  const [n, setN] = useState();
  const [testState, setTestState] = useState(0);
  let itemsId = [];

  //testUrl = `https://www.googleapis.com/books/v1/volumes/${volumeID}?key=${process.env.REACT_APP_KEY}`

  // useEffect(()=>{
  //     let fetchVolumeInfo = async () => {
  //   try {
  //     let volResult = await Axios(volUrl);
  //     setVolumeData(volResult.data);
  //     console.log(volumeData.volumeInfo.averageRating);
  //     console.log(volumeData.volumeInfo.ratingsCount);
  //     console.log('vol id', volumeID);
  //   } catch (e) {
  //     console.log('error occured', e);
  //   }
  // };
  // })
=======
  const [volumeID, setVolumeID] = useState('L4HOcQAACAAJ');
  const [volumeData, setVolumeData] = useState('');
  const [isLoadingB, setIsLoadingB] = useState(false);

  let fetchVolumeInfo = async () => {
    setIsLoadingB(true);
    try {
      let volResult = await Axios(
        `https://www.googleapis.com/books/v1/volumes/${volumeID}?key=${process.env.REACT_APP_KEY}`
      );
      setVolumeData(volResult.data);
      console.log('vol fetch', volumeData);
      console.log('volume id :', volumeID);
      console.log(
        'url: ',
        `https://www.googleapis.com/books/v1/volumes/${volumeID}?key=${process.env.REACT_APP_KEY}`
      );
    } catch (e) {
      console.log('error occured', e);
    }
    setIsLoadingB(false);
  };
>>>>>>> parent of 517ce79... More Info Showing- Not complete yet

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
  let b;

  console.log(volumeId);
  const [moreN, setMoreN] = useState(0);
  if (volumeId.length >= 2 && moreN === 1) {
    console.log('more N', moreN);
    let fetchVol = async () => {
      try {
        let res = await Axios(
          `https://www.googleapis.com/books/v1/volumes/${volumeId}?key=${process.env.REACT_APP_KEY}`
        );
        console.log('vol in if else statem', volumeId);
        setVolumeData(res.data);
        console.log('new vol dat', volumeData);
        console.log(volumeData.volumeInfo);
        // console.log(volumeData.volumeInfo.averageRating);
        //  console.log(volumeData.volumeInfo.ratingsCount);
        setMoreN(moreN + 1);
      } catch (e) {
        console.log('something happened', e);
      }
    };
    fetchVol();
  } else {
    console.log('watching');
  }

  let showDet = resultShow >= 1;
  let showLoading = showDet ? (
    <div className={`spinner ${isLoading ? 'show' : 'hide'}`}>
      <div className='bounce1'></div>
      <div className='bounce2'></div>
      <div className='bounce3'></div>
    </div>
  ) : null;

  let btnStyle = !showDet ? { margin: '1rem auto' } : { margin: '1rem 0rem' };
  return (
    <>
      <div className={resultShow == 0 ? 'dark-bg' : null}>
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
<<<<<<< HEAD
        {arr.push({
          id: data.items
            .map((items) => items.id)
            .join(',')
            .split(','),
          author: data.items
            .map((items) => items.volumeInfo.authors)
            .join(',')
            .split(','),
          image: data.items.map(
            (items) => items.volumeInfo.imageLinks.thumbnail
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
        })}
        {newArr.push(arr)}
=======
>>>>>>> parent of 517ce79... More Info Showing- Not complete yet
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
                      className={`${volumeID === items.id ? 'test-css' : null}`}
                      type='submit'
                      color='primary is-light'
                      value={items.id}
                      onClick={(e) => {
<<<<<<< HEAD
                        let a = arr[0];
                        let c = a.id.findIndex((i) => i === items.id);
                        setN(c);
                        setVolumeId(e.target.value);
                        console.log('value', e.target.value);
                        setId(volumeId);
                        console.log('vol building', volumeId);
                        console.log('items id', id);
                        itemsId.push(e.target.value);
=======
                        setVolumeID(e.target.value);
                        fetchVolumeInfo();
                        console.log('body', volumeID);
>>>>>>> parent of 517ce79... More Info Showing- Not complete yet
                      }}
                    >
                      {' '}
                      Get More Info
                    </Button>
                    <hr className='hr-book-results' />
<<<<<<< HEAD

                    {console.log('vol', volumeId)}
                    <div className='more-info-div'>
                      <div
                        className={`modal ${
                          volumeId === items.id ? 'is-active' : null
                        }`}
                      >
                        {
                          //  setVolUrl(
                          //     `https://www.googleapis.com/books/v1/volumes/${volumeID}?key=${process.env.REACT_APP_KEY}`
                          //   );
                          //  fetchVolumeInfo();
                        }
                        <div className='modal-background'></div>
                        <div className='modal-card'>
                          <header className='modal-card-head'>
                            <h2 className='modal-card-title'>
                              <p>{arr[0].title[n]} </p>
                            </h2>
                            <button
                              onClick={() => {
                                setVolumeId('');
                              }}
                              className='delete'
                              aria-label='close'
                            ></button>
                          </header>
                          <section className='modal-card-body'>
                            <div className='columns'>
                              <div className='column image-div'>
                                <img
                                  src={arr[0].image[n]}
                                  alt='selected-book'
                                />
                              </div>
                              <div className='column more-info-sub'>
                                <p className=''>{arr[0].author[n]} </p>
                                <p className=''>{arr[0].subtitle[n]} </p>
                                <p className=''>{arr[0].subtitle[n]} </p>

                                <p className=''>
                                  Category: {arr[0].category[n]}{' '}
                                </p>
                              </div>
                            </div>

                            <p className='book-full-desc'>
                              {arr[0].description[n]}{' '}
                            </p>
                          </section>
                          <footer className='modal-card-foot'>
                            <button
                              onClick={() => {
                                setVolumeId('');
                              }}
                              className='button is-success'
                            >
                              <FontAwesomeIcon
                                icon={faAngleDoubleLeft}
                                className='icon'
                              />
                              <p>Back</p>
                            </button>
                            <button className='button isp-pulled-right'>
                              Read Online
                            </button>
                          </footer>
                        </div>
                      </div>
                    </div>
=======
>>>>>>> parent of 517ce79... More Info Showing- Not complete yet
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
