import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import { useSelector } from "react-redux";

function App() {
  const user = Boolean(useSelector((state) => state.user.currentUser));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!user ? <Login /> : <Navigate to="/homepage" />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/homepage"
          element={user ? <Homepage /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
