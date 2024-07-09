import React, { useEffect, useState } from "react";

function getRatingclassName(rating) {
  if (Number(rating) < 6) return "red";
  if (Number(rating) < 7) return "yellow";
  if (Number(rating) >= 7) return "green";
  return "";
}

export default function Mov() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    fetchMovies()
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  const fetchMovies = async () => {
    const response = await fetch("http://localhost:3000/api/articles");
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    return await response.json();
  };


  return (
    <>

      {/*page title */}
      <section className="section section--first" style={{ marginTop: 80 }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section__wrap">
                {/*section title */}
                <h1 className="section__title section__title--head">ფილმები</h1>
                {/*end section title */}

                {/*breadcrumbs */}
                <ul className="breadcrumbs">
                  <li className="breadcrumbs__item">
                    <a href="/">მთავარი</a>
                  </li>
                  <li className="breadcrumbs__item breadcrumbs__item--active">
                    ფილმები
                  </li>
                </ul>
                {/*end breadcrumbs */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*end page title */}

      {/*catalog */}
      <div className="section section--catalog">
        <div className="container">
          <div className="row">
            {/*item */}
            {movies ? (
              <>
                {movies.slice(0, 18).map((item) => (
                  <div
                  key={item.detailLink}
                  className="col-6 col-sm-4 col-lg-3 col-xl-2"
                  >
                    {console.log(item.title_en)}
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
                          <a href={`/${item.detailLink}`}>{item.title_geo}</a>
                        </h3>
                        <span className="item__category">
                          <a href={`/${item.detailLink}`}>{item.title_en}</a>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p>Loading...</p>
            )}
            {/*end item */}
          </div>

          <div className="row">
            {/*paginator */}
            <div className="col-12">
              {/*paginator desktop */}
              {}
              {/*end paginator desktop */}
            </div>
            {/*end paginator */}
          </div>
        </div>
      </div>
      {/*end catalog */}
    </>
  );
}
