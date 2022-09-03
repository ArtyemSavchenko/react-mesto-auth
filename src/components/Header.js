import { useContext } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { CurrentUserInfo } from '../contexts/CurrentUserContext';
import logo from '../images/logo.svg';

export default function Header() {
  const user = useContext(CurrentUserInfo);

  return (
    <header className="header page__section">
      <img
        src={logo}
        alt="Логотип Место Россия."
        className="logo"
      />
      <Switch>
        <Route exact path="/">
          <div className="header__user-info-box">
            <p className="header__text">{user.name}</p>
            <button type="button" className="header__link">
              Выйти
            </button>
          </div>
        </Route>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        </Route>
      </Switch>
    </header>
  );
}
