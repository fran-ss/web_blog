import { Route, Navigate, Routes as Switch } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Login from "../pages/login";
import Register from "../pages/register";
export default function Routes() {
  const auth = true;
  return (
    <Switch>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={auth ? <Dashboard /> : <Navigate to="/" replace />}
      />
    </Switch>
  );
}
