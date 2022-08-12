import logo from '../images/logo.svg';

export default function Header() {
  return (
    <header className="header page__section">
      <img src={logo} alt="Логотип Место Россия." className="logo" />
    </header>
  );
}
