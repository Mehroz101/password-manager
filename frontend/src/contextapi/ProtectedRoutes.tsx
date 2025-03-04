import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { CheckUser } from "../redux/authSlice/AuthSlice";

const ProtectedRoutes = ({ element }: { element: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const navigate = useNavigate();
  // const token = localStorage.getItem("passwordmanager");
  const { isAuth, loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  // useEffect(() => {
  //   if (!token) {
  //     setIsAuthenticated(false);
  //     navigate("/login");
  //   } else {
  //     setIsAuthenticated(true);
  //   }
  // }, [navigate]);
  // if (!isAuthenticated) {
  //   return null; // Don't render the protected component
  // }
  useEffect(() => {
    dispatch(CheckUser());
  }, []);
  useEffect(() => {
    if (!isAuth && !loading) {
      navigate("/login");
    }
  }, [isAuth, loading]);
  if (loading) return <h1>Loading...</h1>;
  return element;
};

export default ProtectedRoutes;
