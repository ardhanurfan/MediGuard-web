import {
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Map from "./pages/Map/Map";
import NotFound from "./pages/NotFound/NotFound";
import Overview from "./pages/Overview/Overview";
import SideBar from "./components/SideBar/SideBar";
import Navbar from "./components/Navbar/Navbar";
import Register from "./pages/Register/Register";
import Cookies from "js-cookie";
import UserProvider from "./context/UserContext";
import Transaction from "./pages/Transaction/Transaction";
import MediGuard from "./pages/MediGuard/MediGuard";

const router = createBrowserRouter([{ path: "*", Component: Root }]);
const ProtectedRoute = () => {
  const token = Cookies.get("token_mediguard");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <UserProvider>
      <Navbar />
      <SideBar />
      <Outlet />
    </UserProvider>
  );
};

export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Overview />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/mediguard" element={<MediGuard />} />
        <Route path="/map" element={<Map />} />
      </Route>
    </Routes>
  );
}
