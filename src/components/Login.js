export default function Login() {
  return (
    <main className="page__content">
      <section className="page__section" aria-label="Секция авторизации.">
        <form className="auth-form">
          <fieldset className="auth-form__inputs-box">
            <legend className="auth-form__title">Вход</legend>
            <input
              type="text"
              className="auth-form__input"
              autoComplete="username"
              placeholder="Email"
            />
            <input
              type="password"
              className="auth-form__input"
              autoComplete="current-password"
              placeholder="Пароль"
            />
          </fieldset>
          <button type="submit" className="auth-form__btn">
            Войти
          </button>
        </form>
      </section>
    </main>
  );
}
