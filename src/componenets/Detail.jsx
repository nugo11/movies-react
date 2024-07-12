import React, { useEffect, useState } from "react";
import db from "../db/articles.json";
import { useParams, Link } from "react-router-dom";

export default function Detail() {
  const { detailLink } = useParams();

  const selectedItem = db.find((item) => item.detailLink === detailLink);

  if (!selectedItem) {
    return <div>Item not found</div>;
  }

  function getRatingClassName(rating) {
    if (Number(rating) < 6) return "red";
    if (Number(rating) < 7) return "yellow";
    if (Number(rating) >= 7) return "green";
    return "";
  }

  const [count, setCount] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        className="fullbg"
        style={{ backgroundImage: `url(../src/db/${selectedItem.poster})` }}
      ></div>
      <div className="fullbg-pattern"></div>
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
                    {selectedItem.movieScriptContent.map((item, index) => {
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
                  {selectedItem.movieScriptContent.map((item, index) => (
                    <div
                      key={index}
                      className={`tab-pane fade ${
                        count === index ? "show active" : ""
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
                              <Link
                                key={index}
                                to={`/movies?genre=${item}`}
                              >
                                {item}
                              </Link>
                            ))}
                          </li>
                          <li>
                            <span>თარგმანი:</span>{" "}
                            {selectedItem.country.map((item, index) => (
                               <Link
                               key={index}
                               to={`/movies?country=${item}`}
                             >
                               {item}
                             </Link>
                            ))}
                          </li>
                          <li>
                            <span>რეჟისორი:</span>{" "}
                            {selectedItem.director.map((item, index) => (
                              <Link
                              key={index}
                              to={`/movies?director=${item}`}
                            >
                              {item}
                            </Link>
                            ))}
                          </li>
                          <li>
                            <span>მსახიობები:</span>{" "}
                            {selectedItem.actors.map((item, index) => (
                               <Link
                               key={index}
                               to={`/movies?actors=${item}`}
                             >
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
