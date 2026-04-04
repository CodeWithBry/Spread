import s from './HeroSection.module.css';

function HeroSection({ title, subtitle, children }) {
  return (
    <div className={s.hero}>
      <div className={s.text}>
        <h1 className={s.title}>{title}</h1>
        {subtitle && <p className={s.subtitle}>{subtitle}</p>}
      </div>
      {children && <div className={s.actions}>{children}</div>}
    </div>
  );
}

export default HeroSection;
