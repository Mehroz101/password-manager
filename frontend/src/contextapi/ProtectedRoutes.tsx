import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ element }: { element: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("passwordmanager");

  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false);
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);
  if (!isAuthenticated) {
    return null; // Don't render the protected component
  }

  return element;
};

export default ProtectedRoutes;
