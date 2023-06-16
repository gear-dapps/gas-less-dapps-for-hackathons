import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

type Admin = {
  isAdmin: boolean | null;
};

function useAdminData() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState<Admin>({
    isAdmin: JSON.parse(sessionStorage.getItem("templateIsAdmin") || "false"),
  });

  const logout = () => {
    setAdmin({ isAdmin: false });
    navigate("/");
  };

  useEffect(() => {
    if (admin.isAdmin) {
      sessionStorage.setItem("templateIsAdmin", JSON.stringify(admin.isAdmin));
    } else {
      sessionStorage.removeItem("templateIsAdmin");
    }
  }, [admin.isAdmin]);

  return {
    admin,
    setAdmin,
    logout,
  };
}

const AdminContext = createContext({} as ReturnType<typeof useAdminData>);

function AdminProvider({ children }: { children: ReactNode }) {
  return (
    <AdminContext.Provider value={useAdminData()}>
      {children}
    </AdminContext.Provider>
  );
}

const useAdmin = () => useContext(AdminContext);

export { AdminProvider, useAdmin };
