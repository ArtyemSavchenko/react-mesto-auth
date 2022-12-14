import { Redirect, Route } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, path, checkToken, ...props }) {
  return (
    <Route>
      {() =>
        props.loggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />
      }
    </Route>
  );
}
