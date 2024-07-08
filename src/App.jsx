import { useState } from "react";
import db from "./db/articles.json";

function getRatingclassName(rating) {
  if (Number(rating) < 6) return "red";
  if (Number(rating) < 7) return "yellow";
  if (Number(rating) >= 7) return "green";
  return "";
}


function App() {
  const [swich, setSwich] = useState('tab-1');
  console.log(swich)
  return (
    <>
      <div className="fulminebg"></div>
      <div className="fullbg-pattern"></div>
      <section className="home">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="home__title">
                <b>
                  <span style={{ color: "#f9ab00" }}>ფილ</span>მები
                </b>{" "}
                ქართულად
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
                    {db.slice(0, 6).map((item) => {
                      return (
                        <>
                          <li className="splide__slide">
                            <div className="item item--hero">
                              <div className="item__cover">
                                 <img 
                                  src={`/src/db/${item.poster}`}
                                  alt={`${item.title_geo} / ${item.title_en} ქართულად`}
                                />
                                <a
                                  href={`/${item.detailLink}`}
                                  className="item__play"
                                >
                                  <i className="ti ti-player-play-filled"></i>
                                </a>
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
                                  <a href={`/${item.detailLink}`}>
                                    {item.title_geo}
                                  </a>
                                </h3>
                                <span className="item__category">
                                  <a href={`/${item.detailLink}`}>
                                    {item.title_en}
                                  </a>
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

      {/* content */}
      <section className="content">
        <div className="content__head">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* content title */}
                <h2 className="content__title">
                  <b>
                    <span style={{ color: "#f9ab00" }}>ახა</span>ლი
                  </b>{" "}
                  დამატებული
                </h2>
                {/* end content title */}

                {/* content tabs nav */}
                <div className="combineul">
                  <ul
                    className="nav nav-tabs content__tabs"
                    id="content__tabs"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        id="1-tab"
                        className="active"
                        data-bs-toggle="tab"
                        data-bs-target="#tab-1"
                        type="button"
                        role="tab"
                        aria-controls="tab-1"
                        aria-selected="true"
                        onClick={() => setSwich('tab-1')}
                      >
                        ფილმები
                      </button>
                    </li>

                    <li className="nav-item" role="presentation">
                      <button
                        id="2-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#tab-2"
                        type="button"
                        role="tab"
                        aria-controls="tab-2"
                        aria-selected="false"
                        onClick={() => setSwich('tab-2')}
                      >
                        სერიალები
                      </button>
                    </li>

                    <li className="nav-item" role="presentation">
                      <button
                        id="3-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#tab-3"
                        type="button"
                        role="tab"
                        aria-controls="tab-3"
                        aria-selected="false"
                        onClick={() => setSwich('tab-3')}
                      >
                        ანიმე
                      </button>
                    </li>
                  </ul>
                  <ul className="viewallul">
                    <a href="/movies">ყველას ნახვა</a>
                  </ul>
                </div>
                {/* end content tabs nav */}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          {/* content tabs */}
          <div className="tab-content">
            <div
              className="tab-pane fade show active"
              id="tab-1"
              role="tabpanel"
              aria-labelledby="1-tab"
              tabindex="0"
            >
              <div className="row">
                {db.slice(0, 12).map((item) => {
                  return (
                    <>
                      {/* item */}
                      <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
                        <div className="item">
                          <div className="item__cover">
                             <img 
                              src={`/src/db/${item.poster}`}
                              alt={`${item.title_geo} / ${item.title_en} ქართულად`}
                            />
                            <a href={`/${item.detailLink}`} className="item__play">
                              <i className="ti ti-player-play-filled"></i>
                            </a>
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
                              <a href={`/${item.detailLink}`}>
                                {item.title_geo}
                              </a>
                            </h3>
                            <span className="item__category">
                              <a href={`/${item.detailLink}`}>
                                {item.title_en}
                              </a>
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* end item */}
                    </>
                  );
                })}
              </div>
            </div>

         
          </div>
          {/* end content tabs */}
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
                <a
                  href="catalog.html"
                  className="section__view section__view--carousel"
                >
                  ყველას ნახვა
                </a>
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
                    {db
                      .filter((data) => data.genre.includes("ანიმაციური"))
                      .slice(0, 8)
                      .map((item) => {
                        return (
                          <>
                            <li className="splide__slide">
                              <div className="item item--hero">
                                <div className="item__cover" id="sabavshvo">
                                   <img 
                                    src={`/src/db/${item.poster}`}
                                    alt={`${item.title_geo} / ${item.title_en} ქართულად`}
                                  />
                                  <a
                                    href={`/${item.detailLink}`}
                                    className="item__play"
                                  >
                                    <i className="ti ti-player-play-filled"></i>
                                  </a>
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
                                    <a href={`/${item.detailLink}`}>
                                      {item.title_geo}
                                    </a>
                                  </h3>
                                  <span className="item__category">
                                    <a href={`/${item.detailLink}`}>
                                      {item.title_en}
                                    </a>
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
  );
}

export default App;
