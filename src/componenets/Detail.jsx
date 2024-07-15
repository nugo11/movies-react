import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";

export default function Detail() {
  const { detailLink } = useParams();
  const location = useLocation();
  const movies = location.state?.series1 ? (location.state?.series1 || []) : (location.state?.movies || []);

  const selectedItem = movies.find((movie) => movie.detailLink === detailLink);

  console.log(movies)
  if (!selectedItem) {
    return <div>Item not found</div>;
  }

  const [count, setCount] = useState(selectedItem.movieScriptContent_script ? 10 : 0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const [filteredScript, setFilteredScript] = useState({});

  useEffect(() => {
    if (selectedItem.movieScriptContent_script) {
      setFilteredScript(
        JSON.parse(
          selectedItem.movieScriptContent_script
            .replaceAll(/\s/g, "")
            .replaceAll("title:", '"title":')
            .replaceAll("url:", '"url":')
            .replaceAll(`'`, `"`)
            .replace(/(\d+):/g, '"$1":')
            .replaceAll(",],", "],")
            .replace("}],}}", "}]}")
            .replace("},]}}", "}]}")
            .replaceAll(/\{"id":\d+"},/g, "")
            .replaceAll('""', '"')
            .replaceAll('"url":"}', '"url":""}')
            .replaceAll("languages:", '"languages":')
            .replaceAll("label:", '"label":')
            .replaceAll("sources:", '"sources":')
            .replaceAll("file:", '"file":')
            .replaceAll("type:", '"type":')
            .replaceAll('},{"', '"},{"')
            .replaceAll('""},{"', '"},{"')
            .replaceAll('}]}]"},{', "}]}]},{")
            .replaceAll('OurPlanet', 'Our Planet')
        )
      );
    }
  }, [selectedItem]);

  const [selectedSeason, setSelectedSeason] = useState("1");
  const [selectedEpisode, setSelectedEpisode] = useState("");

  useEffect(() => {
    if (filteredScript[selectedSeason]) {
      setSelectedEpisode(filteredScript[selectedSeason][0].url);
    }
  }, [filteredScript, selectedSeason]);

  const handleSeasonChange = (e) => {
    const newSeason = e.target.value;
    setSelectedSeason(newSeason);
    setSelectedEpisode(filteredScript[newSeason][0].url);
  };

  const handleEpisodeChange = (e) => {
    setSelectedEpisode(e.target.value);
  };

  const seasons = Object.keys(filteredScript);

  function getRatingClassName(rating) {
    if (Number(rating) < 6) return "red";
    if (Number(rating) < 7) return "yellow";
    if (Number(rating) >= 7) return "green";
    return "";
  }
  
  return (
    <>
      <div
        className="fullbg"
        style={{ backgroundImage: `url(../src/db/${selectedItem.poster})` }}
      ></div>
      <div className="fullbg-pattern" style={{height: '80%'}}></div>
      <div className="detail-container">
        <section className="section section--details">
          <div className="content__head content__head--mt">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <ul
                    className="nav nav-tabs content__tabs"
                    id="content__tabs"
                    role="tablist"
                  >
                    {selectedItem.movieScriptContent_script && (
                      <li className="nav-item" role="presentation">
                        <button
                          id={`0-tab`}
                          className={`${count === 10 ? "active" : "activei"}`}
                          data-bs-toggle="tab"
                          data-bs-target={`#tab-${10}`}
                          type="button"
                          role="tab"
                          aria-controls={`tab-${10}`}
                          aria-selected="true"
                          onClick={() => setCount(10)}
                        >
                          {"სერიალი"}
                        </button>
                      </li>
                    )}
                    {selectedItem.movieScriptContent_serial &&
                      selectedItem.movieScriptContent_serial.map(
                        (item, index) => {
                          let buttonText = `ფლეიერი ${index + 1}`;
                          const isLastIndex =
                            index ===
                            selectedItem.movieScriptContent_serial.length - 1;
                          const isSecondToLastIndex =
                            index ===
                            selectedItem.movieScriptContent_serial.length - 2;

                          if (
                            selectedItem.country.includes("ინგლისურად") &&
                            selectedItem.country.includes("რუსულად")
                          ) {
                            if (isLastIndex) {
                              buttonText = "რუსულად";
                            } else if (isSecondToLastIndex) {
                              buttonText = "ინგლისურად";
                            }
                          } else if (
                            selectedItem.country.includes("ინგლისურად") &&
                            isLastIndex
                          ) {
                            buttonText = "ინგლისურად";
                          } else if (
                            selectedItem.country.includes("რუსულად") &&
                            isLastIndex
                          ) {
                            buttonText = "რუსულად";
                          }

                          return (
                            <li
                              className="nav-item"
                              role="presentation"
                              key={index}
                            >
                              <button
                                id={`${index}-tab`}
                                className={`${
                                  count === index ? "active" : "activei"
                                }`}
                                data-bs-toggle="tab"
                                data-bs-target={`#tab-${index}`}
                                type="button"
                                role="tab"
                                aria-controls={`tab-${index}`}
                                aria-selected="true"
                                onClick={() => setCount(index)}
                              >
                                {buttonText}
                              </button>
                            </li>
                          );
                        }
                      )}
                    {selectedItem.movieScriptContent &&
                      selectedItem.movieScriptContent.map((item, index) => {
                        let buttonText = `ფლეიერი ${index + 1}`;
                        const isLastIndex =
                          index === selectedItem.movieScriptContent.length - 1;
                        const isSecondToLastIndex =
                          index === selectedItem.movieScriptContent.length - 2;

                        if (
                          selectedItem.country.includes("ინგლისურად") &&
                          selectedItem.country.includes("რუსულად")
                        ) {
                          if (isLastIndex) {
                            buttonText = "რუსულად";
                          } else if (isSecondToLastIndex) {
                            buttonText = "ინგლისურად";
                          }
                        } else if (
                          selectedItem.country.includes("ინგლისურად") &&
                          isLastIndex
                        ) {
                          buttonText = "ინგლისურად";
                        } else if (
                          selectedItem.country.includes("რუსულად") &&
                          isLastIndex
                        ) {
                          buttonText = "რუსულად";
                        }

                        return (
                          <li
                            className="nav-item"
                            role="presentation"
                            key={index}
                          >
                            <button
                              id={`${index}-tab`}
                              className={`${
                                (count === index) ? "active" : "activei"
                              }`}
                              data-bs-toggle="tab"
                              data-bs-target={`#tab-${index}`}
                              type="button"
                              role="tab"
                              aria-controls={`tab-${index}`}
                              aria-selected="true"
                              onClick={() => setCount(index)}
                            >
                              {buttonText}
                            </button>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-12 ">
                <div className="tab-content">
                  {selectedItem.movieScriptContent_serial &&
                    selectedItem.movieScriptContent_serial.map(
                      (item, index) => (
                        <div
                          className={`tab-pane fade ${
                            count === index ||
                            !selectedItem.movieScriptContent_script
                              ? "show active"
                              : ""
                          }`}
                          id={`tab-${index}`}
                          role="tabpanel"
                          aria-labelledby={`${index}-tab`}
                          tabIndex="1"
                        >
                          <div className="row">
                            <div className="col-12">
                              {loading ? (
                                <span className="loader"></span>
                              ) : (
                                <>
                                  {
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: item,
                                      }}
                                    />
                                  }
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  {selectedItem.movieScriptContent_script && (
                    <div
                      className={`tab-pane fade ${
                        count === 10 ? "show active" : ""
                      }`}
                      id={`tab-${10}`}
                      role="tabpanel"
                      aria-labelledby={`${10}-tab`}
                      tabIndex="0"
                    >
                      <div className="row">
                        <div className="col-12" id="playerContainerforserial">
                          {loading ? (
                            <span className="loader"></span>
                          ) : (
                            <>
                              <select
                                id="serialSelect"
                                value={selectedSeason}
                                onChange={handleSeasonChange}
                              >
                                {seasons.map((season) => (
                                  <option key={season} value={season}>
                                    სეზონი {season}
                                  </option>
                                ))}
                              </select>

                              {selectedSeason && (
                                <>
                                  <select
                                    id="serialSelect"
                                    value={selectedEpisode}
                                    onChange={handleEpisodeChange}
                                  >
                                    {filteredScript[selectedSeason].map(
                                      (opt, index) => (
                                        <option
                                          key={index}
                                          value={
                                            opt.url
                                              ? opt.url
                                              : opt.languages[0].sources[0].file
                                          }
                                        >
                                          {opt.title
                                            .replaceAll("სერია", "სერია ")
                                            .replaceAll("ფლეიერი", "ფლეიერი ")}
                                        </option>
                                      )
                                    )}
                                  </select>

                                  {!selectedEpisode.includes("mp4") ? (
                                    <>
                                      <iframe
                                        src={
                                          selectedEpisode == ""
                                            ? filteredScript["1"][0].url
                                            : selectedEpisode
                                        }
                                        frameBorder="0"
                                        width={"100%"}
                                        height={"519px"}
                                        scrolling="no"
                                        webkitallowfullscreen=""
                                        mozallowfullscreen=""
                                        allowFullScreen=""
                                      ></iframe>
                                    </>
                                  ) : (
                                    <>
                                      <video
                                        width={"100%"}
                                        height={"519px"}
                                        src={
                                          selectedEpisode == ""
                                            ? filteredScript["1"][0]
                                                .languages[0].sources[0].file
                                            : selectedEpisode
                                        }
                                        disableRemotePlayback=""
                                        webkit-playsinline=""
                                        playsInline=""
                                        controls
                                      ></video>
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedItem.movieScriptContent &&
                    selectedItem.movieScriptContent.map((item, index) => (
                      <div
                        key={index}
                        className={`tab-pane fade ${
                          (count === index) || ((count === index) && !selectedItem.movieScriptContent_script) ? "show active" : ""
                        }`}
                        id={`tab-${index}`}
                        role="tabpanel"
                        aria-labelledby={`${index}-tab`}
                        tabIndex="0"
                      >
                        <div className="row">
                          <div className="col-12">
                            {loading ? (
                              <span className="loader"></span>
                            ) : (
                              <div
                                key={index}
                                dangerouslySetInnerHTML={{ __html: item }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="container" style={{ marginTop: 50 }}>
            <div className="row">
              <div className="col-12">
                <h1 className="section__title section__title--head fulltitle">
                  <span style={{ fontSize: 25 }}>{selectedItem.title_geo}</span>
                  <span style={{ fontSize: 18, opacity: 0.5 }}>
                    {selectedItem.title_en}
                  </span>
                </h1>
              </div>
              <div className="col-12">
                <div className="item item--details">
                  <div className="row">
                    <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-3">
                      <div className="item__cover">
                        <img
                          src={`../src/db/${selectedItem.poster}`}
                          alt={`${selectedItem.title_geo} / ${selectedItem.title_en} ქართულად`}
                        />
                        <span
                          className={`item__rate item__rate--${getRatingClassName(
                            selectedItem.imdb
                          )}`}
                        >
                          {selectedItem.imdb}
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-md-7 col-lg-8 col-xl-6 col-xxl-7">
                      <div className="item__content">
                        <ul className="item__meta">
                          <li>
                            <span>წელი:</span>{" "}
                            <Link
                              to={`/movies?year_from=${selectedItem.year}&year_to=${selectedItem.year}`}
                            >
                              {selectedItem.year}
                            </Link>
                          </li>
                          <li>
                            <span>ჟანრი:</span>
                            {selectedItem.genre.map((item, index) => (
                              <Link key={index} to={`/movies?genre=${item}`}>
                                {item}
                              </Link>
                            ))}
                          </li>
                          <li>
                            <span>თარგმანი:</span>{" "}
                            {selectedItem.country.map((item, index) => (
                              <Link key={index} to={`/movies?country=${item}`}>
                                {item}
                              </Link>
                            ))}
                          </li>
                          <li>
                            <span>რეჟისორი:</span>{" "}
                            {selectedItem.director.map((item, index) => (
                              <Link key={index} to={`/movies?director=${item}`}>
                                {item}
                              </Link>
                            ))}
                          </li>
                          <li>
                            <span>მსახიობები:</span>{" "}
                            {selectedItem.actors.map((item, index) => (
                              <Link key={index} to={`/movies?actors=${item}`}>
                                {item}
                              </Link>
                            ))}
                          </li>
                        </ul>
                        <div className="item__description">
                          <p>{selectedItem.story}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
