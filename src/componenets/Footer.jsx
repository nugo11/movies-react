import React, { useEffect } from 'react';

export default function Footer() {
  useEffect(() => {
    const scriptUrls = [
      'src/assets/js/bootstrap.bundle.min.js',
      'src/assets/js/splide.min.js',
      'src/assets/js/smooth-scrollbar.js',
      'src/assets/js/plyr.min.js',
      'src/assets/js/photoswipe.min.js',
      'src/assets/js/photoswipe-ui-default.min.js',
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

    setTimeout(() => {
      loadScripts();
    }, 1000);

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
              <a href="index.html" className="footer__logo">
                <img src="img/logo.svg" alt="" />
              </a>

              <span className="footer__copyright">
                Imov.Ge, 2021—2024 <br /> © დაცულია ყველა უფლება
              </span>

              <nav className="footer__nav">
                <a href="about">ჩვენს შესახებ</a>
                <a href="contacts">კონტაქტი</a>
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
