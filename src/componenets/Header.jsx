import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [change, setChange] = useState("");
  const navigate = useNavigate();

  const geo = 'ქწერტყუიოპასდფგჰჯკლზხცვბნმ';
  const en = 'qwertyuiopasdfghjklzxcvbnm';

  const handleSubmit = (e) => {
    e.preventDefault();
    if(geo.split('').some(letter => change.includes(letter))) {
      navigate(`/search?title_geo=${change.toLocaleLowerCase()}`);
    }
    if(en.split('').some(letter => change.includes(letter))) {
      navigate(`/search?title_en=${change.toLocaleLowerCase()}`);
    }
    setChange("");
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="header__content">
                <Link to="/" className="header__logo">
                  <img src="assets/img/logo.png" alt="" />
                </Link>

                <ul className="header__nav">
                  <li className="header__nav-item">
                    <Link to="/" className="header__nav-link">
                      მთავარი
                    </Link>
                  </li>

                  <li className="header__nav-item">
                    <Link to="/movies?mov" className="header__nav-link">
                      ფილმები
                    </Link>
                  </li>

                  <li className="header__nav-item">
                    <Link to="/serial?ser" className="header__nav-link">
                      სერიალები
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link to="/tv" className="header__nav-link">
                      ტელევიზია
                    </Link>
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
