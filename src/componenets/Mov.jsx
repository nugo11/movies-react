import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img404 from "../../public/assets/img/404 - mov.webp";
import { useMovies } from "./MoviesContext";

const options = [
  "სერიალი",
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
  const { movies, totalPages } = useMovies();
  const query = useQuery();
  const navigate = useNavigate();
  const currentPage = Number(query.get("page")) || 1;

  const [filterValues, setFilterValues] = useState({});

  const [show404, setShow404] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [year_from_state, setYearState] = useState(null);
  const [year_to_state, setYearToState] = useState(null);

  const [Imdb_from_state, setImdbState] = useState(null);
  const [Imdb_to_state, setImdbToState] = useState(null);

  const [FilterCountry, setFilterCountry] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const getUrlParameter = (name) => {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
      const results = regex.exec(window.location.search);
      return results === null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
    };
    const genreParam = getUrlParameter("genre");

    if (genreParam) {
      const genres = genreParam
        .split(",")
        .filter((genre) => genre.trim() !== "");
      setSelectedOptions(genres);
    } else {
      setSelectedOptions([]);
    }

    const year_from_Param = getUrlParameter("year_from");

    if (year_from_Param) {
      setYearState(year_from_Param);
    } else {
      setYearState(1921);
    }

    const year_to_Param = getUrlParameter("year_to");

    if (year_to_Param) {
      setYearToState(year_to_Param);
    } else {
      setYearToState(2026);
    }

    const Imdb_from_Param = getUrlParameter("imdb_from");

    if (Imdb_from_Param) {
      setImdbState(Imdb_from_Param);
    } else {
      setImdbState(1.1);
    }

    const Imdb_to_Param = getUrlParameter("imdb_to");

    if (Imdb_to_Param) {
      setImdbToState(Imdb_to_Param);
    } else {
      setImdbToState(9.9);
    }

    const country = getUrlParameter("country");

    if (country) {
      setFilterCountry(country);
    } else {
      setFilterCountry("");
    }
  }, []);

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
        if (filterValues[key].length > 0) {
          params.set("genre", filterValues[key].join(","));
        }
      } else if (filterValues[key]) {
        params.set(key, filterValues[key]);
      } else {
        params.delete(key);
      }
    });
    params.delete("page");

    navigate(`?${params.toString()}`);
  };

  const scrollRef = useRef(null);

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

  const paginate = (pageNumber) => {
    const params = new URLSearchParams(query);
    params.set("page", pageNumber);
    navigate(`?${params.toString()}`);
    window.scrollTo({ top: 0 });
  };

  const renderPagination = () => {
    if (!movies) return null;

    const totalPage = totalPages;
    const pageNumbers = [];
    for (let i = 1; i <= totalPage; i++) {
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
            number === totalPage ||
            (number >= currentPage - 2 && number <= currentPage + 2)
          ) {
            return (
              <li
                key={number}
                className={`paginator__item ${
                  currentPage === number ? "paginator__item--active" : ""
                }`}
              >
                <a onClick={() => paginate(number)} className="page-link">
                  {number}
                </a>
              </li>
            );
          } else if (number === 2 || number === totalPage - 1) {
            return (
              <li key={number} className="page-item">
                ...
              </li>
            );
          }
          return null;
        })}
        {currentPage < totalPage && (
          <li className="paginator__item paginator__item--next">
            <a onClick={() => paginate(currentPage + 1)}>
              <i className="ti ti-chevron-right"></i>
            </a>
          </li>
        )}
      </ul>
    );
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
                    onChange={(e) =>
                      handleFilterChange(e.target.name, e.target.value)
                    }
                  >
                    <option
                      value=""
                      selected={FilterCountry === "" ? "selected" : ""}
                    >
                      გახმოვანება
                    </option>
                    <option
                      value="ქართულად"
                      selected={FilterCountry === "ქართულად" ? "selected" : ""}
                    >
                      ქართულად
                    </option>
                    <option
                      value="ინგლისურად"
                      selected={
                        FilterCountry === "ინგლისურად" ? "selected" : ""
                      }
                    >
                      ინგლისურად
                    </option>
                    <option
                      value="რუსულად"
                      selected={FilterCountry === "რუსულად" ? "selected" : ""}
                    >
                      რუსულად
                    </option>
                  </select>
                  <div className="filter_year">
                    <input
                      type="number"
                      placeholder={year_from_state}
                      onChange={(e) =>
                        handleFilterChange("year_from", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      placeholder={year_to_state}
                      onChange={(e) =>
                        handleFilterChange("year_to", e.target.value)
                      }
                    />
                  </div>
                  <div className="filter_imdb">
                    <input
                      type="number"
                      placeholder={Imdb_from_state}
                      onChange={(e) =>
                        handleFilterChange("imdb_from", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      placeholder={Imdb_to_state}
                      onChange={(e) =>
                        handleFilterChange("imdb_to", e.target.value)
                      }
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
            {movies.length ? (
              <>
                {movies.map((item) => (
                  <div
                    key={item.detailLink}
                    className="col-6 col-sm-4 col-lg-3 col-xl-2"
                  >
                    <div className="item">
                      <div className="item__cover">
                        <img
                          src={`/src/db/mov/${item.poster}`}
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
                  </div>
                ))}
              </>
            ) : (
              <div
                className="center404"
                style={{ display: show404 === true && "flex" }}
              >
                <div className="imgbg404">
                  <img src={img404} alt="404 error movie" />
                </div>
                <b style={{ fontSize: 40, color: "#f9ab00" }}>
                  ფილმი ვერ მოიძებნა
                </b>
              </div>
            )}
            {/* end item */}
          </div>

          <div className="row">
            {/* paginator */}
            <div className="col-12">{renderPagination()}</div>

            {/* end paginator */}
          </div>
        </div>
      </div>
      {/* end catalog */}
    </>
  );
}
