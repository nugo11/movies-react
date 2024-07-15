import { useEffect, useState } from "react";
import db from "./db/mov/articles.json";
import { Link } from "react-router-dom";


function getRatingclassName(rating) {
  if (Number(rating) < 6) return "red";
  if (Number(rating) < 7) return "yellow";
  if (Number(rating) >= 7) return "green";
  return "";
}

function App() {
  const [tab, setTab] = useState("tab-1");

  const handleTabClick = (tabId) => {
    setTab(tabId);
  };

  const [movies, setMovies1] = useState(null);
  const [series1, setseries1] = useState(null);
  const [sabavshvo, setsabavshvo] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetchMovies(`http://localhost:3000/api/articles`)
      .then((data) => {
        setMovies1(data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });

    fetchMovies(`http://localhost:3000/api/serial`)
      .then((data) => {
        setseries1(data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
    fetchMovies(`http://localhost:3000/api/articles?genre=ანიმაციური`)
      .then((data) => {
        setsabavshvo(data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  const fetchMovies = async (link) => {
    const response = await fetch(link);
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    return await response.json();
  };

  setTimeout(() => {
    setLoader(false);
  }, 1000);

  useEffect(() => {
    const scriptUrls = [
      '../../public/assets/js/bootstrap.bundle.min.js',
      '../../public/assets/js/splide.min.js',
      '../../public/assets/js/smooth-scrollbar.js',
      '../../public/assets/js/plyr.min.js',
      '../../public/assets/js/photoswipe.min.js',
      '../../public/assets/js/photoswipe-ui-default.min.js',
      '../../public/assets/js/main.js',
    ];

    const loadScripts = () => {
      const divScript = document.createElement('div');
      scriptUrls.forEach((src) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        script.onerror = () => {
          console.error(`Error loading ${src}`);
        };
        divScript.classList.add('scriptContainer')
        document.body.appendChild(divScript);
        divScript.appendChild(script)
        divScript.remove()
      });
    };

    loadScripts();

    setTimeout(() => {
      loadScripts();
    }, 1000);

    return () => {
      scriptUrls.forEach((src) => {
        const scripts = document.querySelectorAll(`script[src="${src}"]`);
        scripts.forEach((script) => script.remove());
      });
    };
  }, []);


  return (
    <>
      {loader === true ? (
        <div className="laoder_mix">
          <div className="loaderi">
            <div className="loaderi__filmstrip"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="fulminebg"></div>
          <div className="fullbg-pattern"></div>
          <section className="home">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h1 className="home__title">
                    <Link to="/movies">
                      <b>
                        <span style={{ color: "#f9ab00" }}>ფილ</span>მები
                      </b>{" "}
                      ქართულად
                    </Link>
                  </h1>
                </div>

                <div className="col-12">
                  <div className="home__carousel splide splide--home">
                    <div className="splide__arrows">
                      <button
                        className="splide__arrow splide__arrow--prev"
                        type="button"
                      >
                        <i className="ti ti-chevron-left"></i>
                      </button>
                      <button
                        className="splide__arrow splide__arrow--next"
                        type="button"
                      >
                        <i className="ti ti-chevron-right"></i>
                      </button>
                    </div>

                    <div className="splide__track">
                      <ul className="splide__list">
                        {movies &&
                          movies.slice(0, 6).map((item) => {
                            return (
                              <>
                                <li
                                  className="splide__slide"
                                  key={`${item.detailLink}${item.year}`}
                                >
                                  <div className="item item--hero">
                                    <div className="item__cover">
                                      <img
                                        src={`/src/db/${item.poster}`}
                                        alt={`${item.title_geo} / ${item.title_en} ქართულად`}
                                      />
                                      <Link
                                        key={item.detailLink}
                                        to={`/${item.detailLink}`}
                                        state={{ movies }}
                                        className="item__play"
                                      >
                                        <i className="ti ti-player-play-filled"></i>
                                      </Link>
                                      <span
                                        className={`item__rate item__rate--${getRatingclassName(
                                          item.imdb
                                        )}`}
                                      >
                                        {item.imdb}
                                      </span>
                                      <div
                                        className="item__favorite"
                                        type="button"
                                      >
                                        HD
                                      </div>
                                      <div className="item__lang" type="button">
                                        <ul>
                                          <li
                                            style={{
                                              color: item.country[0]
                                                ? "white"
                                                : "gray",
                                            }}
                                          >
                                            GEO
                                          </li>
                                          <li
                                            style={{
                                              color: item.country[1]
                                                ? "white"
                                                : "gray",
                                            }}
                                          >
                                            ENG
                                          </li>
                                          <li
                                            style={{
                                              color: item.country[2]
                                                ? "white"
                                                : "gray",
                                            }}
                                          >
                                            RUS
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="item__content">
                                      <h3 className="item__title">
                                        <Link
                                          key={item.detailLink}
                                          to={`/${item.detailLink}`}
                                          state={{ movies }}
                                        >
                                          {item.title_geo}
                                        </Link>
                                      </h3>
                                      <span className="item__category">
                                        <Link
                                          key={item.detailLink}
                                          to={`/${item.detailLink}`}
                                          state={{ movies }}
                                        >
                                          {item.title_en}
                                        </Link>
                                      </span>
                                    </div>
                                  </div>
                                </li>
                              </>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section section--border">
            <div className="container">
              <div className="row">
                {/*  section title  */}
                <div className="col-12">
                  <div className="section__title-wrap">
                    <h2 className="section__title" style={{ fontSize: 28 }}>
                      <Link to="/serial">
                        <b>
                          <span style={{ color: "#f9ab00" }}>სერ</span>იალები
                        </b>{" "}
                        ქართულად
                      </Link>
                    </h2>
                    <Link
                      to="/serial"
                      className="section__view section__view--carousel"
                    >
                      ყველას ნახვა
                    </Link>
                  </div>
                </div>
                {/*  end section title  */}

                {/*  carousel  */}
                <div className="col-12">
                  <div className="section__carousel splide splide--content">
                    <div className="splide__arrows">
                      <button
                        className="splide__arrow splide__arrow--prev"
                        type="button"
                      >
                        <i className="ti ti-chevron-left"></i>
                      </button>
                      <button
                        className="splide__arrow splide__arrow--next"
                        type="button"
                      >
                        <i className="ti ti-chevron-right"></i>
                      </button>
                    </div>

                    <div className="splide__track">
                      <ul className="splide__list">
                        {series1.slice(0, 8).map((item) => {
                          return (
                            <>
                              <li
                                className="splide__slide"
                                key={`${item.detailLink}${item.imdb}`}
                              >
                                <div className="item item--hero">
                                  <div className="item__cover" id="sabavshvo">
                                    <img
                                      src={`/src/db/${item.poster}`}
                                      alt={`${item.title_geo} / ${item.title_en} ქართულად`}
                                    />
                                    <Link
                                      key={item.detailLink}
                                      to={`/${item.detailLink}`}
                                      state={{ series1 }}
                                      className="item__play"
                                    >
                                      <i className="ti ti-player-play-filled"></i>
                                    </Link>
                                    <span
                                      className={`item__rate item__rate--${getRatingclassName(
                                        item.imdb
                                      )}`}
                                    >
                                      {item.imdb}
                                    </span>
                                    <div
                                      className="item__favorite"
                                      type="button"
                                    >
                                      HD
                                    </div>
                                    <div className="item__lang" type="button">
                                      <ul>
                                        <li
                                          style={{
                                            color: item.country[0]
                                              ? "white"
                                              : "gray",
                                          }}
                                        >
                                          GEO
                                        </li>
                                        <li
                                          style={{
                                            color: item.country[1]
                                              ? "white"
                                              : "gray",
                                          }}
                                        >
                                          ENG
                                        </li>
                                        <li
                                          style={{
                                            color: item.country[2]
                                              ? "white"
                                              : "gray",
                                          }}
                                        >
                                          RUS
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="item__content">
                                    <h3 className="item__title">
                                      <Link
                                        key={item.detailLink}
                                        to={`/${item.detailLink}`}
                                        state={{ series1 }}
                                      >
                                        {item.title_geo}
                                      </Link>
                                    </h3>
                                    <span className="item__category">
                                      <Link
                                        key={item.detailLink}
                                        to={`/${item.detailLink}`}
                                        state={{ series1 }}
                                      >
                                        {item.title_en}
                                      </Link>
                                    </span>
                                  </div>
                                </div>
                              </li>
                            </>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                {/*  end carousel  */}
              </div>
            </div>
          </section>

          {/* content */}
          <section className="content">
            <div className="content__head">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <h2 className="content__title">
                      <b>
                        <span style={{ color: "#f9ab00" }}>ახა</span>ლი
                      </b>{" "}
                      დამატებული
                    </h2>
                    <div className="combineul">
                      <ul
                        className="nav nav-tabs content__tabs"
                        id="content__tabs"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <button
                            id="1-tab"
                            className={tab === "tab-1" ? "active" : ""}
                            onClick={() => handleTabClick("tab-1")}
                          >
                            ფილმები
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            id="2-tab"
                            className={tab === "tab-2" ? "active" : ""}
                            onClick={() => handleTabClick("tab-2")}
                          >
                            სერიალები
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            id="3-tab"
                            className={tab === "tab-3" ? "active" : ""}
                            onClick={() => handleTabClick("tab-3")}
                          >
                            ანიმე
                          </button>
                        </li>
                      </ul>
                      <ul className="viewallul">
                        <Link href="/movies">ყველას ნახვა</Link>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="tab-content">
                <div
                  className={`tab-pane fade ${
                    tab === "tab-1" ? "show active" : ""
                  }`}
                  id="tab-1"
                  role="tabpanel"
                  aria-labelledby="1-tab"
                  tabIndex="0"
                >
                  <div className="row">
                    {db.slice(0, 12).map((item) => (
                      <div
                        key={item.detailLink}
                        className="col-6 col-sm-4 col-lg-3 col-xl-2"
                      >
                        <div className="item">
                          <div className="item__cover">
                            <img
                              src={`/src/db/${item.poster}`}
                              alt={`${item.title_geo} / ${item.title_en} ქართულად`}
                            />
                            <Link className="item__play">
                              <i className="ti ti-player-play-filled"></i>
                            </Link>
                            <span
                              className={`item__rate item__rate--${getRatingclassName(
                                item.imdb
                              )}`}
                            >
                              {item.imdb}
                            </span>
                            <div className="item__favorite" type="button">
                              HD
                            </div>
                            <div className="item__lang" type="button">
                              <ul>
                                <li
                                  style={{
                                    color: item.country[0] ? "white" : "gray",
                                  }}
                                >
                                  GEO
                                </li>
                                <li
                                  style={{
                                    color: item.country[1] ? "white" : "gray",
                                  }}
                                >
                                  ENG
                                </li>
                                <li
                                  style={{
                                    color: item.country[2] ? "white" : "gray",
                                  }}
                                >
                                  RUS
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="item__content">
                            <h3 className="item__title">
                              <Link>{item.title_geo}</Link>
                            </h3>
                            <span className="item__category">
                              <Link>{item.title_en}</Link>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className={`tab-pane fade ${
                    tab === "tab-2" ? "show active" : ""
                  }`}
                  id="tab-2"
                  role="tabpanel"
                  aria-labelledby="2-tab"
                  tabIndex="0"
                >
                  {/* Serials content */}
                  <p>Serials content goes here</p>
                </div>
                <div
                  className={`tab-pane fade ${
                    tab === "tab-3" ? "show active" : ""
                  }`}
                  id="tab-3"
                  role="tabpanel"
                  aria-labelledby="3-tab"
                  tabIndex="0"
                >
                  {/* Anime content */}
                  <p>Anime content goes here</p>
                </div>
              </div>
            </div>
          </section>

          <section className="section section--border" id="sabavshvobg">
            <div className="container">
              <div className="row">
                {/*  section title  */}
                <div className="col-12">
                  <div className="section__title-wrap">
                    <h2 className="section__title">
                      <span style={{ color: "#f9ab00", fontWeight: "bolder" }}>
                        საბ
                      </span>
                      ავშვო
                    </h2>
                    <Link
                      href="catalog.html"
                      className="section__view section__view--carousel"
                    >
                      ყველას ნახვა
                    </Link>
                  </div>
                </div>
                {/*  end section title  */}

                {/*  carousel  */}
                <div className="col-12">
                  <div className="section__carousel splide splide--content">
                    <div className="splide__arrows">
                      <button
                        className="splide__arrow splide__arrow--prev"
                        type="button"
                      >
                        <i className="ti ti-chevron-left"></i>
                      </button>
                      <button
                        className="splide__arrow splide__arrow--next"
                        type="button"
                      >
                        <i className="ti ti-chevron-right"></i>
                      </button>
                    </div>

                    <div className="splide__track">
                      <ul className="splide__list">
                        {sabavshvo.slice(0, 8).map((item) => {
                          return (
                            <>
                              <li
                                className="splide__slide"
                                key={`${item.detailLink}${item.imdb}`}
                              >
                                <div className="item item--hero">
                                  <div className="item__cover" id="sabavshvo">
                                    <img
                                      src={`/src/db/${item.poster}`}
                                      alt={`${item.title_geo} / ${item.title_en} ქართულად`}
                                    />
                                    <Link className="item__play">
                                      <i className="ti ti-player-play-filled"></i>
                                    </Link>
                                    <span
                                      className={`item__rate item__rate--${getRatingclassName(
                                        item.imdb
                                      )}`}
                                    >
                                      {item.imdb}
                                    </span>
                                    <div
                                      className="item__favorite"
                                      type="button"
                                    >
                                      HD
                                    </div>
                                    <div className="item__lang" type="button">
                                      <ul>
                                        <li
                                          style={{
                                            color: item.country[0]
                                              ? "white"
                                              : "gray",
                                          }}
                                        >
                                          GEO
                                        </li>
                                        <li
                                          style={{
                                            color: item.country[1]
                                              ? "white"
                                              : "gray",
                                          }}
                                        >
                                          ENG
                                        </li>
                                        <li
                                          style={{
                                            color: item.country[2]
                                              ? "white"
                                              : "gray",
                                          }}
                                        >
                                          RUS
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="item__content">
                                    <h3 className="item__title">
                                      <Link>{item.title_geo}</Link>
                                    </h3>
                                    <span className="item__category">
                                      <Link>{item.title_en}</Link>
                                    </span>
                                  </div>
                                </div>
                              </li>
                            </>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                {/*  end carousel  */}
              </div>
            </div>
          </section>

          <section className="section section--border">
            <div className="container">
              <div className="row">
                {/*  section title  */}
                <div className="col-12">
                  <div className="section__title-wrap">
                    <h2 className="section__title">
                      <span style={{ color: "#f9ab00", fontWeight: "bolder" }}>
                        ტელ
                      </span>
                      ევიზია
                    </h2>
                  </div>
                </div>
                {/*  end section title  */}

                {/*  carousel  */}
                <div className="col-12">
                  <div className="section__carousel splide splide--content">
                    <div className="splide__arrows">
                      <button
                        className="splide__arrow splide__arrow--prev"
                        type="button"
                      >
                        <i className="ti ti-chevron-left"></i>
                      </button>
                      <button
                        className="splide__arrow splide__arrow--next"
                        type="button"
                      >
                        <i className="ti ti-chevron-right"></i>
                      </button>
                    </div>

                    <div className="splide__track">
                      <ul className="splide__list">
                        <li className="splide__slide">
                          <div className="item item--hero" id="tvcorrect">
                            <div className="item__cover" id="tv_id">
                              <img
                                src="../public/assets/img/tv/tv-01.png"
                                alt="მთავარი არხი"
                              />
                            </div>
                          </div>
                        </li>
                        <li className="splide__slide">
                          <div className="item item--hero" id="tvcorrect">
                            <div className="item__cover" id="tv_id">
                              <img
                                src="../public/assets/img/tv/tv-02.png"
                                alt="მთავარი არხი"
                              />
                            </div>
                          </div>
                        </li>
                        <li className="splide__slide">
                          <div className="item item--hero" id="tvcorrect">
                            <div className="item__cover" id="tv_id">
                              <img
                                src="../public/assets/img/tv/tv-03.png"
                                alt="მთავარი არხი"
                              />
                            </div>
                          </div>
                        </li>
                        <li className="splide__slide">
                          <div className="item item--hero" id="tvcorrect">
                            <div className="item__cover" id="tv_id">
                              <img
                                src="../public/assets/img/tv/tv-04.png"
                                alt="მთავარი არხი"
                              />
                            </div>
                          </div>
                        </li>
                        <li className="splide__slide">
                          <div className="item item--hero" id="tvcorrect">
                            <div className="item__cover" id="tv_id">
                              <img
                                src="../public/assets/img/tv/tv-05.png"
                                alt="მთავარი არხი"
                              />
                            </div>
                          </div>
                        </li>
                        <li className="splide__slide">
                          <div className="item item--hero" id="tvcorrect">
                            <div className="item__cover" id="tv_id">
                              <img
                                src="../public/assets/img/tv/tv-06.png"
                                alt="მთავარი არხი"
                              />
                            </div>
                          </div>
                        </li>
                        <li className="splide__slide">
                          <div className="item item--hero" id="tvcorrect">
                            <div className="item__cover" id="tv_id">
                              <img
                                src="../public/assets/img/tv/tv-07.png"
                                alt="მთავარი არხი"
                              />
                            </div>
                          </div>
                        </li>
                        <li className="splide__slide">
                          <div className="item item--hero" id="tvcorrect">
                            <div className="item__cover" id="tv_id">
                              <img
                                src="../public/assets/img/tv/tv-08.png"
                                alt="მთავარი არხი"
                              />
                            </div>
                          </div>
                        </li>
                        <li className="splide__slide">
                          <div className="item item--hero" id="tvcorrect">
                            <div className="item__cover" id="tv_id">
                              <img
                                src="../public/assets/img/tv/tv-09.png"
                                alt="მთავარი არხი"
                              />
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/*  end carousel  */}
              </div>
            </div>
          </section>
          {/* end content */}
        </>
      )}
    </>
  );
}

export default App;
