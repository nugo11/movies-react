import React, { useState, useRef } from "react";
import db from "../db/articles.json";

const options = [
  "ყველა ფილმი",
  "კომედია",
  "სათავგადასავლო",
  "საშინელება",
  "ანიმაციური",
  "დრამა",
  "მძაფრ-სიუჟეტიანი",
  "საოჯახო",
  "ფანტასტიკა",
  "ტრილერი",
  "დეტექტივი",
  "კრიმინალური",
  "სპორტული",
  "ბოევიკი",
  "მელოდრამა",
  "რომანტიკული",
  "დოკუმენტური",
  "საომარი",
  "ისტორიული",
  "სერიალი",
  "რუსული",
  "ქართული ფილმები",
  "საახალწლო",
  "მოკლემეტრაჟიანი",
  "ფენტეზი",
  "მუსიკალური",
  "საბავშვო",
  "ვესტერნი",
  "ბიოგრაფიული",
  "მისტიკა",
];

export default function Mov() {
  function getRatingclassName(rating) {
    if (Number(rating) < 6) return "red";
    if (Number(rating) < 7) return "yellow";
    if (Number(rating) >= 7) return "green";
    return "";
  }

 
  const [selectedOptions, setSelectedOptions] = useState([]);
  const scrollRef = useRef(null);

  const [pushSelected, setPushSelected] = useState([]);
  function selectedPush() {
    setPushSelected(selectedOptions);
  }

  const handleOptionClick = (option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((opt) => opt !== option)
        : [...prevSelected, option]
    );
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
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

      {/*filter */}
      <div className="filter">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="filter__content">
                <div className="horizontal-select">
                  <button className="arrow left-arrow" onClick={scrollLeft}>
                    <i className="ti ti-chevron-left"></i>
                  </button>
                  <div className="options" ref={scrollRef}>
                    {options.map((option) => (
                      <div
                        key={option}
                        className={`option ${
                          selectedOptions.includes(option) ? "selected" : ""
                        }`}
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                  <button className="arrow right-arrow" onClick={scrollRight}>
                    <i className="ti ti-chevron-right"></i>
                  </button>
                </div>

                <div className="filter_two">
                  <select name="lang" id="land">
                    <option value="ქართულად">ქართულად</option>
                    <option value="ინგლისურად">ინგლისურად</option>
                    <option value="რუსულად">რუსულად</option>
                  </select>
                  <div className="filter_year">
                    <input type="text" value="1921" id="" />
                    <input type="text" value="2026" id="" />
                  </div>
                  <div className="filter_imdb">
                    <input type="text" value="1.1" id="" />
                    <input type="text" value="10" id="" />
                  </div>
                  <button id="fullSearch" onClick={() => selectedPush()}>
                    ძებნა
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*end filter */}

      {/*catalog */}
      <div className="section section--catalog">
        <div className="container">
          <div className="row">
            {/*item */}
            {db
              .filter((item) => {
                return (
                  pushSelected.length === 0 ||
                  pushSelected.every((selected) => item.genre.includes(selected))
                );
              })
              .map((item) => {
                return (
                  <div
                    key={item.id}
                    className="col-6 col-sm-4 col-lg-3 col-xl-2"
                  >
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
                );
              })}
            {/*end item */}
          </div>

          <div className="row">
            {/*paginator */}
            <div className="col-12">
              {/*paginator desktop */}
              
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
