interface HeaderProps {
  isScrolled: boolean
}

export default function Header({ isScrolled }: HeaderProps) {
  return (
    <header className={`header${isScrolled ? ' header--scrolled' : ''}`}>
      <div className="container header__inner">
        <a href="#" className="header__logo" aria-label="Novo Dash">
          <img src="/logo/logo3.svg" className="header__logo-dark" alt="Novo Dash" width="180" height="38" />
          <img src="/logo/logo4.svg" className="header__logo-light" alt="Novo Dash" width="180" height="38" />
        </a>
        <span className="header__badge">Partners</span>
      </div>
    </header>
  )
}
