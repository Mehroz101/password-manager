import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileImg from "../assets/profileImg.png";
import "../styles/Navbar.css";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Verified from "../assets/verified.png";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="navbar_left">
        <div className="navbar_profile_img">
          <img src={ProfileImg} alt="img" />
        </div>
        <div className="nav_profile_text">
          <p>
            Mehroz Farooq
            <img src={Verified} alt="" className="verified_badge" />
          </p>
          <span>Good morning</span>
        </div>
      </div>
      <div className="navbar_right" onClick={() => navigate("/login")}>
        <FontAwesomeIcon icon={faBell} />
      </div>
    </div>
  );
};

export default Navbar;
