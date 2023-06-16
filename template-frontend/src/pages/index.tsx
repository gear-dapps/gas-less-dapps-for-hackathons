import { Route, Routes } from "react-router-dom";
import { useAccount } from "contexts/Account";
import { useAdmin } from "contexts/admin";
import { Home } from "./home";
import { Register } from "./register";
import { Login } from "./login";
import { Auth } from "./auth";
import { Info } from "./info";
import { LoginAdmin } from "./login-admin";

const routes = [
  { path: "/", Page: Home },
  { path: "/info", Page: Info },
];

const authRoutes = [
  { path: "/", Page: Auth },
  { path: "/register", Page: Register },
  { path: "/login", Page: Login },
  { path: "/login-admin", Page: LoginAdmin },
];

function Routing() {
  const { isLoggedIn } = useAccount();
  const { admin } = useAdmin();

  const isUser = admin.isAdmin || isLoggedIn;

  const getRoutes = (_routes: { path: string; Page: () => JSX.Element }[]) =>
    _routes.map(({ path, Page }) => (
      <Route key={path} path={path} element={<Page />} />
    ));

  return <Routes>{getRoutes(isUser ? routes : authRoutes)}</Routes>;
}

export { Routing };
