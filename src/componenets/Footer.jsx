import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  useEffect(() => {
    const scriptUrls = [
      'src/assets/js/bootstrap.bundle.min.js',
      'src/assets/js/smooth-scrollbar.js',
      'src/assets/js/main.js',
    ];

    const loadScripts = () => {
      const divScript = document.createElement('div');
      scriptUrls.forEach((src) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        script.onerror = () => {
          console.error(`Error loading ${src}`);
        };
        divScript.classList.add('scriptContainer')
        document.body.appendChild(divScript);
        divScript.appendChild(script)
        divScript.remove()
      });
    };

    loadScripts();

    return () => {
      scriptUrls.forEach((src) => {
        const scripts = document.querySelectorAll(`script[src="${src}"]`);
        scripts.forEach((script) => script.remove());
      });
    };
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="footer__content">
          

              <Link to="/" className="footer__logo">
                  <img src="assets/img/logo.png" alt="" />
                </Link>

              <span className="footer__copyright">
                filmebi.in 2024 <br /> © ყველა უფლება დაცულია
              </span>

              <nav className="footer__nav">
                <Link to="/">ჩვენს შესახებ</Link>
                <Link to="/">კონტაქტი</Link>
              </nav>

              <button className="footer__back" type="button">
                <i className="ti ti-arrow-narrow-up"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
