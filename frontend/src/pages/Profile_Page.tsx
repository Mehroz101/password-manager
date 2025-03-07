import "../styles/Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCircleInfo,
  faEdit,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import ProfileImg from "../assets/profileImg.png";
import { useNavigate } from "react-router-dom";

import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons/faPeopleGroup";
import { ROUTES } from "../utils/routes";
const Profile_Page = () => {
  const navigate = useNavigate();
  const user = {
    name: "Mehroz Farooq",
    username: "mehrozfarooq",
    profileImage: ProfileImg,
  };

  const stats = [
    { title: "Total Password", count: 23 },
    { title: "Departments", count: 5 },
    { title: "Employees", count: 10 },
    { title: "Reused", count: 230 },
  ];

  const menuItems = [
    {
      id: 1,
      title: "Setting",
      icon: faGear,
      action: () => navigate(ROUTES.SETTING),
    },
    {
      id: 2,
      title: "Users",
      icon: faPeopleGroup,
      action: () => navigate(ROUTES.USERS),
    },
    { id: 3, title: "Help Center", icon: faCircleInfo },
    {
      id: 4,
      title: "Logout",
      icon: faArrowRightFromBracket,
      action: () => {
        localStorage.removeItem("passwordmanager");
        navigate(ROUTES.AUTH);
      },
    },
  ];

  return (
    <div className="profile_page">
      {/* Profile Header */}
      <div className="profile_page_top">
        <div className="profile_img">
          <img
            src={user.profileImage || "/default-profile.png"}
            alt="Profile"
          />
          <div className="edit_profileImg">
            <FontAwesomeIcon icon={faEdit} />
          </div>
        </div>
        <h3 className="userorignalname">{user.name}</h3>
        <span className="username">@{user.username}</span>
      </div>

      {/* Profile Stats */}
      <div className="profile_page_cards">
        {stats.map((stat, index) => (
          <div className="profile_page_card" key={index}>
            <span className="card_title">{stat.title}</span>
            <span className="card_number">{stat.count}</span>
          </div>
        ))}
      </div>

      {/* Menu Items */}
      <div className="profile_page_menus">
        {menuItems.map((item, index) => (
          <div
            className={`profile_page_menu menu_${item.id}`}
            key={index}
            onClick={item.action ? item.action : undefined}
          >
            <div className="menu_left">
              <FontAwesomeIcon icon={item.icon} />
            </div>
            <div className="menu_right">
              <span>{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile_Page;
