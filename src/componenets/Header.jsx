import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMovies } from "./MoviesContext";

export default function Header() {
  const [change, setChange] = useState("");
  const navigate = useNavigate();

  function getRatingclassName(rating) {
    if (Number(rating) < 6) return "#eb5757";
    if (Number(rating) < 7) return "#ffc312";
    if (Number(rating) >= 7) return "#29b474";
    return "";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?title=${change.toLocaleLowerCase()}`);
    setChange("");
  };

  const { movies } = useMovies();

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="header__content">
                <Link to="/" className="header__logo">
                  <img src="../../public/assets/img/logo.png" alt="" />
                </Link>

                <ul className="header__nav">
                  <li className="header__nav-item">
                    <Link to="/" className="header__nav-link">
                      მთავარი
                    </Link>
                  </li>

                  <li className="header__nav-item">
                    <Link to="/movies" className="header__nav-link">
                      ფილმები
                    </Link>
                  </li>

                  <li className="header__nav-item">
                    <Link to="/serial?genre=სერიალი" className="header__nav-link">
                      სერიალები
                    </Link>
                  </li>

                  <li className="header__nav-item">
                    <a href="/anime" className="header__nav-link">
                      ანიმე
                    </a>
                  </li>

                  <li className="header__nav-item">
                    <a href="/movies" className="header__nav-link">
                      ტელევიზია
                    </a>
                  </li>
                </ul>

                <div className="header__auth">
                  <form className="header__search" onSubmit={handleSubmit}>
                    <input
                      className="header__search-input"
                      type="text"
                      placeholder="ძებნა..."
                      value={change}
                      onChange={(e) => setChange(e.target.value)}
                    />
                    <button className="header__search-button" type="submit">
                      <i className="ti ti-search"></i>
                    </button>
                    <button className="header__search-close" type="button">
                      <i className="ti ti-x"></i>
                    </button>
                  </form>

                  <div
                    className="quicksearch"
                    style={
                      change.length >= 3
                        ? { visibility: "visible", opacity: 1 }
                        : { visibility: "hidden" }
                    }
                  >
                    <ul>
                      {movies
                        .filter(
                          (data) =>
                            String(data.title_geo).includes(change) ||
                            String(data.title_en).toLowerCase().includes(change)
                        )
                        .slice(0, 6)
                        .map((item) => (
                          <Link
                            key={item.detailLink}
                            to={`/${item.detailLink}`}
                            state={{ movies }}
                            onClick={() => setChange("")}
                          >
                            <li>
                              <img
                                src={`../src/db/${item.poster}`}
                                alt={`${item.title_geo} / ${item.title_en} ქართულად`}
                              />
                              <div className="title">
                                <h3>{item.title_geo}</h3>
                                <small>{item.title_en}</small>
                              </div>
                              <span
                                className="item_rate_quicksearch"
                                style={{
                                  border: `1px solid ${getRatingclassName(
                                    item.imdb
                                  )}`,
                                }}
                              >
                                {item.imdb}
                              </span>
                            </li>
                          </Link>
                        ))}
                    </ul>
                  </div>

                  <button className="header__search-btn" type="button">
                    <i className="ti ti-search"></i>
                  </button>
                </div>

                <button className="header__btn" type="button">
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
