import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMovies } from "../src/componenets/MoviesContext";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import useWindowDimensions from "../src/componenets/useWindowDimensions";

function getRatingclassName(rating) {
  if (Number(rating) < 6) return "red";
  if (Number(rating) < 7) return "yellow";
  if (Number(rating) >= 7) return "green";
  return "";
}

function App() {
  const [tab, setTab] = useState("tab-1");

  const { width } = useWindowDimensions();
  const [perPage, setPerPage] = useState(6);

  useEffect(() => {
    if (width < 570) {
      setPerPage(2);
    } else if (width < 991) {
      setPerPage(3);
    } else if (width < 1000) {
      setPerPage(4);
    } else if (width < 1200) {
      setPerPage(5);
    } else {
      setPerPage(6);
    }
  }, [width]);

  const handleTabClick = (tabId) => {
    setTab(tabId);
  };

  const { movies, ser, turk, anime, animation } = useMovies();
  const [loader, setLoader] = useState(true);

  setTimeout(() => {
    setLoader(false);
  }, 1000);

  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    if (
      movies.length > 0 &&
      ser.length > 0 &&
      turk.length > 0 &&
      anime.length > 0 &&
      animation.length > 0
    ) {
      setScriptsLoaded(true);
    }
  }, [movies, ser, turk, anime, animation]);

  return (
    <>
      <div
        className="laoder_mix"
        style={{ display: loader === true ? "flex" : "none" }}
      >
        <div className="loaderi">
          <div className="loaderi__filmstrip"></div>
        </div>
      </div>
      <div className="fulminebg"></div>
      <div className="fullbg-pattern"></div>
      <section className="home">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="home__title">
                <Link to="/movies?mov">
                  <b>
                    <span style={{ color: "#f9ab00" }}>ფილ</span>მები
                  </b>{" "}
                  ქართულად
                </Link>
              </h1>
            </div>

            <div className="col-12">
              <Splide
                hasTrack={false}
                className="home__carousel splide splide--home"
                aria-label="ფილმები ქართულად"
                options={{
                  perPage: perPage,
                  rewind: true,
                  gap: "24px",
                  pagination: false,
                }}
              >
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
                <SplideTrack>
                  {movies &&
                    movies
                      .filter((i) => !i.genre.includes("სერიალი"))
                      .slice(0, 8)
                      .map((item) => {
                        return (
                          <>
                            <SplideSlide>
                              <div className="item item--hero">
                                <div className="item__cover">
                                  <img
                                    src={`/src/mov/${item.poster}`}
                                    alt={`${item.title_geo} / ${item.title_en} ქართულად`}
                                    loading="lazy"
                                  />

                                  <Link
                                    key={item.detailLink}
                                    to={`/detail/${item.detailLink}`}
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
                                  <div className="item__favorite" type="button">
                                    HD
                                  </div>
                                  <div className="item__lang" type="button">
                                    <ul>
                                      <li
                                        style={{
                                          color: item.country.includes('ქართულად')
                                            ? "white"
                                            : "gray",
                                        }}
                                      >
                                        GEO
                                      </li>
                                      <li
                                        style={{
                                          color: item.country.includes('ინგლისურად')
                                            ? "white"
                                            : "gray",
                                        }}
                                      >
                                        ENG
                                      </li>
                                      <li
                                        style={{
                                          color: item.country.includes('რუსულად')
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
                                      to={`/detail/${item.detailLink}`}
                                      state={{ movies }}
                                    >
                                      {item.title_geo}
                                    
                                    </Link>
                                  </h3>
                                  <span className="item__category">
                                    <Link
                                      key={item.detailLink}
                                      to={`/detail/${item.detailLink}`}
                                      state={{ movies }}
                                    >
                                      {item.title_en}
                                    </Link>
                                  </span>
                                </div>
                              </div>
                            </SplideSlide>
                          </>
                        );
                      })}
                </SplideTrack>
              </Splide>
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
                  <Link to="/serial?ser">
                    <b>
                      <span style={{ color: "#f9ab00" }}>სერ</span>იალები
                    </b>{" "}
                    ქართულად
                  </Link>
                </h2>
                <Link
                  to="/serial?ser"
                  className="section__view section__view--carousel"
                >
                  ყველას ნახვა
                </Link>
              </div>
            </div>
            {/*  end section title  */}

            {/*  carousel  */}
            <div className="col-12">
              <Splide
                hasTrack={false}
                className="section__carousel splide splide--content"
                aria-label="სერიალები ქართულად"
                options={{
                  perPage: perPage,
                  rewind: true,
                  gap: "24px",
                  pagination: false,
                }}
              >
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

                <SplideTrack>
                  {ser
                    .filter((item) => item.genre.includes("სერიალი"))
                    .slice(0, 8)
                    .map((item) => {
                      return (
                        <>
                          <li
                            className="splide__slide"
                            key={`${item.detailLink}${item.imdb}`}
                          >
                            <div className="item item--hero">
                              <div className="item__cover">
                                {" "}
                                <img
                                  src={`/src/mov/${item.poster}`}
                                  alt={`${item.title_geo} / ${item.title_en} ქართულად`}
                                  loading="lazy"
                                />
                                <Link
                                  key={item.detailLink}
                                  to={`/detail/${item.detailLink}`}
                                  state={{ ser }}
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
                                <div className="item__favorite" type="button">
                                  HD
                                </div>
                                <div className="item__lang" type="button">
                                <ul>
                                      <li
                                        style={{
                                          color: item.country.includes('ქართულად')
                                            ? "white"
                                            : "gray",
                                        }}
                                      >
                                        GEO
                                      </li>
                                      <li
                                        style={{
                                          color: item.country.includes('ინგლისურად')
                                            ? "white"
                                            : "gray",
                                        }}
                                      >
                                        ENG
                                      </li>
                                      <li
                                        style={{
                                          color: item.country.includes('რუსულად')
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
                                    to={`/detail/${item.detailLink}`}
                                    state={{ ser }}
                                  >
                                    {item.title_geo}
                                  </Link>
                                </h3>
                                <span className="item__category">
                                  <Link
                                    key={item.detailLink}
                                    to={`/detail/${item.detailLink}`}
                                    state={{ ser }}
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
                </SplideTrack>
              </Splide>
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
                        თურქული სერიალები
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        id="2-tab"
                        className={tab === "tab-2" ? "active" : ""}
                        onClick={() => handleTabClick("tab-2")}
                      >
                        ანიმეები
                      </button>
                    </li>
                  </ul>
                  <ul className="viewallul">
                    <Link
                      to={
                        tab === "tab-1"
                          ? "serial?genre=თურქული%20სერიალები"
                          : "/serial?genre=სერიალი%2Cანიმაციური"
                      }
                    >
                      ყველას ნახვა
                    </Link>
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
                {turk.slice(0, 12).map((item) => (
                  <div
                    key={item.detailLink}
                    className="col-6 col-sm-4 col-lg-3 col-xl-2"
                  >
                    <div className="item">
                      <div className="item__cover">
                        {" "}
                        <img
                          src={`/src/mov/${item.poster}`}
                          alt={`${item.title_geo} / ${item.title_en} ქართულად`}
                          loading="lazy"
                        />
                        <Link
                          key={item.detailLink}
                          to={`/detail/${item.detailLink}`}
                          state={{ turk }}
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
                        <div className="item__favorite" type="button">
                          HD
                        </div>
                        <div className="item__lang" type="button">
                        <ul>
                                      <li
                                        style={{
                                          color: item.country.includes('ქართულად')
                                            ? "white"
                                            : "gray",
                                        }}
                                      >
                                        GEO
                                      </li>
                                      <li
                                        style={{
                                          color: item.country.includes('ინგლისურად')
                                            ? "white"
                                            : "gray",
                                        }}
                                      >
                                        ENG
                                      </li>
                                      <li
                                        style={{
                                          color: item.country.includes('რუსულად')
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
                            to={`/detail/${item.detailLink}`}
                            state={{ turk }}
                          >
                            {item.title_geo}
                          </Link>
                        </h3>
                        <span className="item__category">
                          <Link
                            key={item.detailLink}
                            to={`/detail/${item.detailLink}`}
                            state={{ turk }}
                          >
                            {item.title_en}
                          </Link>
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
              <div className="row">
                {anime.slice(0, 12).map((item) => (
                  <div
                    key={item.detailLink}
                    className="col-6 col-sm-4 col-lg-3 col-xl-2"
                  >
                    <div className="item">
                      <div className="item__cover">
                        {" "}
                        <img
                          src={`/src/mov/${item.poster}`}
                          alt={`${item.title_geo} / ${item.title_en} ქართულად`}
                          loading="lazy"
                        />
                        <Link
                          key={item.detailLink}
                          to={`/detail/${item.detailLink}`}
                          state={{ anime }}
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
                        <div className="item__favorite" type="button">
                          HD
                        </div>
                        <div className="item__lang" type="button">
                        <ul>
                                      <li
                                        style={{
                                          color: item.country.includes('ქართულად')
                                            ? "white"
                                            : "gray",
                                        }}
                                      >
                                        GEO
                                      </li>
                                      <li
                                        style={{
                                          color: item.country.includes('ინგლისურად')
                                            ? "white"
                                            : "gray",
                                        }}
                                      >
                                        ENG
                                      </li>
                                      <li
                                        style={{
                                          color: item.country.includes('რუსულად')
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
                            to={`/detail/${item.detailLink}`}
                            state={{ anime }}
                          >
                            {item.title_geo}
                          </Link>
                        </h3>
                        <span className="item__category">
                          <Link
                            key={item.detailLink}
                            to={`/detail/${item.detailLink}`}
                            state={{ anime }}
                          >
                            {item.title_en}
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
                <h2 className="section__title" style={{ background: "none" }}>
                  <Link href="/movies?genre=ანიმაციური">
                    <span style={{ color: "#f9ab00", fontWeight: "bolder" }}>
                      საბ
                    </span>
                    ავშვო
                  </Link>
                </h2>
                <Link
                  className="section__view section__view--carousel"
                  to="/movies?genre=ანიმაციური"
                >
                  ყველას ნახვა
                </Link>
              </div>
            </div>
            {/*  end section title  */}

            {/*  carousel  */}
            <div className="col-12">
              <Splide
                hasTrack={false}
                aria-label="ანიმაციური ფილმები ქართულად"
                className="section__carousel splide splide--content"
                options={{
                  perPage: perPage,
                  rewind: true,
                  gap: "24px",
                  pagination: false,
                }}
              >
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

                <SplideTrack>
                  {animation
                    .filter((io) => !io.genre.includes("სერიალი"))
                    .slice(0, 8)
                    .map((item) => {
                      return (
                        <>
                          <li
                            className="splide__slide"
                            key={`${item.detailLink}${item.imdb}`}
                          >
                            <div className="item item--hero">
                              <div className="item__cover">
                                {" "}
                                <img
                                  src={`/src/mov/${item.poster}`}
                                  alt={`${item.title_geo} / ${item.title_en} ქართულად`}
                                  loading="lazy"
                                />
                                <Link
                                  key={item.detailLink}
                                  to={`/detail/${item.detailLink}`}
                                  state={{ animation }}
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
                                <div className="item__favorite" type="button">
                                  HD
                                </div>
                                <div className="item__lang" type="button">
                                <ul>
                                      <li
                                        style={{
                                          color: item.country.includes('ქართულად')
                                            ? "white"
                                            : "gray",
                                        }}
                                      >
                                        GEO
                                      </li>
                                      <li
                                        style={{
                                          color: item.country.includes('ინგლისურად')
                                            ? "white"
                                            : "gray",
                                        }}
                                      >
                                        ENG
                                      </li>
                                      <li
                                        style={{
                                          color: item.country.includes('რუსულად')
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
                                    to={`/detail/${item.detailLink}`}
                                    state={{ animation }}
                                  >
                                    {item.title_geo}
                                   
                                  </Link>
                                </h3>
                                <span className="item__category">
                                  <Link
                                    key={item.detailLink}
                                    to={`/detail/${item.detailLink}`}
                                    state={{ animation }}
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
                </SplideTrack>
              </Splide>
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
              <Splide
                hasTrack={false}
                aria-label="ტელევიზია"
                className="section__carousel splide splide--content"
                options={{
                  perPage: 5,
                  rewind: true,
                  gap: "24px",
                  pagination: false,
                }}
              >
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

                <SplideTrack>
                  <SplideSlide>
                    <div className="item item--hero" id="tvcorrect">
                      <div className="item__cover" id="tv_id">
                        {" "}
                        <Link to="/tv">
                          <img
                            src="/src/assets/img/tv/tv-01.png"
                            alt="ტელევიზია"
                            loading="lazy"
                          />
                        </Link>
                      </div>
                    </div>
                  </SplideSlide>
                  <SplideSlide>
                    <div className="item item--hero" id="tvcorrect">
                      <div className="item__cover" id="tv_id">
                        {" "}
                        <Link to="/tv">
                          <img
                            src="/src/assets/img/tv/tv-02.png"
                            alt="ტელევიზია"
                            loading="lazy"
                          />
                        </Link>
                      </div>
                    </div>
                  </SplideSlide>
                  <SplideSlide>
                    <div className="item item--hero" id="tvcorrect">
                      <div className="item__cover" id="tv_id">
                        {" "}
                        <Link to="/tv">
                          <img
                            src="/src/assets/img/tv/tv-03.png"
                            alt="ტელევიზია"
                            loading="lazy"
                          />
                        </Link>
                      </div>
                    </div>
                  </SplideSlide>
                  <SplideSlide>
                    <div className="item item--hero" id="tvcorrect">
                      <div className="item__cover" id="tv_id">
                        {" "}
                        <Link to="/tv">
                          <img
                            src="/src/assets/img/tv/tv-04.png"
                            alt="ტელევიზია"
                            loading="lazy"
                          />
                        </Link>
                      </div>
                    </div>
                  </SplideSlide>
                  <SplideSlide>
                    <div className="item item--hero" id="tvcorrect">
                      <div className="item__cover" id="tv_id">
                        {" "}
                        <Link to="/tv">
                          <img
                            src="/src/assets/img/tv/tv-05.png"
                            alt="ტელევიზია"
                            loading="lazy"
                          />
                        </Link>
                      </div>
                    </div>
                  </SplideSlide>
                  <SplideSlide>
                    <div className="item item--hero" id="tvcorrect">
                      <div className="item__cover" id="tv_id">
                        {" "}
                        <Link to="/tv">
                          <img
                            src="/src/assets/img/tv/tv-06.png"
                            alt="ტელევიზია"
                            loading="lazy"
                          />
                        </Link>
                      </div>
                    </div>
                  </SplideSlide>
                  <SplideSlide>
                    <div className="item item--hero" id="tvcorrect">
                      <div className="item__cover" id="tv_id">
                        {" "}
                        <Link to="/tv">
                          <img
                            src="/src/assets/img/tv/tv-07.png"
                            alt="ტელევიზია"
                            loading="lazy"
                          />
                        </Link>
                      </div>
                    </div>
                  </SplideSlide>
                  <SplideSlide>
                    <div className="item item--hero" id="tvcorrect">
                      <div className="item__cover" id="tv_id">
                        {" "}
                        <Link to="/tv">
                          <img
                            src="/src/assets/img/tv/tv-08.png"
                            alt="ტელევიზია"
                            loading="lazy"
                          />
                        </Link>
                      </div>
                    </div>
                  </SplideSlide>
                  <SplideSlide>
                    <div className="item item--hero" id="tvcorrect">
                      <div className="item__cover" id="tv_id">
                        {" "}
                        <Link to="/tv">
                          <img
                            src="/src/assets/img/tv/tv-09.png"
                            alt="ტელევიზია"
                            loading="lazy"
                          />
                        </Link>
                      </div>
                    </div>
                  </SplideSlide>
                </SplideTrack>
              </Splide>
            </div>
            {/*  end carousel  */}
          </div>
        </div>
      </section>
      {/* end content */}
    </>
  );
}

export default App;
