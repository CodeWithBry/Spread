import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import NavLink from '../../ui/NavLink/NavLink';
import s from './Footer.module.css';

const SITE_MAP = [
  { label: 'Homepage', path: '/home' },
  { label: 'Latest', path: '/latest' },
  { label: 'Articles', path: '/articles' },
  { label: 'Search', path: '/search' },
];

const LEGAL = [
  { label: 'Privacy Policy', path: '/' },
  { label: 'Terms of Service', path: '/' },
  { label: 'FAQs', path: '/' },
];

const SOCIAL = [
  { icon: 'fab fa-facebook', href: 'https://facebook.com' },
  { icon: 'fab fa-instagram', href: 'https://instagram.com' },
  { icon: 'fab fa-twitter', href: 'https://twitter.com' },
];

function Footer() {
  const { scrollToTop } = useContext(AppContext);

  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div className={s.brand}>
          <div className={s.brandHeader}>
            <img src="./Icons/logo.png" alt="Spread logo" />
            <span>Spread</span>
          </div>
          <p>
            Delivering accurate, timely, and engaging stories to keep you
            informed and inspired every day.
          </p>
          <div className={s.social}>
            {SOCIAL.map((s_) => (
              <a
                key={s_.icon}
                href={s_.href}
                target="_blank"
                rel="noreferrer"
                className={s.socialLink}
                aria-label={s_.icon}
              >
                <i className={s_.icon} />
              </a>
            ))}
          </div>
          <button className={s.backBtn} onClick={scrollToTop}>
            ↑ Back to top
          </button>
        </div>

        <div className={s.links}>
          <div className={s.linkGroup}>
            <p className={s.groupLabel}>Site Map</p>
            {SITE_MAP.map((item) => (
              <NavLink key={item.label} to={item.path} className={s.link}>
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className={s.linkGroup}>
            <p className={s.groupLabel}>Legal</p>
            {LEGAL.map((item) => (
              <NavLink key={item.label} to={item.path} className={s.link}>
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      <div className={s.bottom}>
        <p>© 2025 Spread. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
