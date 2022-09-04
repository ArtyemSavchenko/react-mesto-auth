import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as auth from '../utils/authApi';

export default function Login({ onLogin }) {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = e => {
    e.preventDefault();
    auth
      .authorization(email, password)
      .then(() => {
        setEmail('');
        setPassword('');
        onLogin(email);
        history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <main className="page__content">
      <section className="page__section" aria-label="Секция авторизации.">
        <form onSubmit={handleLogin} className="auth-form">
          <fieldset className="auth-form__inputs-box">
            <legend className="auth-form__title">Вход</legend>
            <input
              type="text"
              className="auth-form__input"
              autoComplete="username"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="auth-form__input"
              autoComplete="current-password"
              placeholder="Пароль"
              value={password}
              onChange={e => setPassword(e.target.value)}
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
