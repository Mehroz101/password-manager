import "../styles/Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCircleInfo,
  faEdit,
  faGear,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/routes";
import { useMutation } from "@tanstack/react-query";
import { UpdateProfileImg } from "../services/UserProfileService";
import profileImg from "../assets/profileImg.png";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getProfileData } from "../redux/ProfileSlice/ProfileSlice";
import { notify } from "../utils/notification";

const API_URL = import.meta.env.REACT_APP_API_IMAGE_URL;

const Profile_Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootState) => state.profile);
  const navigate = useNavigate();
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const [stats, setStats] = useState([
    { title: "Total Password", count: 0 },
    { title: "Company Name", count: "NAN" },
    { title: "Employees", count: 0 },
    { title: "Company Password", count: 0 },
  ]);

  useEffect(() => {
    if (userData) {
      setStats([
        { title: "Total Password", count: userData?.passwordsCount || 0 },
        { title: "Company Name", count: userData?.companyName || "NAN" },
        { title: "Employees", count: userData?.totalEmployees || 0 },
        { title: "Company Password", count: userData?.companyPasswords || 0 },
      ]);
    }
  }, [userData]);

  const profileImgUpdateMutation = useMutation({
    mutationFn: UpdateProfileImg,
    onSuccess: (data) => {
      if (data.success) {
        dispatch(getProfileData());
        notify({ type: "success", message: data.message });
      } else {
        notify({ type: "error", message: data.message });
      }
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      profileImgUpdateMutation.mutate({ profileImg: file });
    }
  };

  const handleFileClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

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
            src={
              userData?.user.profileImg
                ? `${API_URL}/uploads/${userData?.user.profileImg}`
                : profileImg
            }
            alt="Profile"
          />
          <div className="edit_profileImg">
            <FontAwesomeIcon icon={faEdit} onClick={handleFileClick} />
            <input
              type="file"
              ref={inputFileRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="profileImg"
              accept="image/*"
            />
          </div>
        </div>
        <h3 className="userorignalname">
          {userData?.user.fullname || "No Name"}
        </h3>
        <span className="username">@{userData?.user.username}</span>
      </div>

      {/* Profile Stats */}
      <div className="profile_page_cards">
        {stats.map((stat) => (
          <div className="profile_page_card" key={stat.title}>
            <span className="card_title">{stat.title}</span>
            <span className="card_number">{stat.count}</span>
          </div>
        ))}
      </div>

      {/* Menu Items */}
      <div className="profile_page_menus">
        {menuItems.map((item) => (
          <div
            className={`profile_page_menu menu_${item.id}`}
            key={item.id}
            onClick={item.action || undefined}
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
