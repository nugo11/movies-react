import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const options = [
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

function getRatingClassName(rating) {
  if (Number(rating) < 6) return "red";
  if (Number(rating) < 7) return "yellow";
  if (Number(rating) >= 7) return "green";
  return "";
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Mov() {
  const [movies, setMovies] = useState(null);
  const [filterValues, setFilterValues] = useState({
    country: "",
    year_from: 1921,
    year_to: 2026,
    imdb_from: 1.1,
    imdb_to: 9.9,
    genre: [],
  });
  const query = useQuery();
  const navigate = useNavigate();
  const moviesPerPage = 18;
  const currentPage = Number(query.get("page")) || 1;

  useEffect(() => {
    const filters = Object.fromEntries(query.entries());
    fetchMovies(filters)
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [query]);

  const fetchMovies = async (filters) => {
    const queryString = new URLSearchParams(filters).toString();
    const response = await fetch(`http://localhost:3000/api/articles?${queryString}`);
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    return await response.json();
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies ? movies.slice(indexOfFirstMovie, indexOfLastMovie) : [];

  const handleFilterChange = (name, value) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams(query);

    Object.keys(filterValues).forEach((key) => {
      if (key === "genre") {
        params.delete("genre");
        filterValues[key].forEach((g) => params.append("genre", g));
      } else if (filterValues[key]) {
        params.set(key, filterValues[key]);
      } else {
        params.delete(key);
      }
    });

  params.delete("page");


    navigate(`?${params.toString()}`);
  };

  const paginate = (pageNumber) => {
    const params = new URLSearchParams(query);
    params.set("page", pageNumber);
    navigate(`?${params.toString()}`);
    window.scrollTo({ top: 0 });
  };

  const renderPagination = () => {
    if (!movies) return null;

    const totalPages = Math.ceil(movies.length / moviesPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <ul className="paginator">
        {currentPage > 1 && (
          <li className="paginator__item paginator__item--prev">
            <a onClick={() => paginate(currentPage - 1)}>
              <i className="ti ti-chevron-left"></i>
            </a>
          </li>
        )}
        {pageNumbers.map((number) => {
          if (
            number === 1 ||
            number === totalPages ||
            (number >= currentPage - 2 && number <= currentPage + 2)
          ) {
            return (
              <li
                key={number}
                className={`paginator__item ${currentPage === number ? "paginator__item--active" : ""}`}
              >
                <a onClick={() => paginate(number)} className="page-link">
                  {number}
                </a>
              </li>
            );
          } else if (number === 2 || number === totalPages - 1) {
            return <li key={number} className="page-item">...</li>;
          }
          return null;
        })}
        {currentPage < totalPages && (
          <li className="paginator__item paginator__item--next">
            <a onClick={() => paginate(currentPage + 1)}>
              <i className="ti ti-chevron-right"></i>
            </a>
          </li>
        )}
      </ul>
    );
  };

  const scrollRef = useRef(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionClick = (option) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((opt) => opt !== option)
      : [...selectedOptions, option];
    
    setSelectedOptions(newSelectedOptions);
    setFilterValues((prevValues) => ({
      ...prevValues,
      genre: newSelectedOptions,
    }));
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <>
      {/* page title */}
      <section className="section section--first" style={{ marginTop: 80 }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section__wrap">
                {/* section title */}
                <h1 className="section__title section__title--head">ფილმები</h1>
                {/* end section title */}

                {/* breadcrumbs */}
                <ul className="breadcrumbs">
                  <li className="breadcrumbs__item">
                    <a href="/">მთავარი</a>
                  </li>
                  <li className="breadcrumbs__item breadcrumbs__item--active">
                    ფილმები
                  </li>
                </ul>
                {/* end breadcrumbs */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end page title */}

        {/* filter */}
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
                  <select
                    name="country"
                    id="lang"
                    value={filterValues.lang}
                    onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
                  >
                    <option value="">გახმოვანება</option>
                    <option value="ქართულად">ქართულად</option>
                    <option value="ინგლისურად">ინგლისურად</option>
                    <option value="რუსულად">რუსულად</option>
                  </select>
                  <div className="filter_year">
                    <input
                      type="number"
                      placeholder="1921"
                      value={filterValues.year_from}
                      onChange={(e) => handleFilterChange('year_from', e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="2026"
                      value={filterValues.year_to}
                      onChange={(e) => handleFilterChange('year_to', e.target.value)}
                    />
                  </div>
                  <div className="filter_imdb">
                    <input
                      type="number"
                      placeholder="1.1"
                      value={filterValues.imdb_from}
                      onChange={(e) => handleFilterChange('imdb_from', e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="9.9"
                      value={filterValues.imdb_to}
                      onChange={(e) => handleFilterChange('imdb_to', e.target.value)}
                    />
                  </div>
                  <button id="fullSearch" onClick={applyFilters}>
                    მოძებნა
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end filter */}

     {/* catalog */}
     <div className="section section--catalog">
        <div className="container">
          <div className="row">
            {/* item */}
            {currentMovies.length ? (
              <>
                {currentMovies.map((item) => (
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
                        <a href={`/${item.detailLink}`} className="item__play">
                          <i className="ti ti-player-play-filled"></i>
                        </a>
                        <span
                          className={`item__rate item__rate--${getRatingClassName(
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
            {/* end item */}
          </div>

          <div className="row">
            {/* paginator */}
            <div className="col-12">
              {renderPagination()}
            </div>
            {/* end paginator */}
          </div>
        </div>
      </div>
      {/* end catalog */}
    </>
  );
}
