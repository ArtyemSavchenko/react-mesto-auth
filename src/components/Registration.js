import { Link } from 'react-router-dom';

export default function Registration() {
  return (
    <main className="page__content">
      <section className="page__section" aria-label="Секция регистрации.">
        <form className="auth-form">
          <fieldset className="auth-form__inputs-box">
            <legend className="auth-form__title">Регистрация</legend>
            <input
              type="text"
              className="auth-form__input"
              autoComplete="username"
              placeholder="Email"
            />
            <input
              type="password"
              className="auth-form__input"
              autoComplete="new-password"
              placeholder="Пароль"
            />
          </fieldset>
          <button type="submit" className="auth-form__btn">
            Зарегистрироваться
          </button>
          <div className="auth-form__login-link-box">
            <p className="auth-form__tip-text">Уже зарегистрированы?</p>
            <Link className="auth-form__link" to="/sign-in">
              Войти
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
