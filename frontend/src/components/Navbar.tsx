import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileImg from "../assets/profileImg.png";
import "../styles/Navbar.css";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Verified from "../assets/verified.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { getProfileData } from "../redux/ProfileSlice/ProfileSlice";
import { getGreeting } from "../utils/function";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector(
    (state: RootState) => state.profile
  );
  useEffect(() => {
    console.log("calledd", userData);
    dispatch(getProfileData());
  }, [dispatch]);
  return (
    <div className="navbar">
      <div className="navbar_left">
        <div className="navbar_profile_img">
          <img src={ProfileImg} alt="img" />
        </div>
        <div className="nav_profile_text">
          <p>
            {userData?.fullname ? userData?.fullname :userData?.username}
            <img src={Verified} alt="" className="verified_badge" />
          </p>
          <span>{getGreeting()}</span>
        </div>
      </div>
      <div className="navbar_right" onClick={() => navigate("/login")}>
        <FontAwesomeIcon icon={faBell} />
      </div>
    </div>
  );
};

export default Navbar;
