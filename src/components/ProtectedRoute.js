import { Redirect, Route } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, path, ...props }) {
  return (
    <Route path={path}>
      {() =>
        props.loggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />
      }
    </Route>
  );
}
