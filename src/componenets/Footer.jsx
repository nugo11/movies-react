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
                <Link to="https://www.facebook.com/profile.php?id=61563455130156">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-brand-facebook-filled"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M18 2a1 1 0 0 1 .993 .883l.007 .117v4a1 1 0 0 1 -.883 .993l-.117 .007h-3v1h3a1 1 0 0 1 .991 1.131l-.02 .112l-1 4a1 1 0 0 1 -.858 .75l-.113 .007h-2v6a1 1 0 0 1 -.883 .993l-.117 .007h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-6h-2a1 1 0 0 1 -.993 -.883l-.007 -.117v-4a1 1 0 0 1 .883 -.993l.117 -.007h2v-1a6 6 0 0 1 5.775 -5.996l.225 -.004h3z"
                      stroke-width="0"
                      fill="currentColor"
                    />
                  </svg>
                </Link>
                <Link to="https://www.tiktok.com/@filmebi.in">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-brand-tiktok-filled"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M16.083 2h-4.083a1 1 0 0 0 -1 1v11.5a1.5 1.5 0 1 1 -2.519 -1.1l.12 -.1a1 1 0 0 0 .399 -.8v-4.326a1 1 0 0 0 -1.23 -.974a7.5 7.5 0 0 0 1.73 14.8l.243 -.005a7.5 7.5 0 0 0 7.257 -7.495v-2.7l.311 .153c1.122 .53 2.333 .868 3.59 .993a1 1 0 0 0 1.099 -.996v-4.033a1 1 0 0 0 -.834 -.986a5.005 5.005 0 0 1 -4.097 -4.096a1 1 0 0 0 -.986 -.835z"
                      stroke-width="0"
                      fill="currentColor"
                    />
                  </svg>
                </Link>
                <Link to="https://www.instagram.com/filmebi.in/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-brand-instagram"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#fff"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                    <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                    <path d="M16.5 7.5l0 .01" />
                  </svg>
                </Link>
                <div id="top-ge-counter-container" data-site-id="117514"></div>
                <script async src="//counter.top.ge/counter.js"></script>
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
