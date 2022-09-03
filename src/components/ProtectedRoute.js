import { Redirect, Route } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, path, exact, ...props }) {
  return (
    <Route path={path} exact={exact}>
      {() =>
        props.loggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />
      }
    </Route>
  );
}
