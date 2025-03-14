import {
  faBuilding,
  faHome,
  faLayerGroup,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/BottomNav.css";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/routes";

const BottomNav = () => {
  const navigate = useNavigate();

  return (
    <div className="bottom_navbar">
      <div className="bottom_navbar_container">
        <div className="bottom_navbar_left">
          <FontAwesomeIcon
            icon={faLayerGroup}
            onClick={() => navigate(ROUTES.SHOWALL)}
          />
          <FontAwesomeIcon
            icon={faHome}
            onClick={() => navigate(ROUTES.HOME)}
          />
        </div>
        <div
          className="bottom_navbar_center"
          onClick={() => navigate(ROUTES.ADDNEW)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <div className="bottom_navbar_right">
          <FontAwesomeIcon
            icon={faBuilding}
            onClick={() => navigate(ROUTES.VIEWCOMPANY)}
          />
          <FontAwesomeIcon
            icon={faUser}
            onClick={() => navigate(ROUTES.PROFILE)}
          />
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
