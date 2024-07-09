import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import db from "../db/articles.json";

const itemsPerPage = 18;

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

  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page');
    if (page) {
      setCurrentPage(Number(page));
    }
  }, [location]);

  const totalPages = Math.ceil(db.length / itemsPerPage);
  const currentItems = db.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`/movies?page=${page}`);
  };

  const renderPagination = () => {
    const pages = [];
    const pageNeighbours = 2;
    const totalNumbers = (pageNeighbours * 2) + 2;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let hasLeftSpill = startPage > 2;
      let hasRightSpill = (totalPages - endPage) > 1;
      let spillOffset = totalNumbers - (endPage - startPage + 1);

      switch (true) {
        case (hasLeftSpill && !hasRightSpill): {
          let extraPages = [...Array(spillOffset)].map((_, index) => startPage - index - 1);
          pages.push(1, 'LEFT', ...extraPages.reverse(), ...range(startPage, endPage), totalPages);
          break;
        }

        case (!hasLeftSpill && hasRightSpill): {
          let extraPages = [...Array(spillOffset)].map((_, index) => endPage + index + 1);
          pages.push(1, ...range(startPage, endPage), ...extraPages, 'RIGHT', totalPages);
          break;
        }

        case (hasLeftSpill && hasRightSpill):
        default: {
          pages.push(1, 'LEFT', ...range(startPage, endPage), 'RIGHT', totalPages);
          break;
        }
      }
    } else {
      pages.push(...range(1, totalPages));
    }

    return (
      <ul className="paginator">
        <li className={`paginator__item paginator__item--prev ${currentPage === 1 ? 'disabled' : ''}`}>
          <a href="#" onClick={() => handlePageChange(currentPage - 1)}>
            <i className="ti ti-chevron-left"></i>
          </a>
        </li>
        {pages.map((page, index) =>
          page === 'LEFT' ? (
            <li key={index} className="paginator__item">
              <span>...</span>
            </li>
          ) : page === 'RIGHT' ? (
            <li key={index} className="paginator__item">
              <span>...</span>
            </li>
          ) : (
            <li key={index} className={`paginator__item ${currentPage === page ? 'paginator__item--active' : ''}`}>
              <a href="#" onClick={() => handlePageChange(page)}>{page}</a>
            </li>
          )
        )}
        <li className={`paginator__item paginator__item--next ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a href="#" onClick={() => handlePageChange(currentPage + 1)}>
            <i className="ti ti-chevron-right"></i>
          </a>
        </li>
      </ul>
    );
  };

  const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
      range.push(i);
      i += step;
    }

    return range;
  };


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
            {fetch('http://localhost:3000/api/movies')
  .then(res => res.json()) 
  .then(data => data)}
            {/*end item */}
          </div>

          <div className="row">
            {/*paginator */}
            <div className="col-12">
              {/*paginator desktop */}
              {renderPagination()}
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
